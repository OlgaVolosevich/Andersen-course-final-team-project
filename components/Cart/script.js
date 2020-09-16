"use strict";

class Cart {
  render() {
    const countOfProductInCart = LSService.getCartProducts().length;
	const addCartToHeader = `
	  <div class="cart-container">
	    <div class="cart-item" onclick="cartShop.openCartModalWindow()">
	      <img class="cart-item__img" src="components/Cart/cart.svg" alt="cart">
		  <p class="cart-item__amount">${countOfProductInCart}</p>
		</div>
	  </div>
	  <div id="modalwindow"></div>
	  `;
    document.getElementsByClassName("cart")[0].innerHTML = addCartToHeader;
  }
}