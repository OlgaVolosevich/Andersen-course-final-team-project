"use strict";

window.onload = function () {
  const roots = {
    catalog: document.getElementsByClassName("catalog")[0],
    logo: document.getElementsByClassName("navbar_logo")[0],
    searchBar: document.getElementsByClassName("search-bar__input")[0],
    cleanSearchBarIcon: document.getElementsByClassName(
      "search-bar__icon-close"
    )[0],
    categories: {
      allCategory: document.getElementById("all"),
      womenCategory: document.getElementById("women clothing"),
      menCategory: document.getElementById("men clothing"),
      electCategory: document.getElementById("electronics"),
      jewelryCategory: document.getElementById("jewelery"),
    },
  };
  catalogPage.showPreloader();
  let dataManager;
  apiService.getAllProducts().then((items) => {
    catalogPage.render(items);
    dataManager = new DataWork(items);
  });

  class DataWork {
    constructor(items) {
      this._products = [...items];
      this._filteredProducts = [...items];
    }
    filterByCategoty(category = undefined) {
      this.cleanSearchBar();
      if (category === "all" || !category) {
        this._filteredProducts = this._products;
        return catalogPage.render(this._filteredProducts);
      } else {
        this._filteredProducts = this._products.filter(
          (el) => el.category === category
        );
        return catalogPage.render(this._filteredProducts);
      }
    }

    filterByTitle(event) {
      const searchedProducts = this._filteredProducts.filter((el) =>
        el.title.toUpperCase().includes(event.target.value.toUpperCase())
      );
      if (!searchedProducts.length) {
        return catalogPage.showWarning();
      }
      return catalogPage.render(searchedProducts);
    }

    cleanSearchBar() {
      return (roots.searchBar.value = "");
    }
  }

  for (let item in roots.categories) {
    const category = roots.categories[item].getAttribute("id");
    roots.categories[item].addEventListener("click", () =>
      dataManager.filterByCategoty(category)
    );
  }

  roots.logo.addEventListener("click", () => dataManager.filterByCategoty());
  roots.cleanSearchBarIcon.addEventListener("click", () => {
    dataManager.cleanSearchBar();
    dataManager.filterByCategoty();
  });

  roots.searchBar.addEventListener("input", (event) =>
    dataManager.filterByTitle(event)
  );
};
