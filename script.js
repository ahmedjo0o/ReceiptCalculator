function goToStep2() {
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
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
    } else {
        alert('Please enter a valid number of people.');
    }
}

function goToStep3() {
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
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'block';
}

function goToStep4() {
    const totalOrder = document.getElementById('total-order').value;
    const subTotal = document.getElementById('sub-total').value;
    if (totalOrder && subTotal && parseFloat(totalOrder) >= parseFloat(subTotal)) {
        const nameInputs = document.getElementsByClassName('person-name');
        const names = [];
        for (let input of nameInputs) {
            names.push(input.value);
        }
        const thead = document.getElementById('order-table').getElementsByTagName('thead')[0].getElementsByTagName('tr')[0];
        const tbody = document.getElementById('order-table').getElementsByTagName('tbody')[0];
        thead.innerHTML = '';
        tbody.innerHTML = '';
        names.forEach(name => {
            const th = document.createElement('th');
            th.innerText = name;
            thead.appendChild(th);
        });
        for (let i = 0; i < 5; i++) { // Assume max 5 items per person
            const row = tbody.insertRow();
            for (let j = 0; j < names.length; j++) {
                const cell = row.insertCell();
                const input = document.createElement('input');
                input.type = 'number';
                input.step = '0.01';
                input.classList.add('order-value');
                cell.appendChild(input);
            }
        }
        document.getElementById('step3').style.display = 'none';
        document.getElementById('step4').style.display = 'block';
    } else {
        alert('Please enter valid total order and sub-total values.');
    }
}

function calculateVAT() {
    const totalOrder = parseFloat(document.getElementById('total-order').value);
    const subTotal = parseFloat(document.getElementById('sub-total').value);
    const vat = totalOrder - subTotal;
    const tbody = document.getElementById('order-table').getElementsByTagName('tbody')[0];
    const rows = tbody.getElementsByTagName('tr');
    const nameInputs = document.getElementsByClassName('person-name');
    const names = [];
    for (let input of nameInputs) {
        names.push(input.value);
    }
    const orderTotals = Array(names.length).fill(0);
    for (let row of rows) {
        const cells = row.getElementsByTagName('td');
        for (let i = 0; i < cells.length; i++) {
            const value = parseFloat(cells[i].getElementsByTagName('input')[0].value) || 0;
            orderTotals[i] += value;
        }
    }
    const totalOrderValue = orderTotals.reduce((acc, cur) => acc + cur, 0);
    const resultTable = document.getElementById('result-table').getElementsByTagName('tbody')[0];
    resultTable.innerHTML = '';
    orderTotals.forEach((orderValue, index) => {
        const percentage = orderValue / totalOrderValue;
        const vatShare = percentage * vat;
        const totalToPay = orderValue + vatShare;
        const row = resultTable.insertRow();
        row.insertCell(0).innerText = names[index];
        row.insertCell(1).innerText = orderValue.toFixed(2);
        row.insertCell(2).innerText = vatShare.toFixed(2);
        row.insertCell(3).innerText = totalToPay.toFixed(2);
    });
    document.getElementById('step4').style.display = 'none';
    document.getElementById('result').style.display = 'block';
}

function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text('Results', 10, 10);

    const rows = document.getElementById('result-table').getElementsByTagName('tbody')[0].rows;
    let y = 20;
    for (let row of rows) {
        const cells = row.cells;
        doc.text(cells[0].innerText, 10, y);
        doc.text(cells[1].innerText, 60, y);
        doc.text(cells[2].innerText, 110, y);
        doc.text(cells[3].innerText, 160, y);
        y += 10;
    }

    doc.save('results.pdf');
}
