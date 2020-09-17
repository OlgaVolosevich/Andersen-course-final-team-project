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

  pressBtnMinus(amountProd, idProd) {
    if (amountProd === 1) {
	  this.delProductFromCart(idProd);
	} else {
	  const products = LSService.getCartProducts().map((el) => {
      if (el.id === idProd) {
        el.amount--;
      }
        return el;
	  });
	  LSService.setCartProducts(products);
	  this.render(products.length);
	  this.openCartModalWindow();
    }
  }

  pressBtnPlus(idProd) {
    const products = LSService.getCartProducts().map((el) => {
    if (el.id === idProd) {
          el.amount++;
    }
      return el;
    });
    LSService.setCartProducts(products);
    this.openCartModalWindow();
  }

  delProductFromCart(id) {
    LSService.deleteDataOnId(id);
    const products = LSService.getCartProducts();
    this.render(products.length);
    this.openCartModalWindow();
  }

  openCartModalWindow() {
    const productsFotCart = LSService.getCartProducts();
    let htmlCart = '';
    let sumCart = 0;
    let cartMessage = 'Cart is empty';
			
    productsFotCart.forEach(({ id, title, price, image, amount }) => {
	  let totalCart = price * amount;
      htmlCart += `
        <div class="cart-table-row">
          <div class="cart-table-cell">
            <img class="cart-table-cell__img" src="${image}" alt="cart-img">
          </div>
          <div class="cart-table-cell">
            <p>${title}</p>
          </div>
          <div class="cart-table-cell">
            <p>${price.toLocaleString()}$</p>
          </div>
          <div class="cart-table-cell cart-table-cell__amount">
            <button class="btn cart-btn-minus"  onclick="cartShop.pressBtnMinus(${amount}, ${id})">-</button>
            <p class="cart-table-cell__count">${amount}</p>
            <button class="btn cart-btn-plus" onclick="cartShop.pressBtnPlus(${id})">+</button>
          </div>
          <div class="cart-table-cell">
            <p class="cart-item-price">${totalCart.toLocaleString()}$</p>
		    <button class="btn cart-btn-delete" onclick="cartShop.delProductFromCart(${id})">&times;</button>
          </div>
        </div> 
        `;
				
      sumCart += totalCart;
    });
				
    const cartModalWindow = `
      <div class="cart-modalwindow">
	    <div class="modal__close" onclick="cartShop.closeCartModalWindow()"></div>
          <div class="cart-table">
            <div class="cart-table-row">
              <div class="cart-table-cell__title">
                <div class="cart-table-cell__item">goods</div>
              </div>
              <div class="cart-table-cell__title">
                <div class="cart-table-cell__item">title</div>
              </div>
              <div class="cart-table-cell__title">
                <div class="cart-table-cell__item">price</div>
              </div>
              <div class="cart-table-cell__title">
                <div class="cart-table-cell__item">amount</div>
              </div>
              <div class="cart-table-cell__title">
                <div class="cart-table-cell__item">total</div>
              </div>
            </div>
               
			${htmlCart}
				
           
		    <div class="cart-table-row btn-buy-container">
		    <div class="cart-table-row sum-container">
              <div class="cart-table-cell__title cart-table-cell__sum">
                <div class="item">sum: ${sumCart.toLocaleString()}$</div>
              </div>
            </div>
		      <button class="btn btn-success addToCartBtn btn-buy">buy</button>
			</div>
          </div>
		    <p class="cart-table-message">${cartMessage}</p>
        </div>
	  `;
		
	  document.getElementById("modalwindow").innerHTML = cartModalWindow;
	  if (productsFotCart.length === 0) {
	    document.getElementsByClassName("cart-table")[0].classList.add('cartMessage-display');
	  } else {
	    document.getElementsByClassName("cart-table-message")[0].classList.add('cartMessage-display');
	  }
  }
}

const cartShop = new Cart();
cartShop.render();
