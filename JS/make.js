function changeTab(index) {
  var tabs = document.getElementsByClassName('tab');
  var tabContents = document.getElementsByClassName('tab-content');

  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active');
    tabContents[i].classList.remove('active');
  }

  tabs[index].classList.add('active');
  tabContents[index].classList.add('active');
}

var tabs = document.getElementsByClassName('tab');
for (var i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function(e) {
    var index = Array.from(tabs).indexOf(e.target);
    changeTab(index);
  });
}

const tabContents = document.querySelectorAll(".tab-content");

tabContents.forEach(tabContent => {
  const form = tabContent.querySelector("form");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    const currentOrderBox = document.getElementById("current-order");
    currentOrderBox.innerHTML = `
      <h3>Current Order</h3>
      <p>Size: ${formObject.size}</p>
      <p>Bread: ${formObject.bread}</p>
      <p>Toppings: ${formObject.topping}</p>
      <p>Sauces: ${formObject.sauce}</p>
    `;
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const pizzaName = document.querySelector('#pizza-name').value;
    const size = document.querySelector('#size').value;
    const bread = document.querySelector('input[name="bread"]:checked').value;

    const toppingsCheckboxes = document.querySelectorAll('input[name="topping"]:checked');
    const toppings = Array.from(toppingsCheckboxes).map(checkbox => checkbox.value);

    const saucesCheckboxes = document.querySelectorAll('input[name="sauce"]:checked');
    const sauces = Array.from(saucesCheckboxes).map(checkbox => checkbox.value);

    const pizzaOrder = {
      "Pizza Name": pizzaName,
      "Size": size,
      "Bread": bread,
      "Toppings": toppings,
      "Sauces": sauces
    };

    console.log(pizzaOrder);

    form.reset();
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const orderDetails = document.getElementById('order-details');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    const orderHTML = `
      <p><strong>Pizza Name:</strong> ${formObject['pizza-name']}</p>
      <p><strong>Size:</strong> ${formObject['size']}</p>
      <p><strong>Bread:</strong> ${formObject['bread']}</p>
      <p><strong>Toppings:</strong> ${formObject['topping']}</p>
      <p><strong>Sauces:</strong> ${formObject['sauce']}</p>
    `;

    orderDetails.innerHTML = orderHTML;

  });
});