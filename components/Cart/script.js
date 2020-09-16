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

  makeCartProduct(item) {
    const { description, category, ...cartProduct } = item;
    cartProduct.amount = 1;
    return cartProduct;
  }

  addToCart(item) {
    const cartProduct = this.makeCartProduct(item);
    let hasSameItem = false;
    const products = LSService.getCartProducts().map((el) => {
    if (el.id === item.id) {
      el.amount++;
      hasSameItem = true;
    }
      return el;
    });
    if (!hasSameItem) {
      products.push(cartProduct);
    }
    LSService.setCartProducts(products);
    cartShop.render();
  }

  closeCartModalWindow() {
    document.getElementById("modalwindow").innerHTML = '';
  }
}