// Custom selections never overwrite quizAnswers or quizResults.
let customAnswers = {};
try {
    const saved = localStorage.getItem('customQuizAnswers');
    const legacy = JSON.parse(localStorage.getItem('customQuizResults') || '{}');
    customAnswers = HV.cleanAnswers(saved ? JSON.parse(saved) : Object.fromEntries(
        Object.entries(legacy || {}).map(([cat, value]) => [cat, [{value, agree: 1}]])));
} catch (e) { /* Start empty if storage is unavailable or invalid. */ }

function saveCustom() {
    try { localStorage.setItem('customQuizAnswers', JSON.stringify(customAnswers)); } catch (e) { /* Optional storage. */ }
    renderCustomMatches();
}

function renderCustomMatches() {
    const holder = document.getElementById('custom-matches');
    holder.replaceChildren();
    if (!Object.keys(customAnswers).length) return;
    HV.closestIdeologies(customAnswers, null, 4).forEach(match => {
        const link = document.createElement('a');
        link.className = 'label-bubble';
        link.style.backgroundColor = labelColors[match.label] || '#7a7a7a';
        link.style.display = 'block';
        link.style.textDecoration = 'none';
        link.href = `description.html?type=ideology&id=${encodeURIComponent(match.label)}`;
        link.textContent = `${I18n.getIdeologyName(match.label)} (${HV.percent(match.probability)})`;
        holder.appendChild(link);
    });
    if (!holder.childElementCount) holder.textContent = I18n.t('noExactMatch');
}

function renderCustomPage() {
    const holder = document.getElementById('custom-categories');
    holder.replaceChildren();
    categories.forEach(cat => {
        const section = document.createElement('section');
        const title = document.createElement('h2');
        title.className = 'category-title';
        title.textContent = I18n.getCategoryTitle(cat);
        section.appendChild(title);
        const controls = document.createElement('div');
        controls.className = 'custom-controls';
        const select = document.createElement('select');
        select.setAttribute('aria-label', `${I18n.getCategoryTitle(cat)}: ${I18n.t('selectValue')}`);
        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = I18n.t('selectValue');
        select.appendChild(placeholder);
        categoryValues[cat].filter(value => !(customAnswers[cat] || []).some(item => item.value === value)).forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = I18n.getValueName(cat, value);
            select.appendChild(option);
        });
        select.onchange = () => {
            if (!select.value) return;
            (customAnswers[cat] || (customAnswers[cat] = [])).push({value: select.value, agree: 1});
            saveCustom();
            renderCustomPage();
        };
        controls.appendChild(select);
        section.appendChild(controls);
        (customAnswers[cat] || []).forEach(item => {
            const card = document.createElement('div');
            card.className = 'custom-value';
            const name = document.createElement('a');
            name.href = `description.html?id=${item.value}&cat=${cat}`;
            name.textContent = I18n.getValueName(cat, item.value);
            card.appendChild(name);
            card.appendChild(makeSlider(item.agree, value => { item.agree = value; saveCustom(); }));
            const remove = document.createElement('button');
            remove.textContent = I18n.t('removeValue');
            remove.onclick = () => {
                customAnswers[cat] = customAnswers[cat].filter(entry => entry !== item);
                if (!customAnswers[cat].length) delete customAnswers[cat];
                saveCustom(); renderCustomPage();
            };
            card.appendChild(remove);
            section.appendChild(card);
        });
        holder.appendChild(section);
    });
    renderCustomMatches();
}
document.getElementById('reset-custom').onclick = () => {
    customAnswers = {}; saveCustom(); renderCustomPage();
};
window.addEventListener('languageChanged', renderCustomPage);
renderCustomPage();
