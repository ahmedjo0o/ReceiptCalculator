let currentLanguage = 'en';

const translations = {
  en: {
    appTitle: 'Receipt Calculator',
    numPeople: 'Number of People:',
    totalOrder: 'Total Receipt Value:',
    subTotal: 'Sub-total:',
    generateNamesButton: 'Go',
    nextButton: 'Next',
    backButton: 'Back',
    calculateButton: 'Calculate',
    resultsTitle: 'Results',
    startAgainButton: 'Start Again',
	shareResultButton: 'Share',
    order: 'Order',
    vat: 'VAT',
    totalToPay: 'Total to Pay',
    nameLabel: 'Name',
    nameError: 'Please enter a name',
    mismatchError: 'Subtotal mismatch!',
    footerText: 'All rights reserved ©',
    totalWithoutVAT: 'Total without VAT',
    discount: 'Discount (optional):'
  },
  ar: {
    appTitle: 'احسب فاتورتك مع أصدقائك',
    numPeople: 'عدد الأشخاص:',
    totalOrder: 'إجمالي الفاتورة:',
    subTotal: 'إجمالي الطلبات (بدون ضريبة):',
    generateNamesButton: 'ابدأ',
    nextButton: 'التالي',
    backButton: 'السابق',
    calculateButton: 'احسب',
    resultsTitle: 'النتائج',
    startAgainButton: 'احسب مرة اخرى',
	shareResultButton: 'مشاركة',
    order: 'الطلبات',
    vat: 'الضريبة',
    totalToPay: 'الإجمالي',
    nameLabel: 'اسم',
    nameError: 'يرجى ملء هذا الحقل',
    mismatchError: 'المجموع غير مطابق!',
    footerText: 'جميع الحقوق محفوظة ©',
    totalWithoutVAT: 'الإجمالي بدون ضريبة',
    discount: 'الخصم (اختياري):'
  }
};

function setLanguage(lang) {
  currentLanguage = lang;
  const t = translations[lang];

  document.getElementById('app-title').innerText = t.appTitle;
  document.getElementById('label-num-people').innerText = t.numPeople;
  document.getElementById('label-total-order').innerText = t.totalOrder;
  document.getElementById('label-sub-total').innerText = t.subTotal;
  document.getElementById('label-discount').innerText = t.discount;
  document.getElementById('generate-names-button').innerText = t.generateNamesButton;
  document.getElementById('next-button').innerText = t.nextButton;
  document.getElementById('back-to-step1-button').innerText = t.backButton;
  document.getElementById('back-to-step3-button').innerText = t.backButton;
  document.getElementById('calculate-button').innerText = t.calculateButton;
  document.getElementById('results-title').innerText = t.resultsTitle;
  document.getElementById('start-again-button').innerText = t.startAgainButton;
  document.getElementById('share-result-button').innerText = t.shareResultButton;
  document.getElementById('footer-text').innerText = t.footerText;

  document.querySelectorAll('#names-form label').forEach((label, i) => {
    label.innerText = `${t.nameLabel} ${i + 1}`;
  });

  document.querySelectorAll('#cards-container .card').forEach(card => {
    const spans = card.querySelectorAll('.card-content span');
    spans.forEach((span, i) => {
      span.innerText = `${t.order} ${i + 1}:`;
    });
  });

  document.querySelectorAll('#result-cards-container .card').forEach(card => {
    const spans = card.querySelectorAll('.card-content');
    if (spans.length >= 3) {
      spans[0].innerHTML = `${t.order}: ${spans[0].innerText.split(':')[1]}`;
      spans[1].innerHTML = `${t.vat}: ${spans[1].innerText.split(':')[1]}`;
      spans[2].innerHTML = `<strong>${t.totalToPay}: ${spans[2].innerText.split(':')[1]}</strong>`;
    }
  });

  document.querySelectorAll('.person-subtotal-label').forEach(span => {
    const value = span.innerText.split(':')[1];
    span.innerText = `${t.totalWithoutVAT}: ${value}`;
  });
}

function generateNames() {
  const count = document.getElementById('num-people').value;
  const container = document.getElementById('names-form');
  container.innerHTML = '';

  for (let i = 1; i <= count; i++) {
    const label = document.createElement('label');
    label.innerText = `${translations[currentLanguage].nameLabel} ${i}`;
    const input = document.createElement('input');
    input.classList.add('person-name');
    input.type = 'text';
    input.required = true;
    container.appendChild(label);
    container.appendChild(input);
  }

  document.getElementById('next-button').style.display = 'inline-block';
}

function goToStep2FromStep1() {
  const names = document.querySelectorAll('.person-name');
  const valid = [...names].every(input => input.value.trim());

  if (!valid) return alert(translations[currentLanguage].nameError);

  document.getElementById('step1').style.display = 'none';
  document.getElementById('step2and3').style.display = 'block';

  generateOrderCards();
}

function generateOrderCards() {
  const names = [...document.querySelectorAll('.person-name')].map(input => input.value.trim());
  const container = document.getElementById('cards-container');
  container.innerHTML = '';

  names.forEach(name => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-header">${name}</div>
      <div class="card-content-container">
        <div class="card-content">
          <span>${translations[currentLanguage].order} 1:</span>
          <input type="number" class="order-value" oninput="updateSubtotal(this)">
        </div>
      </div>
      <div class="card-controls">
        <button onclick="addOrderValue(this)">+</button>
        <button onclick="removeOrderValue(this)">-</button>
      </div>
      <div class="card-total">
        <span class="person-subtotal-label">${translations[currentLanguage].totalWithoutVAT}: 0.00</span>
      </div>
    `;
    container.appendChild(card);
  });
}

function addOrderValue(button) {
  const container = button.closest('.card').querySelector('.card-content-container');
  const count = container.children.length + 1;
  const div = document.createElement('div');
  div.classList.add('card-content');
  div.innerHTML = `<span>${translations[currentLanguage].order} ${count}:</span>
    <input type="number" class="order-value" oninput="updateSubtotal(this)">`;
  container.appendChild(div);
}

function removeOrderValue(button) {
  const container = button.closest('.card').querySelector('.card-content-container');
  if (container.children.length > 1) container.removeChild(container.lastChild);
}

function updateSubtotal(input) {
  const card = input.closest('.card');
  const values = [...card.querySelectorAll('.order-value')].map(i => parseFloat(i.value) || 0);
  const total = values.reduce((a, b) => a + b, 0);
  card.querySelector('.person-subtotal-label').innerText =
    `${translations[currentLanguage].totalWithoutVAT}: ${total.toFixed(2)}`;
}

function calculateVAT() {
  const totalOrder = parseFloat(document.getElementById('total-order').value);
  const subTotal = parseFloat(document.getElementById('sub-total').value);
  const discount = parseFloat(document.getElementById('discount').value) || 0;
  const vat = totalOrder - subTotal;

  const cards = document.querySelectorAll('#cards-container .card');
  const results = document.getElementById('result-cards-container');
  results.innerHTML = '';

  const totals = [...cards].map(card => {
    const name = card.querySelector('.card-header').innerText;
    const sum = [...card.querySelectorAll('.order-value')].reduce(
      (total, input) => total + (parseFloat(input.value) || 0), 0
    );
    return { name, sum };
  });

  const checkSum = totals.reduce((a, b) => a + b.sum, 0);
  if (Math.abs(checkSum - subTotal) > 2)
    return alert(translations[currentLanguage].mismatchError);

  totals.forEach(({ name, sum }) => {
    const percent = sum / checkSum;
    const vatShare = vat * percent;
    const discountShare = discount * percent;
    const totalPay = Math.round(sum + vatShare - discountShare);

    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-header">${name}</div>
      <div class="card-content">${translations[currentLanguage].order}: ${sum.toFixed(2)}</div>
      <div class="card-content">${translations[currentLanguage].vat}: ${vatShare.toFixed(2)}</div>
      <div class="card-content">${translations[currentLanguage].discount.replace(/\s*\(.*\)/, '')} ${discountShare.toFixed(2)}</div>
      <div class="card-content total-to-pay"><strong>${translations[currentLanguage].totalToPay}: ${totalPay.toFixed(2)}</strong></div>
	  <button class="share-button" onclick="shareCard(this)">
		<svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16">
		<path d="M0 0h24v24H0z" fill="none"/>
		<path fill="currentColor" d="M12 5c-1.1 0-2 .9-2 2H5v10h14V7h-5c0-1.1-.9-2-2-2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 
		1.34-3 3-3z" />
		</svg>
	  </button>
    `;
    results.appendChild(card);
  });

  document.getElementById('step2and3').style.display = 'none';
  document.getElementById('result').style.display = 'block';
}

function shareCard(btn) {
  const card = btn.closest('.card');
  html2canvas(card).then(canvas => {
    canvas.toBlob(blob => {
      const file = new File([blob], "card.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({
          files: [file],
          title: 'Your Bill',
          text: 'Individual Bill Breakdown'
        }).catch(console.error);
      } else {
        const link = document.createElement('a');
        link.download = "card.png";
        link.href = URL.createObjectURL(file);
        link.click();
      }
    });
  });
}

function shareFullResult() {
  const resultContainer = document.getElementById('result-cards-container');
  html2canvas(resultContainer).then(canvas => {
    canvas.toBlob(blob => {
      const file = new File([blob], "full-results.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({
          files: [file],
          title: 'Receipt Results',
          text: 'Here is the full receipt breakdown'
        }).catch(console.error);
      } else {
        const link = document.createElement('a');
        link.download = "full-results.png";
        link.href = URL.createObjectURL(file);
        link.click();
      }
    });
  });
}

function goToStep2() {
  document.getElementById('result').style.display = 'none';
  document.getElementById('step2and3').style.display = 'block';
}

function goBackToStep1() {
  document.getElementById('step2and3').style.display = 'none';
  document.getElementById('step1').style.display = 'block';
}

function startAgain() {
  const message = currentLanguage === 'ar' ? 'البدء من جديد؟' : 'Start again?';
  if (confirm(message)) location.reload();
}

window.onload = () => {
  const savedLang = localStorage.getItem('preferredLanguage');
  currentLanguage = savedLang || currentLanguage;

  setLanguage(currentLanguage);
  document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
  document.querySelector('#language-select select').value = currentLanguage;
};
