// Node 21: node --experimental-websocket tools/check_browser.cjs
// Uses an installed Chrome or Edge with an isolated, disposable profile.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const http = require('node:http');
const {spawn, spawnSync} = require('node:child_process');
const root = path.resolve(__dirname, '..');
const browser = [process.env.HV_BROWSER, 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(file => file && fs.existsSync(file));
if (!browser || typeof WebSocket === 'undefined') throw new Error('Use an installed Chrome/Edge (HV_BROWSER), and enable WebSocket support in Node.');
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'hypervalues-browser-'));
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const mime = {'.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png'};
const server = http.createServer((req, res) => {
    const file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
    fs.readFile(file, (error, body) => {
        if (error) {res.writeHead(404); return res.end();}
        res.setHeader('Content-Type', mime[path.extname(file)] || 'text/plain');
        res.end(body);
    });
});
let child, ws;
(async () => {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    child = spawn(browser, ['--headless', '--disable-gpu', '--no-first-run', '--disable-extensions',
        '--disable-background-networking', '--remote-debugging-port=0', '--remote-allow-origins=*',
        '--host-resolver-rules=MAP fonts.googleapis.com ~NOTFOUND, MAP fonts.gstatic.com ~NOTFOUND',
        '--user-data-dir=' + profile, 'about:blank'], {stdio: 'ignore', windowsHide: true});
    const portFile = path.join(profile, 'DevToolsActivePort');
    for (let i = 0; i < 100 && !fs.existsSync(portFile); i++) await wait(100);
    const port = fs.readFileSync(portFile, 'utf8').split('\n')[0];
    const targets = await (await fetch('http://127.0.0.1:' + port + '/json/list')).json();
    ws = new WebSocket(targets.find(target => target.type === 'page').webSocketDebuggerUrl);
    await new Promise(resolve => ws.addEventListener('open', resolve, {once: true}));
    let id = 0;
    const pending = new Map();
    ws.addEventListener('message', event => {
        const message = JSON.parse(event.data);
        if (pending.has(message.id)) {pending.get(message.id)(message); pending.delete(message.id);}
    });
    const call = (method, params = {}) => new Promise((resolve, reject) => {
        const key = ++id;
        pending.set(key, message => message.error ? reject(new Error(JSON.stringify(message.error))) : resolve(message.result));
        ws.send(JSON.stringify({id: key, method, params}));
    });
    await call('Page.navigate', {url: `http://127.0.0.1:${server.address().port}/tools/browser_check.html`});
    let report = '';
    for (let i = 0; i < 300; i++) {
        await wait(200);
        const result = await call('Runtime.evaluate', {expression: 'document.getElementById("report")?.textContent || ""', returnByValue: true});
        report = result.result.value || '';
        if (report.includes('FAIL ') || report.includes('ALL BROWSER CHECKS PASSED')) break;
    }
    console.log(report);
    if (!report.includes('ALL BROWSER CHECKS PASSED')) process.exitCode = 1;
})().catch(error => {console.error(error); process.exitCode = 1;}).finally(async () => {
    if (ws) ws.close();
    if (child) {
        if (process.platform === 'win32') spawnSync('taskkill', ['/PID', String(child.pid), '/T', '/F'], {stdio: 'ignore', windowsHide: true});
        else child.kill();
    }
    server.closeAllConnections(); server.close();
    await wait(500);
    const resolved = path.resolve(profile);
    if (resolved.startsWith(path.resolve(os.tmpdir()) + path.sep) && path.basename(resolved).startsWith('hypervalues-browser-')) {
        fs.rmSync(resolved, {recursive: true, force: true, maxRetries: 5, retryDelay: 200});
    }
});
