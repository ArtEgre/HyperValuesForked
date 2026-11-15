// Labels for features specific to this fork. Upstream translations remain in translations.js.
const HV_TRANSLATIONS = {
    en: {
        addValue: 'Add new value', clearAll: 'Clear all', clearConfirm: 'Clear all your values?',
        download: 'Download image', preparing: 'Preparing...', nextMatches: 'Next closest matches',
        probability: 'Probability', removeValue: 'Remove value', done: 'Done',
        opposite: 'Opposite', moderatelyOpposite: 'Moderately opposite', slightlyOpposite: 'Slightly opposite',
        neutral: 'Neutral', slightlyMatch: 'Slightly match', moderatelyMatch: 'Moderately match', stronglyMatch: 'Strongly match', match: 'Match',
        selectValue: 'Select a value', customIntro: 'Choose values directly and adjust how much each matches you. These results are saved separately from your quiz.',
        instructionText: 'You will see a list of categories. In each one, click "Add new value" and answer its questions with your opinion. You can add several values per category and click any value to say how much it matches you, from -1 (opposite) to +1 (match). Your closest ideologies update as you go.',
        sliderLabel: 'How much this value matches you, from -1 (opposite) to +1 (match)',
        phone: 'Phone', computer: 'Computer', imageError: 'The image could not be created in this browser.',
        imageFallback: 'This browser saved smaller pictures:', imageSize: 'Image size',
        noCategoryValue: 'No value of yours in this category', notChosen: 'Not among your values',
        yourStance: 'Your stance', ideologyStance: 'Ideology stance', fit: 'Fit',
        questionsError: 'Could not load the questions. Check your connection and try again.',
        missingQuestion: 'This question is missing. Please go back.'
    },
    uk: {
        addValue: 'Додати цінність', clearAll: 'Очистити все', clearConfirm: 'Видалити всі ваші цінності?',
        download: 'Завантажити зображення', preparing: 'Підготовка...', nextMatches: 'Наступні найближчі збіги',
        probability: 'Імовірність', removeValue: 'Видалити цінність', done: 'Готово',
        opposite: 'Протилежність', moderatelyOpposite: 'Помірна протилежність', slightlyOpposite: 'Слабка протилежність',
        neutral: 'Нейтрально', slightlyMatch: 'Слабкий збіг', moderatelyMatch: 'Помірний збіг', stronglyMatch: 'Сильний збіг', match: 'Збіг',
        selectValue: 'Виберіть цінність', customIntro: 'Вибирайте цінності безпосередньо та налаштовуйте ступінь згоди. Ці результати зберігаються окремо від тесту.',
        instructionText: 'Перед вами список категорій. У кожній натисніть «Додати цінність» і дайте відповіді на запитання. Можна додати кілька цінностей у категорії та натиснути на кожну, щоб указати ступінь згоди від -1 (протилежність) до +1 (збіг). Найближчі ідеології оновлюються автоматично.',
        sliderLabel: 'Ступінь згоди з цією цінністю від -1 (протилежність) до +1 (збіг)',
        phone: 'Телефон', computer: 'Комп’ютер', imageError: 'Не вдалося створити зображення в цьому браузері.',
        imageFallback: 'Браузер зберіг зображення меншого розміру:', imageSize: 'Розмір зображення',
        noCategoryValue: 'У вас немає цінностей у цій категорії', notChosen: 'Немає серед ваших цінностей',
        yourStance: 'Ваша позиція', ideologyStance: 'Позиція ідеології', fit: 'Відповідність',
        questionsError: 'Не вдалося завантажити запитання. Перевірте з’єднання та спробуйте ще раз.',
        missingQuestion: 'Це запитання відсутнє. Поверніться назад.'
    },
    ru: {
        addValue: 'Добавить ценность', clearAll: 'Очистить всё', clearConfirm: 'Удалить все ваши ценности?',
        download: 'Скачать изображение', preparing: 'Подготовка...', nextMatches: 'Следующие ближайшие совпадения',
        probability: 'Вероятность', removeValue: 'Удалить ценность', done: 'Готово',
        opposite: 'Противоположность', moderatelyOpposite: 'Умеренная противоположность', slightlyOpposite: 'Слабая противоположность',
        neutral: 'Нейтрально', slightlyMatch: 'Слабое совпадение', moderatelyMatch: 'Умеренное совпадение', stronglyMatch: 'Сильное совпадение', match: 'Совпадение',
        selectValue: 'Выберите ценность', customIntro: 'Выбирайте ценности напрямую и настраивайте степень согласия. Эти результаты сохраняются отдельно от теста.',
        instructionText: 'Перед вами список категорий. В каждой нажмите «Добавить ценность» и ответьте на вопросы. Можно добавить несколько ценностей в категории и нажать на каждую, чтобы указать степень согласия от -1 (противоположность) до +1 (совпадение). Ближайшие идеологии обновляются автоматически.',
        sliderLabel: 'Степень согласия с этой ценностью от -1 (противоположность) до +1 (совпадение)',
        phone: 'Телефон', computer: 'Компьютер', imageError: 'Не удалось создать изображение в этом браузере.',
        imageFallback: 'Браузер сохранил изображения меньшего размера:', imageSize: 'Размер изображения',
        noCategoryValue: 'У вас нет ценностей в этой категории', notChosen: 'Нет среди ваших ценностей',
        yourStance: 'Ваша позиция', ideologyStance: 'Позиция идеологии', fit: 'Соответствие',
        questionsError: 'Не удалось загрузить вопросы. Проверьте соединение и попробуйте ещё раз.',
        missingQuestion: 'Этот вопрос отсутствует. Вернитесь назад.'
    },
    de: {
        addValue: 'Wert hinzufügen', clearAll: 'Alles löschen', clearConfirm: 'Alle deine Werte löschen?',
        download: 'Bild herunterladen', preparing: 'Wird vorbereitet...', nextMatches: 'Weitere ähnliche Ideologien',
        probability: 'Wahrscheinlichkeit', removeValue: 'Wert entfernen', done: 'Fertig',
        opposite: 'Gegenteil', moderatelyOpposite: 'Mäßiges Gegenteil', slightlyOpposite: 'Leichtes Gegenteil',
        neutral: 'Neutral', slightlyMatch: 'Leichte Übereinstimmung', moderatelyMatch: 'Mäßige Übereinstimmung', stronglyMatch: 'Starke Übereinstimmung', match: 'Übereinstimmung',
        selectValue: 'Wert auswählen', customIntro: 'Wähle Werte direkt aus und passe deine Zustimmung an. Diese Ergebnisse werden getrennt vom Quiz gespeichert.',
        instructionText: 'Du siehst eine Liste von Kategorien. Klicke in jeder auf „Wert hinzufügen“ und beantworte die Fragen. Du kannst mehrere Werte pro Kategorie hinzufügen und durch Anklicken deine Zustimmung von -1 (Gegenteil) bis +1 (Übereinstimmung) einstellen. Die ähnlichsten Ideologien werden laufend aktualisiert.',
        sliderLabel: 'Deine Zustimmung zu diesem Wert von -1 (Gegenteil) bis +1 (Übereinstimmung)',
        phone: 'Handy', computer: 'Computer', imageError: 'Das Bild konnte in diesem Browser nicht erstellt werden.',
        imageFallback: 'Dieser Browser hat kleinere Bilder gespeichert:', imageSize: 'Bildgröße',
        noCategoryValue: 'Keine eigenen Werte in dieser Kategorie', notChosen: 'Nicht unter deinen Werten',
        yourStance: 'Deine Position', ideologyStance: 'Position der Ideologie', fit: 'Übereinstimmung',
        questionsError: 'Die Fragen konnten nicht geladen werden. Prüfe deine Verbindung und versuche es erneut.',
        missingQuestion: 'Diese Frage fehlt. Bitte gehe zurück.'
    }
};
for (const lang of I18n.supportedLanguages) {
    Object.assign(TRANSLATIONS[lang].ui, HV_TRANSLATIONS[lang]);
}
// Keep upstream fallback behavior for partially translated value names.
I18n.getValueName = function (category, value) {
    return TRANSLATIONS[this.currentLanguage]?.values?.[value]
        || TRANSLATIONS.en.values[value]
        || (typeof resultsMapping !== 'undefined' && resultsMapping[category]?.[value])
        || value.replace(/_/g, ' ');
};
// Common static controls on the retained HyperValuesForked pages.
document.addEventListener('DOMContentLoaded', () => {
    const labels = {Start: 'start', Values: 'values', Ideologies: 'ideologies', Changelog: 'changelog',
        License: 'license', Continue: 'continue', Back: 'back', 'Back to menu': 'backToMenu',
        'Clear all': 'clearAll', 'Download image': 'download', 'Next closest matches': 'nextMatches',
        'Original Icon Source': 'iconSource', 'Remove value': 'removeValue', Done: 'done'};
    document.querySelectorAll('button, .closest-heading').forEach(el => {
        const key = labels[el.textContent.trim()];
        if (key && !el.hasAttribute('data-i18n')) el.setAttribute('data-i18n', key);
    });
    const instructions = document.querySelector('#question');
    if (location.pathname.endsWith('/Instruction.html') && instructions) instructions.dataset.i18n = 'instructionText';
    I18n.translateDOM();
});
