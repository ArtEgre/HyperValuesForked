// Checks the upstream-content migration and the fork's saved-answer compatibility.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const storage = {};
const ctx = vm.createContext({
    console,
    localStorage: {getItem: key => storage[key] || null, setItem: (key, value) => {storage[key] = value;}},
    document: {documentElement: {setAttribute() {}}, addEventListener() {}},
    window: {addEventListener() {}}
});
['data.js', 'translations.js', 'i18n.js', 'hyper-i18n.js', 'scoring.js'].forEach(file => vm.runInContext(read(file), ctx, {filename: file}));
const evaluate = expression => vm.runInContext(expression, ctx);
const snapshot = expression => JSON.parse(evaluate(`JSON.stringify(${expression})`));
const {categoryValues, ideologyGroups, ideologies, ideologyScores, resultsMapping} = snapshot('({categoryValues, ideologyGroups, ideologies, ideologyScores, resultsMapping})');
const labels = Object.values(ideologyGroups).flat();
assert.equal(new Set(labels).size, 239);
assert.equal(Object.values(categoryValues).flat().length, 145);
assert.deepEqual(Object.keys(ideologyScores).sort(), labels.slice().sort());
for (const [cat, values] of Object.entries(categoryValues)) {
    assert.deepEqual(Object.keys(resultsMapping[cat]), values);
    for (const value of values) {
        assert.ok(fs.existsSync(path.join(root, 'icons', cat, value + '.svg')), 'Missing icon: ' + value);
        assert.ok(evaluate(`TRANSLATIONS.en.values[${JSON.stringify(value)}]`), 'Missing English name: ' + value);
    }
}
for (const label of labels) {
    assert.ok(evaluate(`TRANSLATIONS.en.descriptions[${JSON.stringify(label)}]`), 'Missing description: ' + label);
    const stances = Object.fromEntries(ideologyScores[label].split('|').map(part => {const at = part.lastIndexOf(':'); return [part.slice(0, at), Number(part.slice(at + 1))];}));
    for (const [cat, values] of Object.entries(ideologies[label])) {
        for (const value of Array.isArray(values) ? values : [values]) {
            assert.ok(categoryValues[cat].includes(value), 'Invalid requirement: ' + label + ': ' + value);
            assert.ok(stances[value] > 0, 'Required value not included in profile: ' + label + ': ' + value);
        }
    }
}
console.log('ok    all 145 values and 239 ideologies have matching catalogs, profiles, requirements, names and icons');

const tree = JSON.parse(read('questions_tree.json'));
for (const [cat, nodes] of Object.entries(tree)) {
    const byId = new Map(nodes.map(node => [node.id, node]));
    assert.equal(byId.size, nodes.length, 'Duplicate node in ' + cat);
    const reached = new Set();
    function visit(id, route) {
        assert.ok(!route.has(id), 'Question cycle: ' + id);
        const node = byId.get(id);
        assert.ok(node, 'Missing question: ' + id);
        reached.add(id);
        if (!node.options) {
            assert.ok(categoryValues[cat].includes(id), 'Unknown leaf: ' + id);
            return;
        }
        assert.ok(node.options.length, 'Question has no options: ' + id);
        assert.ok(node.en || node.text, 'Question has no fallback text: ' + id);
        for (const option of node.options) {
            assert.ok(option.en || option.text, 'Option has no fallback text: ' + id);
            visit(option.next, new Set([...route, id]));
        }
    }
    visit(nodes[0].id, new Set());
    assert.equal(reached.size, nodes.length, 'Unreachable questions in ' + cat);
}
console.log('ok    every question branch reaches a valid value without cycles or missing nodes');

storage.quizAnswers = JSON.stringify({economics: [{value: 'social_market', agree: 0.6}, {value: 'social_market', agree: 1}, {value: 'removed', agree: 1}, {value: 'laissez_faire', agree: 'bad'}], wrongCategory: [{value: 'social_market', agree: 1}]});
assert.deepEqual(snapshot('HV.loadAnswers()'), {economics: [{value: 'social_market', agree: 0.6}]});
delete storage.quizAnswers;
storage.quizResults = JSON.stringify({economics: 'social_market', culture: 'removed'});
assert.deepEqual(snapshot('HV.loadAnswers()'), {economics: [{value: 'social_market', agree: 1}]});
storage.quizAnswers = '{broken';
assert.deepEqual(snapshot('HV.loadAnswers()'), {economics: [{value: 'social_market', agree: 1}]});
console.log('ok    signed answers survive migration; duplicates, removed values and malformed entries are cleaned');

for (const lang of ['en', 'uk', 'ru', 'de']) {
    evaluate(`I18n.currentLanguage = ${JSON.stringify(lang)}`);
    assert.equal(evaluate('I18n.getValueName("resource_management", "Confiscatory_Taxation")'), evaluate(`TRANSLATIONS[${JSON.stringify(lang)}].values.Confiscatory_Taxation`));
    for (const key of snapshot('Object.keys(HV_TRANSLATIONS.en)')) assert.ok(evaluate(`HV_TRANSLATIONS[${JSON.stringify(lang)}][${JSON.stringify(key)}]`), lang + ': ' + key);
}
console.log('ok    all four languages include the HyperValuesForked controls');

for (const file of fs.readdirSync(root)) {
    if (file.endsWith('.js')) new vm.Script(read(file), {filename: file});
    if (!file.endsWith('.html')) continue;
    const html = read(file);
    for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
        if (!/\bsrc=/.test(match[1])) new vm.Script(match[2], {filename: file});
    }
    for (const match of html.matchAll(/\b(?:src|href)="([^"#?]+)(?:[?#][^"]*)?"/g)) {
        if (/^(https?:|mailto:|data:|\/\/)/.test(match[1])) continue;
        assert.ok(fs.existsSync(path.join(root, match[1])), file + ': missing ' + match[1]);
    }
}
console.log('ok    all scripts parse and static local page references exist');
console.log('all update checks passed');
