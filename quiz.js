function getLocalizedQuestionText(node) {
    if (!node) return "";
    const lang = (typeof I18n !== 'undefined') ? I18n.currentLanguage : 'en';
    const defaultLang = (typeof I18n !== 'undefined') ? I18n.defaultLanguage : 'en';

    if (typeof node[lang] === 'string' && node[lang].trim() !== "") {
        return node[lang];
    }
    if (typeof node[defaultLang] === 'string' && node[defaultLang].trim() !== "") {
        return node[defaultLang];
    }
    return node.text || "";
}

function getLocalizedOptionText(opt) {
    if (!opt) return "";
    const lang = (typeof I18n !== 'undefined') ? I18n.currentLanguage : 'en';
    const defaultLang = (typeof I18n !== 'undefined') ? I18n.defaultLanguage : 'en';

    if (typeof opt[lang] === 'string' && opt[lang].trim() !== "") {
        return opt[lang];
    }
    if (typeof opt[defaultLang] === 'string' && opt[defaultLang].trim() !== "") {
        return opt[defaultLang];
    }
    return opt.text || "";
}


// The questions of one category (quiz.html?cat=economics). Getting a value saves it and goes back to
// the list of categories (results.html).
const params = new URLSearchParams(window.location.search);
const category = params.get('cat');
const answers = HV.loadAnswers();
let currentQuestions = {};
let currentNodeId = null;
let nodeStack = [];        // questions already answered, for the back button

function backToList() {
  window.location.href = `results.html#cat-${category}`;
}

function showError(message) {
  document.getElementById('question').innerText = message;
  const buttonsDiv = document.getElementById('buttons');
  buttonsDiv.innerHTML = '';
  buttonsDiv.appendChild(makeButton(I18n.t('back'), backToList));
}

fetch('questions_tree.json')
  .then(res => {
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  })
  .then(tree => {
    // hasOwnProperty: keys such as "constructor" or "__proto__" must not count as categories
    if (!category || !Object.prototype.hasOwnProperty.call(tree, category)) {
      window.location.replace('results.html');
      return;
    }
    tree[category].forEach(q => currentQuestions[q.id] = q);
    renderNode(currentQuestions[tree[category][0].id]);
  })
  .catch(() => {
    showError(I18n.t('questionsError'));
  });

function makeButton(text, onClick) {
  const btn = document.createElement('button');
  btn.innerText = text;
  btn.onclick = onClick;
  return btn;
}

function renderNode(node) {
  currentNodeId = node.id;
  const buttonsDiv = document.getElementById('buttons');
  buttonsDiv.innerHTML = '';
  document.getElementById('question').innerText = getLocalizedQuestionText(node);

  if (node.options && node.options.length > 3) {
    buttonsDiv.classList.add('multi-column');
  } else {
    buttonsDiv.classList.remove('multi-column');
  }

  node.options.forEach(opt => {
    const btn = makeButton(getLocalizedOptionText(opt), () => selectOption(opt.next));
    if (opt.color) btn.style.backgroundColor = opt.color;
    buttonsDiv.appendChild(btn);
  });

  buttonsDiv.appendChild(makeButton(I18n.t(nodeStack.length ? 'prevQuestion' : 'back'), previousQuestion));
}

function selectOption(nextId) {
  nodeStack.push(currentNodeId);
  const node = currentQuestions[nextId];
  if (!node) {
    nodeStack.pop();
    showError(I18n.t('missingQuestion'));
    return;
  }
  if (!node.options) {
    addValue(node.id);
  } else {
    renderNode(node);
  }
}

function addValue(valueId) {
  const list = answers[category] || (answers[category] = []);
  const existing = list.find(item => item.value === valueId);
  if (!existing) {
    list.push({ value: valueId, agree: 1 });
  } else if (!(existing.agree > 0)) {
    // picked again after being marked neutral or opposite: it now matches
    existing.agree = 1;
  }
  HV.saveAnswers(answers);
  backToList();
}

function previousQuestion() {
  if (nodeStack.length) {
    renderNode(currentQuestions[nodeStack.pop()]);
  } else {
    backToList();
  }
}

window.addEventListener("languageChanged", () => { if (currentQuestions[currentNodeId]) renderNode(currentQuestions[currentNodeId]); });
