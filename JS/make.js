document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('sub-form');
  const cardContainer = document.getElementById('card-container');
  const totalPriceElement = document.getElementById('total-price');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const subName = document.getElementById('sub-name').value;
    const sizeSelect = document.getElementById('size');
    const sizeOption = sizeSelect.options[sizeSelect.selectedIndex];
    const size = sizeOption.value;
    const price = parseFloat(sizeOption.getAttribute('data-price').replace(',', '.')) || 0;
    const bread = document.querySelector('input[name="bread"]:checked').value;
    const toppings = Array.from(document.querySelectorAll('input[name="topping"]:checked')).map(function(checkbox) {
      return checkbox.value;
    });
    const sauces = Array.from(document.querySelectorAll('input[name="sauce"]:checked')).map(function(checkbox) {
      return checkbox.value;
    });

    createCard(subName, size, bread, toppings, sauces, price);

    const totalPrice = getTotalPrice();
    totalPriceElement.textContent = `R${totalPrice.toFixed(2)}`;

    saveDataToLocalStorage(subName, size, bread, toppings, sauces, price);

    form.reset();
  });

  function createCard(subName, size, bread, toppings, sauces, price) {
    // Create card HTML
    const cardHTML = `
      <div class="card">
        <h4>${subName}</h4>
        <p>Size: ${size}</p>
        <p>Bread: ${bread}</p>
        <p>Toppings: ${toppings.join(', ')}</p>
        <p>Sauces: ${sauces.join(', ')}</p>
        <p>Price: R${price.toFixed(2)}</p>
      </div>
    `;

    // Append card to the container
    cardContainer.insertAdjacentHTML('beforeend', cardHTML);
  }

  function getTotalPrice() {
    const cards = document.querySelectorAll('.card');
    let totalPrice = 0;

    cards.forEach(function(card) {
      const priceText = card.querySelector('p:last-child').textContent;
      const price = parseFloat(priceText.split('R')[1]);

      totalPrice += price;
    });

    return totalPrice;
  }

  function saveDataToLocalStorage(subName, size, bread, toppings, sauces, price) {
    const subData = {
      subName: subName,
      size: size,
      bread: bread,
      toppings: toppings,
      sauces: sauces,
      price: price
    };

    let existingData = JSON.parse(localStorage.getItem('subs')) || [];
    existingData.push(subData);

    localStorage.setItem('subs', JSON.stringify(existingData));
  }

  function displayExistingCards() {
    const existingData = JSON.parse(localStorage.getItem('subs')) || [];

    existingData.forEach(function(data) {
      createCard(data.subName, data.size, data.bread, data.toppings, data.sauces, data.price);
    });

    const totalPrice = getTotalPrice();
    totalPriceElement.textContent = `R${totalPrice.toFixed(2)}`;
  }

  displayExistingCards();
});