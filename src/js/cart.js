import { renderHeaderFooter } from './utils.mjs';
import { getLocalStorage } from './utils.mjs';
import { removeProductFromCart } from './productDetails.mjs';
import { findProductById } from './productData.mjs';

renderHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  if(cartItems) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    const totalcost = total(cartItems);
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
    document.querySelector('.total').innerHTML = `<p class="total">Total: ${totalcost}</p>`;
    document.querySelector('.product-list').addEventListener('click',removeProductFromCart)

  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <button type="button" class="cart-trash" id="${item.Id}">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/></svg>
  </button>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

// function sum(t, currenItem) {
//   return t + currenItem.FinalPrice
// }

function total(items){
  var sum = 0.0;
  sum = items.reduce((t, currenItem)=>t + currenItem.FinalPrice,0)

  return sum;
}

renderCartContents();

