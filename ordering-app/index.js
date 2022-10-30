import { menuArray } from "./data.js";

// ** DOM Nodes **
const menuList = document.querySelector('#menu-list');
const orderContainer = document.querySelector('#your-order');
const orderList = document.querySelector('#order-list');
const orderArray = [];
const completeOrderForm = document.querySelector('#payment-form');
const completeOrderModal = document.querySelector('#complete-order-modal');



// ** Rendering the menu items **
function renderMenu() {

    menuList.innerHTML = '';

    menuArray.forEach(item => {

        let ingredientsHtml = '';

        item.ingredients.forEach(ingredient => {
            ingredientsHtml += `${ingredient},`;
        })

        menuList.innerHTML +=
        `
            <li class="menu-item">
                <div class="menu-item-content">
                    <div class="menu-item-emoji-container"> <p>${item.emoji}</p> </div>

                    <div class="menu-item-details">
                        <p class="menu-item-title">${item.name}</p>
                        <p class="menu-item-ingredients">${ingredientsHtml}</p>
                    </div>
                </div>

                <div class="menu-item-actions">
                    <button class="add-to-order-btn" data-item="${item.id}"> <i class="fa-solid fa-plus" aria-hidden="true"></i> </button>
                </div>

            </li>
        `
    });

    // Event listener for all of the 'Add to menu' buttons.
    document.querySelectorAll('.add-to-order-btn').forEach(e => {
        e.addEventListener('click', () => {
            orderArray.push(menuArray[e.dataset.item]);
            renderOrder();
        });
    });
};

// ** Rendering the order **
function renderOrder() {

    orderList.innerHTML = '';

    // The 'orderContainer' is hidden until an item is added to the order.

    if (orderArray.length > 0) {

        orderContainer.style.display = 'block';

        let totalPrice = 0;

        orderArray.forEach((item, index) => {

            orderList.innerHTML += 
            `
                <li class="order-list-item"> 
                    <div>
                        <p class="order-list-item-name">${item.name}</p> <button class="remove-order-item-btn" data-index="${index}">remove</button>
                    </div> 
                    <p class="order-list-item-price">$${item.price}</p>
                </li>
            `;

            totalPrice += item.price;
    
        });
    
        // Event listener for all of the 'Remove' buttons in individual order items.
        document.querySelectorAll('.remove-order-item-btn').forEach(e => {
            e.addEventListener('click', () => {
                removeOrderItem(e.dataset.index);
            });
        });

        document.querySelector('#total-price-el').innerHTML = `$${totalPrice}`;

    } else {

        orderContainer.style.display = 'none';

    }
};

// Removing an item from the 'orderArray'
function removeOrderItem(index) {
    orderArray.splice(index, 1);
    renderOrder();
};



// ** Completing the order **

// Opening the payment modal
document.querySelector('#complete-order-btn').addEventListener('click', () => {
    completeOrderModal.showModal();
});

// Adding 'submit' event listener to the form
completeOrderForm.addEventListener('submit', e => {
    e.preventDefault();

    const paymentFormData = new FormData(completeOrderForm);

    completeOrderModal.close();

    completeOrderForm.reset();
    
    orderContainer.innerHTML = 
    `
        <div class="thank-you-card">
            <p>Thanks, ${paymentFormData.get('payment-form-username')}! Your order is on its way!</p>
        </div>
    `;

    document.querySelectorAll('.add-to-order-btn').forEach(e => {
        console.log(e)
        e.disabled = 'true'
    })
});

// Rendering both the menu and the order when the page loads
renderMenu();
renderOrder();