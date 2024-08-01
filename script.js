function generateNames() {
    const numPeople = document.getElementById('num-people').value;
    if (numPeople && numPeople > 0) {
        const namesForm = document.getElementById('names-form');
        namesForm.innerHTML = '';
        for (let i = 0; i < numPeople; i++) {
            const label = document.createElement('label');
            label.innerText = `Name ${i + 1}:`;
            const input = document.createElement('input');
            input.type = 'text';
            input.required = true;
            input.classList.add('person-name');
            namesForm.appendChild(label);
            namesForm.appendChild(input);
        }
    } else {
        alert('Please enter a valid number of people.');
    }
}

function goToStep2() {
    const totalOrder = document.getElementById('total-order').value;
    const subTotal = document.getElementById('sub-total').value;
    const nameInputs = document.getElementsByClassName('person-name');
    const names = [];
    for (let input of nameInputs) {
        if (input.value) {
            names.push(input.value);
        } else {
            alert('Please enter all names.');
            return;
        }
    }

    if (totalOrder && subTotal && parseFloat(totalOrder) >= parseFloat(subTotal)) {
        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML = '';
        names.forEach(name => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="card-header">${name}</div>
                <div class="card-content">
                    <span>Order Value 1:</span>
                    <input type="number" class="order-value" step="0.01" required>
                </div>
                <div class="card-content">
                    <span>Order Value 2:</span>
                    <input type="number" class="order-value" step="0.01" required>
                </div>
                <div class="card-content">
                    <span>Order Value 3:</span>
                    <input type="number" class="order-value" step="0.01" required>
                </div>
                <div class="card-content">
                    <span>Order Value 4:</span>
                    <input type="number" class="order-value" step="0.01" required>
                </div>
                <div class="card-content">
                    <span>Order Value 5:</span>
                    <input type="number" class="order-value" step="0.01" required>
                </div>
            `;
            cardsContainer.appendChild(card);
        });

        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
    } else {
        alert('Please enter valid total order and sub-total values.');
    }
}

function goToStep1() {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
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
    if (totalOrderValue !== subTotal) {
        alert('The total value of people\'s orders does not match the sub-total value. Please review your inputs.');
        return;
    }

    const resultCardsContainer = document.getElementById('result-cards-container');
    resultCardsContainer.innerHTML = '';
    orderTotals.forEach((orderValue, index) => {
        const percentage = orderValue / totalOrderValue;
        const vatShare = percentage * vat;
        const totalToPay = orderValue + vatShare;
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-header">${names[index]}</div>
            <div class="card-content">
                <span>Order Value:</span> ${orderValue.toFixed(2)}
            </div>
            <div class="card-content">
                <span>VAT:</span> ${vatShare.toFixed(2)}
            </div>
            <div class="card-content">
                <span>Total to Pay:</span> ${totalToPay.toFixed(2)}
            </div>
        `;
        resultCardsContainer.appendChild(card);
    });
    document.getElementById('step2').style.display = 'none';
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
}
