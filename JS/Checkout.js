document.addEventListener('DOMContentLoaded', function() {

    var formData = JSON.parse(localStorage.getItem('subs'));

    if (formData) {

        var tbody = document.getElementById('form-data');

        var totalPrice = 0;

        formData.forEach(function(entry) {
            var row = document.createElement('tr');

            var subNameCell = document.createElement('td');
            subNameCell.textContent = entry.subName;
            row.appendChild(subNameCell);

            var sizeCell = document.createElement('td');
            sizeCell.textContent = entry.size;
            row.appendChild(sizeCell);

            var breadCell = document.createElement('td');
            breadCell.textContent = entry.bread;
            row.appendChild(breadCell);

            var toppingsCell = document.createElement('td');
            toppingsCell.textContent = entry.toppings.join(', ');
            row.appendChild(toppingsCell);

            var saucesCell = document.createElement('td');
            saucesCell.textContent = entry.sauces.join(', ');
            row.appendChild(saucesCell);

            var priceCell = document.createElement('td');
            priceCell.textContent = 'R' + entry.price.toFixed(2);
            row.appendChild(priceCell);

            totalPrice += entry.price;

            tbody.appendChild(row);
        });

        var totalPriceElement = document.getElementById('total-price');
        totalPriceElement.textContent = 'R' + totalPrice.toFixed(2);

        function applyDiscount() {
            var discountedPrice = totalPrice - (totalPrice * 0.15);
            totalPriceElement.textContent = 'R' + discountedPrice.toFixed(2);
        }

        var discountButton = document.getElementById('add-discount');
        if (discountButton) {
            discountButton.addEventListener('click', applyDiscount);
        }
    }
});
