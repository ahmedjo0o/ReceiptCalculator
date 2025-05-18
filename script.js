const translations = {
    en: {
        appTitle: 'Receipt Split Calculator',
        selectLanguage: 'Select Language',
        numPeople: 'Number of People:',
        totalOrder: 'Total Order Value:',
        subTotal: 'Sub-total Value:',
		totalSumLabel: 'Total'
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
        orderValueLabel: 'Total Orders',
        orderValueLabel2: 'Order',
        vatLabel: 'VAT',
        totalToPayLabel: 'Total to Pay',
        footerText: 'All rights reserved ©',
        mismatchAlert: 'Subtotal mismatch detected',
        confirmReset: 'Are you sure you want to reset?',
        shareResult: 'Share',
        saveAllResults: 'Save All as Image'
    },
    ar: {
        appTitle: 'احسب فاتورتك مع صحابك',
        selectLanguage: 'اختر اللغة',
        numPeople: 'عدد الأشخاص:',
        totalOrder: 'قيمة الفاتورة:',
        subTotal: 'قيمة الطلبات بدون ضريبة:',
		totalSumLabel: 'الإجمالي',
        generateNamesButton: 'ابدأ',
        nextButton: 'التالي',
        backButton: 'السابق',
        calculateButton: 'احسب',
        startAgainButton: 'البدء من جديد',
        resultsTitle: 'النتائج',
        numPeopleError: 'يرجى ملء هذا الحقل',
        totalOrderError: 'يرجى ملء هذا الحقل',
        subTotalError: 'يرجى ملء هذا الحقل',
        nameLabel: 'اسم',
        nameError: 'يرجى ملء هذا الحقل',
        mismatchError: 'قيمة الطلبات لا تتطابق مع الإجمالي. يرجى التحقق من إدخالاتك.',
        orderValueLabel: 'مجموع الطلبات',
        orderValueLabel2: 'طلب',
        vatLabel: 'الضريبة',
        totalToPayLabel: 'الإجمالي',
        footerText: 'جميع الحقوق محفوظة ©',
        mismatchAlert: 'الفرق كبير بين المجموع والقيمة الفرعية',
        confirmReset: 'هل تريد البدء من جديد؟',
        shareResult: 'مشاركة',
        saveAllResults: 'حفظ الكل كصورة'
    }
};

let currentLanguage = 'ar';

function setLanguage(language) {
    currentLanguage = language;
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
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
    document.getElementById('button-save-all').innerText = translations[language].saveAllResults;
    
    if (document.getElementById('step1').style.display !== 'none') {
        const numPeople = document.getElementById('num-people').value;
        if (numPeople > 0) {
            const names = Array.from(document.querySelectorAll('.person-name')).map(input => input.value);
            generateNames();
            document.querySelectorAll('.person-name').forEach((input, index) => {
                if (names[index]) input.value = names[index];
            });
        }
    }
    
    if (document.getElementById('step3').style.display === 'block') {
        refreshOrderLabels();
    }
    
    if (document.getElementById('result').style.display === 'block') {
        refreshResultLabels();
    }
	
	if (document.getElementById('step3').style.display === 'block') {
        updateTotalSum();
    }
}

function toggleLanguage() {
    const newLang = currentLanguage === 'ar' ? 'en' : 'ar';
    selectLanguage(newLang);
}

function selectLanguage(language) {
    currentLanguage = language;
    setLanguage(language);
    updateLanguageButton();
}

function updateLanguageButton() {
    const langText = currentLanguage === 'ar' ? 'English' : 'العربية';
    document.getElementById('language-text').textContent = langText;
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

function refreshOrderLabels() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.querySelector('.card-subtotal').textContent = 
            `${translations[currentLanguage].orderValueLabel}: 0.00`;
        const orderInputs = card.querySelectorAll('.card-content span');
        orderInputs.forEach((span, index) => {
            span.textContent = `${translations[currentLanguage].orderValueLabel2} ${index + 1}:`;
        });
    });
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

function goToStep2FromStep3() {
    document.getElementById('step3').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
    document.getElementById('mismatch-alert').style.display = 'none';
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
        document.getElementById('mismatch-alert').style.display = 'none';

        const nameInputs = document.getElementsByClassName('person-name');
        const names = [];
        for (let input of nameInputs) {
            names.push(input.value);
        }

        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML = '';
        names.forEach(name => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="card-header">${name}</div>
                <div class="card-subtotal">${translations[currentLanguage].orderValueLabel}: 0.00</div>
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

        // إضافة خانة الإجمالي الكلي
        const totalSumContainer = document.createElement('div');
        totalSumContainer.id = 'total-sum-container';
        totalSumContainer.innerHTML = `
            <div class="card-subtotal" id="total-sum-display">
                ${translations[currentLanguage].totalSumLabel}: 0.00
            </div>
        `;
        cardsContainer.appendChild(totalSumContainer);
    } else if (allFilled) {
        document.getElementById('mismatch-alert').textContent = translations[currentLanguage].mismatchAlert;
        document.getElementById('mismatch-alert').style.display = 'block';
    }
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
    updateSubtotal(button.closest('.card'));
}

function removeOrderValue(button) {
    const cardContentContainer = button.closest('.card').querySelector('.card-content-container');
    if (cardContentContainer.children.length > 1) {
        cardContentContainer.removeChild(cardContentContainer.lastChild);
        updateSubtotal(button.closest('.card'));
    }
}

function updateSubtotal(card) {
    const inputs = card.querySelectorAll('.order-value');
    const total = Array.from(inputs).reduce((acc, input) => acc + (parseFloat(input.value) || 0), 0);
    card.querySelector('.card-subtotal').textContent = 
        `${translations[currentLanguage].orderValueLabel}: ${total.toFixed(2)}`;
    
    updateTotalSum();
}

function updateTotalSum() {
    const cards = document.querySelectorAll('.card');
    let totalSum = 0;
    
    cards.forEach(card => {
        const subtotalText = card.querySelector('.card-subtotal').textContent;
        const value = parseFloat(subtotalText.split(': ')[1]) || 0;
        totalSum += value;
    });
    
    const totalElement = document.getElementById('total-sum-display');
    if (totalElement) {
        totalElement.textContent = `${translations[currentLanguage].totalSumLabel}: ${totalSum.toFixed(2)}`;
    }
}

function goToStep3FromResults() {
    document.getElementById('result').style.display = 'none';
    document.getElementById('step3').style.display = 'block';
    document.getElementById('result-cards-container').innerHTML = '';
}

function calculateVAT() {
    const totalOrder = parseFloat(document.getElementById('total-order').value);
    const subTotal = parseFloat(document.getElementById('sub-total').value);
    const vat = totalOrder - subTotal;
    const cards = document.getElementsByClassName('card');
    const orderValues = Array.from(cards).map(card => 
        Array.from(card.querySelectorAll('.order-value')).map(input => parseFloat(input.value) || 0)
    );

    const orderTotals = orderValues.map(values => values.reduce((acc, cur) => acc + cur, 0));
    const totalOrderValue = orderTotals.reduce((acc, cur) => acc + cur, 0);

    if (Math.abs(totalOrderValue - subTotal) > 2) {
        document.getElementById('mismatch-alert').textContent = translations[currentLanguage].mismatchAlert;
        document.getElementById('mismatch-alert').style.display = 'block';
        return;
    } else {
        document.getElementById('mismatch-alert').style.display = 'none';
    }

    const resultCardsContainer = document.getElementById('result-cards-container');
    resultCardsContainer.innerHTML = '';
    orderTotals.forEach((orderValue, index) => {
        const percentage = orderValue / totalOrderValue;
        const vatShare = percentage * vat;
        const totalToPay = (orderValue + vatShare).toFixed(2);
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-header">${cards[index].querySelector('.card-header').innerText}</div>
            <div class="card-content">
                <span>${translations[currentLanguage].orderValueLabel}:</span> ${orderValue.toFixed(2)}
            </div>
            <div class="card-content">
                <span>${translations[currentLanguage].vatLabel}:</span> ${vatShare.toFixed(2)}
            </div>
            <div class="card-content total-to-pay">
                <span>${translations[currentLanguage].totalToPayLabel}:</span> ${totalToPay}
            </div>
        `;

        const shareButton = document.createElement('button');
        shareButton.className = 'share-btn';
        shareButton.innerHTML = translations[currentLanguage].shareResult;
        shareButton.onclick = () => shareResult(card);
        card.appendChild(shareButton);

        resultCardsContainer.appendChild(card);
    });
    document.getElementById('step3').style.display = 'none';
    document.getElementById('result').style.display = 'block';
}

function refreshResultLabels() {
    const resultCards = document.querySelectorAll('#result-cards-container .card');
    resultCards.forEach(card => {
        const contents = card.querySelectorAll('.card-content span');
        contents[0].textContent = `${translations[currentLanguage].orderValueLabel}:`;
        contents[1].textContent = `${translations[currentLanguage].vatLabel}:`;
        contents[2].textContent = `${translations[currentLanguage].totalToPayLabel}:`;
    });
}

async function shareResult(cardElement) {
    try {
        const canvas = await html2canvas(cardElement);
        canvas.toBlob((blob) => {
            const file = new File([blob], 'receipt.png', { type: 'image/png' });
            if (navigator.share) {
                navigator.share({
                    title: 'Receipt',
                    files: [file]
                });
            } else {
                alert(translations[currentLanguage].shareError || 'المشاركة غير مدعومة');
            }
        });
    } catch (err) {
        console.error('Error sharing:', err);
    }
}

async function saveAllResults() {
    try {
        const container = document.getElementById('result-cards-container');
        const canvas = await html2canvas(container);
        const link = document.createElement('a');
        link.download = 'all-receipts.png';
        link.href = canvas.toDataURL();
        link.click();
    } catch (err) {
        alert(translations[currentLanguage].saveError || 'حدث خطأ أثناء الحفظ');
    }
}

function startAgain() {
    if (confirm(translations[currentLanguage].confirmReset)) {
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
}

function openFacebook(event) {
    event.preventDefault();
    window.location.href = "https://facebook.com/ahmed.joo";
}

document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', () => {
        if (input.value < 0) input.value = 0;
    });
});

document.addEventListener('input', (e) => {
    if (e.target.classList.contains('order-value')) {
        updateSubtotal(e.target.closest('.card'));
    }
});