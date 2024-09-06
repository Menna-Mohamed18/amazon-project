import {removeFromCart,calculateCartQuantity,cart} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrecny } from './utils/money.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

let cartSummaryHTML = '';
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingItem;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingItem = product;
    }
  });
  const deliveryOptionId=cartItem.deliveryOptionId;
  let deliveryOption;
  deliveryOptions.forEach((option)=>{
    if(option.id===deliveryOptionId){
      deliveryOption=option;
    }
  });
  const today = dayjs();
  const deliveryDate = today.add(
    deliveryOption.deliveryDays,
     'days');
  const dateString = deliveryDate.format(
    'dddd, MMMM D')
    ;
   
  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingItem.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-price">
            $${formatCurrecny(matchingItem.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">
                ${cartItem.quantity}
              </span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete" data-product-id=${matchingItem.id}>
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingItem)}
        </div>
      </div>
    </div>
  `;

  function deliveryOptionsHTML(matchingItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrecny(deliveryOption.priceCents)} - `;
      const isChecked = deliveryOption.id===cartItem.deliveryOptionId;
  
      html += `
        <div class="delivery-option">
          <input type="radio" 
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `;
    });
    return html;
  }
  
});

document.querySelector('.js-orders').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete').forEach((link) => {
  link.addEventListener(('click'), () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
  });
});

const cartQuantity = calculateCartQuantity();
document.querySelector('.js-return-to-home-link')
  .innerHTML = `${cartQuantity} items`;
