const budgetForm = document.getElementById('budget-form');
const sumInput = document.querySelector('#sum-input');
const sectionSelect = document.querySelector('#section-select');
const formOutput = document.getElementById('form-output');
const cards = document.querySelectorAll('.card');
const rules = document.querySelectorAll('.rule');

rules.forEach((rule) => {
    rule.addEventListener('click', () => {
        const list = rule.parentElement;                 
        const num = rule.firstElementChild;              
        const text = num.nextElementSibling;             

        Array.from(list.children).forEach((el) => {
            el.classList.remove('active');
        });

        rule.classList.add('active');
        if (text) {
            num.style.fontWeight = 'bold';
        }
    });
});

cards.forEach((card) => {
    card.addEventListener('click', () => {
        const cardsContainer = card.parentElement;     
        const title = card.querySelector('h3');

        Array.from(cardsContainer.children).forEach((item) => {
            item.classList.remove('selected');
        });

        card.classList.add('selected');
        if (title) {
            sectionSelect.value = card.dataset.section;
        }
    });
});

budgetForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const sum = Number(sumInput.value);
    const section = sectionSelect.value;
    let levelText = '';
    let sectionNote = '';

    if (sumInput.value === '' || sum < 0) {
        levelText = 'Укажи число от 0.';
    } else if (sum === 0) {
        levelText = 'Сумма 0 — старт с нуля.';
    } else if (sum < 500) {
        levelText = `Сумма ${sum} — небольшой остаток.`;
    } else {
        levelText = `Сумма ${sum} — есть запас.`;
    }

    switch (section) {
        case 'budget':
            sectionNote = 'Раздел: Мой бюджет.';
            break;
        case 'pocket':
            sectionNote = 'Раздел: Карманные деньги.';
            break;
        case 'savings':
            sectionNote = 'Раздел: Накопления.';
            break;
        case 'mistakes':
            sectionNote = 'Раздел: Финансовые ошибки.';
            break;
        default:
            sectionNote = '';
    }

    formOutput.textContent = `${levelText} ${sectionNote}`;
});