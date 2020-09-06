"use strict";

window.onload = function () {
  class Catalog {
    _root = document.getElementsByClassName("catalog")[0];

    addToCart(item) {
      return item;
    }

    async getProducts() {
      return apiService.getAllProducts();
    }

    async render() {
      const products = await this.getProducts();
      products.forEach((item) => {
        const itemWrapper = document.createElement("div");
        itemWrapper.classList.add("catalog-item");

        const addToCartBtn = document.createElement("button");
        addToCartBtn.innerText = "add to cart";
        addToCartBtn.classList.add("btn");
        addToCartBtn.classList.add("btn-success");
        addToCartBtn.addEventListener("click", () => this.addToCart(item));

        const { image: IMAGE, title: TITLE, price: PRICE } = item;
        const ITEM_INNER_HTML = `
                <img class="catalog-item__img" src="${IMAGE}" alt="${TITLE}">
                <p class="catalog-item__title">${TITLE}</p>
                <p class="catalog-item__price">Price: ${PRICE}</p>`;
        itemWrapper.innerHTML += ITEM_INNER_HTML;
        itemWrapper.append(addToCartBtn);
        this._root.append(itemWrapper);
      });
    }
  }

  const catalogPage = new Catalog();
  catalogPage.render();
};
