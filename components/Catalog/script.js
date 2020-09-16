"use strict";

class Catalog {
  _root = document.getElementsByClassName("catalog")[0];

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
    return LSService.setCartProducts(products);
  }

  showDelails(item) {
    return item;
  }

  cleanCatalog() {
    return (this._root.innerHTML = "");
  }

  showWarning() {
    const WARNING = `
      <p class="warning heading"> 
        Sorry, nothing found :(
      </p>
      `;
    return (this._root.innerHTML = WARNING);
  }

  render(products) {
    this.cleanCatalog();
    if (!products) {
      return this.showWarning();
    }
    return products.forEach((item) => {
      const itemWrapper = document.createElement("div");
      itemWrapper.classList.add("catalog-item");

      const itemBtnWrapper = document.createElement("div");
      itemBtnWrapper.classList.add("catalog-item__btn-wrapper");

      const addToCartBtn = document.createElement("button");
      addToCartBtn.innerText = "add to cart";
      addToCartBtn.classList.add("btn");
      addToCartBtn.classList.add("btn-success");
      addToCartBtn.classList.add("addToCartBtn");
      addToCartBtn.addEventListener("click", () => this.addToCart(item));

      const detailsBtn = document.createElement("button");
      detailsBtn.innerText = "details";
      detailsBtn.classList.add("btn");
      detailsBtn.classList.add("btn-info");
      detailsBtn.classList.add("detailsBtn");
      detailsBtn.addEventListener("click", () => this.showDelails(item));

      const { image: IMAGE, title: TITLE, price: PRICE } = item;
      const ITEM_INNER_HTML = `
                <p class="catalog-item__title">${TITLE}</p>
                <img class="catalog-item__img" src="${IMAGE}" alt="${TITLE}">
                <p class="catalog-item__price">Price: ${PRICE}$</p>`;
      itemBtnWrapper.append(detailsBtn);
      itemBtnWrapper.append(addToCartBtn);
      itemWrapper.innerHTML += ITEM_INNER_HTML;
      itemWrapper.append(itemBtnWrapper);
      this._root.append(itemWrapper);
    });
  }
}

const catalogPage = new Catalog();
