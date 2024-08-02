const translations = {
    en: {
        appTitle: 'Receipt Split Calculator',
        selectLanguage: 'Select Language',
        numPeople: 'Number of People:',
        totalOrder: 'Total Order Value:',
        subTotal: 'Sub-total Value:',
        generateNamesButton: 'Go',
        nextButton: 'Next',
        backButton: 'Back',
        calculateButton: 'Calculate',
        startAgainButton: 'Start Again',
        resultsTitle: 'Results',
        numPeopleError: 'Please fill this field',
        totalOrderError: 'Please fill this field',
        subTotalError: 'Please fill this field',
		nameLabel: 'Name',
		nameError: 'Please fill this field',
		mismatchError: 'Order values do not match the sub-total. Please check your inputs.',
		orderValueLabel: 'Order Value',
		orderValueLabel2: 'Order',
        vatLabel: 'VAT',
        totalToPayLabel: 'Total to Pay',
        footerText: 'All rights reserved ©'
    },
    ar: {
        appTitle: 'احسب فاتورتك مع صحابك',
        selectLanguage: 'اختر اللغة',
        numPeople: 'عدد الأشخاص:',
        totalOrder: 'قيمة الفاتورة:',
        subTotal: 'قيمة الطلبات بدون ضريبة:',
        generateNamesButton: 'ابدأ',
        nextButton: 'التالي',
        backButton: 'السابق',
        calculateButton: 'احسب',
        startAgainButton: 'احسب مرة اخرى',
        resultsTitle: 'النتائج',
        numPeopleError: 'يرجى ملء هذا الحقل',
        totalOrderError: 'يرجى ملء هذا الحقل',
        subTotalError: 'يرجى ملء هذا الحقل',
		nameLabel: 'اسم',
		nameError: 'يرجى ملء هذا الحقل',
		mismatchError: 'قيمة الطلبات لا تتطابق مع الإجمالي. يرجى التحقق من إدخالاتك.',
		orderValueLabel: 'قيمة طلباتك',
		orderValueLabel2: 'قيمة طلب',
        vatLabel: 'ضريبة طلباتك',
        totalToPayLabel: 'إجمالي',
        footerText: 'جميع الحقوق محفوظة ©'
    }
};

let currentLanguage = 'en';

function setLanguage(language) {
    currentLanguage = language;
    document.getElementById('app-title').innerText = translations[language].appTitle;
    document.getElementById('label-num-people').innerText = translations[language].numPeople;
    document.getElementById('label-total-order').innerText = translations[language].totalOrder;
    document.getElementById('label-sub-total').innerText = translations[language].subTotal;
    document.getElementById('generate-names-button').innerText = translations[language].generateNamesButton;
    document.getElementById('next-button').innerText = translations[language].nextButton;
    document.getElementById('back-to-step1-button').innerText = translations[language].backButton;
    document.getElementById('next-to-step3-button').innerText = translations[language].nextButton;
    document.getElementById('back-to-step2-button').innerText = translations[language].backButton;
    document.getElementById('calculate-button').innerText = translations[language].calculateButton;
    document.getElementById('back-to-step3-button').innerText = translations[language].backButton;
    document.getElementById('start-again-button').innerText = translations[language].startAgainButton;
    document.getElementById('results-title').innerText = translations[language].resultsTitle;
    document.getElementById('num-people-error').innerText = translations[language].numPeopleError;
    document.getElementById('total-order-error').innerText = translations[language].totalOrderError;
    document.getElementById('sub-total-error').innerText = translations[language].subTotalError;
    document.getElementById('footer-text').innerText = translations[language].footerText;
}

function selectLanguage(language) {
    setLanguage(language);
    document.getElementById('language-selection').style.display = 'none';
    document.getElementById('app-content').style.display = 'block';
}

function generateNames() {
    const numPeople = document.getElementById('num-people').value;
    if (numPeople && numPeople > 0) {
        document.getElementById('num-people-error').style.display = 'none';
        document.getElementById('num-people').classList.remove('error');
        const namesForm = document.getElementById('names-form');
        namesForm.innerHTML = '';
        for (let i = 0; i < numPeople; i++) {
            const nameGroup = document.createElement('div');
            nameGroup.classList.add('name-input-group');
            const label = document.createElement('label');
            label.innerText = `${translations[currentLanguage].nameLabel} ${i + 1}:`;
            const input = document.createElement('input');
            input.type = 'text';
            input.required = true;
            input.classList.add('person-name');
            const errorMessage = document.createElement('span');
            errorMessage.classList.add('error-message');
            errorMessage.innerText = translations[currentLanguage].nameError;
            nameGroup.appendChild(label);
            nameGroup.appendChild(input);
            nameGroup.appendChild(errorMessage);
            namesForm.appendChild(nameGroup);
        }
        document.getElementById('next-button').style.display = 'block';
    } else {
        document.getElementById('num-people-error').style.display = 'block';
        document.getElementById('num-people').classList.add('error');
    }
}

function goToStep2FromStep1() {
    const nameInputs = document.getElementsByClassName('person-name');
    let allFilled = true;
    for (let input of nameInputs) {
        const errorMessage = input.nextElementSibling;
        if (input.value.trim() === '') {
            input.classList.add('error');
            errorMessage.style.display = 'block';
            allFilled = false;
        } else {
            input.classList.remove('error');
            errorMessage.style.display = 'none';
        }
    }

    if (allFilled) {
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
    }
}

function goToStep1FromStep2() {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
}

function goToStep3() {
    const totalOrder = document.getElementById('total-order').value;
    const subTotal = document.getElementById('sub-total').value;

    let allFilled = true;

    if (totalOrder.trim() === '') {
        document.getElementById('total-order').classList.add('error');
        document.getElementById('total-order-error').style.display = 'block';
        allFilled = false;
    } else {
        document.getElementById('total-order').classList.remove('error');
        document.getElementById('total-order-error').style.display = 'none';
    }

    if (subTotal.trim() === '') {
        document.getElementById('sub-total').classList.add('error');
        document.getElementById('sub-total-error').style.display = 'block';
        allFilled = false;
    } else {
        document.getElementById('sub-total').classList.remove('error');
        document.getElementById('sub-total-error').style.display = 'none';
    }

    if (allFilled && parseFloat(totalOrder) >= parseFloat(subTotal)) {
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step3').style.display = 'block';

        const nameInputs = document.getElementsByClassName('person-name');
        const names = [];
        for (let input of nameInputs) {
            if (input.value) {
                names.push(input.value);
            }
        }

        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML = '';
        names.forEach(name => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="card-header">${name}</div>
                <div class="card-content-container">
                    <div class="card-content">
                        <span>${translations[currentLanguage].orderValueLabel2} 1:</span>
                        <input type="number" class="order-value" step="0.01" required>
                    </div>
                </div>
                <div class="card-controls">
                    <button onclick="addOrderValue(this)">+</button>
                    <button onclick="removeOrderValue(this)">-</button>
                </div>
            `;
            cardsContainer.appendChild(card);
        });
    } else if (allFilled) {
        alert('Please enter valid total order and sub-total values.');
    }
}

function goToStep2FromStep3() {
    document.getElementById('step3').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
}

function goToStep3FromResults() {
    document.getElementById('result').style.display = 'none';
    document.getElementById('step3').style.display = 'block';
}

function addOrderValue(button) {
    const cardContentContainer = button.closest('.card').querySelector('.card-content-container');
    const orderValuesCount = cardContentContainer.children.length + 1;
    const newContent = document.createElement('div');
    newContent.classList.add('card-content');
    newContent.innerHTML = `
        <span>${translations[currentLanguage].orderValueLabel2} ${orderValuesCount}:</span>
        <input type="number" class="order-value" step="0.01" required>
    `;
    cardContentContainer.appendChild(newContent);
}

function removeOrderValue(button) {
    const cardContentContainer = button.closest('.card').querySelector('.card-content-container');
    if (cardContentContainer.children.length > 1) {
        cardContentContainer.removeChild(cardContentContainer.lastChild);
    }
}

function calculateVAT() {
    const totalOrder = parseFloat(document.getElementById('total-order').value);
    const subTotal = parseFloat(document.getElementById('sub-total').value);
    const vat = totalOrder - subTotal;
    const cardsContainer = document.getElementById('cards-container');
    const cards = cardsContainer.getElementsByClassName('card');
    const names = Array.from(cards).map(card => card.querySelector('.card-header').innerText);
    const orderValues = Array.from(cards).map(card => 
        Array.from(card.querySelectorAll('.order-value')).map(input => parseFloat(input.value) || 0)
    );

    const orderTotals = orderValues.map(values => values.reduce((acc, cur) => acc + cur, 0));
    const totalOrderValue = orderTotals.reduce((acc, cur) => acc + cur, 0);

    if (Math.abs(totalOrderValue - subTotal) > 2) {
        alert(translations[currentLanguage].mismatchError);
        return;
    }

    const resultCardsContainer = document.getElementById('result-cards-container');
    resultCardsContainer.innerHTML = '';
    orderTotals.forEach((orderValue, index) => {
        const percentage = orderValue / totalOrderValue;
        const vatShare = percentage * vat;
        const totalToPay = Math.round(orderValue + vatShare);
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-header">${names[index]}</div>
            <div class="card-content">
                <span>${translations[currentLanguage].orderValueLabel}:</span> ${orderValue.toFixed(2)}
            </div>
            <div class="card-content">
                <span>${translations[currentLanguage].vatLabel}:</span> ${vatShare.toFixed(2)}
            </div>
            <div class="card-content total-to-pay">
                <span>${translations[currentLanguage].totalToPayLabel}:</span> ${totalToPay.toFixed(2)}
            </div>
        `;
        resultCardsContainer.appendChild(card);
    });
    document.getElementById('step3').style.display = 'none';
    document.getElementById('result').style.display = 'block';
}

function startAgain() {
    document.getElementById('num-people').value = '';
    document.getElementById('total-order').value = '';
    document.getElementById('sub-total').value = '';
    document.getElementById('names-form').innerHTML = '';
    document.getElementById('cards-container').innerHTML = '';
    document.getElementById('result-cards-container').innerHTML = '';
    document.getElementById('result').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
    document.getElementById('next-button').style.display = 'none';
}

function openFacebook(event) {
    event.preventDefault();
    const facebookAppUrl = "fb://profile/ahmed.joo";
    const facebookWebUrl = "https://facebook.com/ahmed.joo";

    // Attempt to open the Facebook app
    window.location.href = facebookAppUrl;

    // If the Facebook app is not installed, fall back to the web URL
    setTimeout(() => {
        window.location.href = facebookWebUrl;
    }, 1000);
}
