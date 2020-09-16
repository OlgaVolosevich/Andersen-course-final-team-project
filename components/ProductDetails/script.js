"use strict";

class ProductDetails {
  closeProductDetailsModalWindow() {
    document.getElementById("modalwindow").innerHTML = '';
  }
  
  openProductDetailsModalWindow(item) {
    const { title: TITLE, image: IMAGE, description: DESCRIPTION, price: PRICE } = item;
	const productDetailsModalWindow = `
	  <div class="product-modalwindow">
	    <div class="modal__close" onclick="productDetails.closeProductDetailsModalWindow()"></div>
	    <div class="product-details">
		  <h3 class="product-details__title">${TITLE}</h3>
		  <img class="product-details__img" src="${IMAGE}" alt="product-datails">
		  <p class="product-details__descr">${DESCRIPTION.substr(0,200)}...</p>
		  <p class="product-details__price">Price: ${PRICE.toLocaleString()}$</p> 
		  <button class="btn btn-success btn-product-details">add to cart</button>
		</div>
	  </div>
	`;
	document.getElementById("modalwindow").innerHTML = productDetailsModalWindow;
	const el = document.getElementsByClassName("btn-product-details")[0];
	el.addEventListener("click", ()=> cartShop.addToCart(item));
  }
}

const productDetails = new ProductDetails();
