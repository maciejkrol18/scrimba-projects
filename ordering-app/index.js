import { menuArray } from "./data.js";

const menuContainer = document.querySelector('#menu-container');
const orderContainer = document.querySelector('#your-order');
const orderArray = [];

function renderMenu() {

    menuContainer.innerHTML = '';

    menuArray.forEach(item => {

        let ingredientsHtml = '';

        item.ingredients.forEach(ingredient => {
            ingredientsHtml += `${ingredient},`;
        })

        menuContainer.innerHTML +=
        `
            <div class="menu-item">
                <div class="menu-item-emoji-container"> <p>${item.emoji}</p> </div>

                <div class="menu-item-details">
                    <p class="menu-item-title">${item.name}</p>
                    <p class="menu-item-ingredients">${ingredientsHtml}</p>
                </div>

                <div class="menu-item-actions">
                    <button class="add-to-menu-btn" data-item="${item.id}"> <i class="fa-solid fa-plus" aria-hidden="true"></i> </button>
                </div>

            </div>
        `
    })
};

renderMenu();

document.querySelectorAll('.add-to-menu-btn').forEach(e => {
    e.addEventListener('click', () => {
        console.log(menuArray[e.dataset.item]);
        orderArray.push(menuArray[e.dataset.item]);
        console.log(orderArray);
    });
});