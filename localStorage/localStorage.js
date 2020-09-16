"use strict";

class LSClient {
  keyCheck(key) {
    return localStorage.getItem(key) !== null;
  }

  getData(key) {
    if (this.keyCheck(key)) {
      return localStorage.getItem(key);
    } else {
      throw new Error("There is no such key in the localStorage");
    }
  }

  setData(key, data) {
    return localStorage.setItem(key, JSON.stringify(data));
  }

  deleteData(key) {
    return localStorage.removeItem(key);
  }

  deleteDataOnId(productId) {
    const productsFromLS = JSON.parse(localStorage.getItem("cart"));
    const filteredArrProducts = productsFromLS.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(filteredArrProducts));
  }

  getCartProducts() {
    if (!this.keyCheck("cart")) {
      this.setData("cart", []);
    }
    return JSON.parse(this.getData("cart"));
  }

  setCartProducts(products) {
    return this.setData("cart", products);
  }
}

const LSService = new LSClient();
