"use strict"

class ProductsData {
  _apiBase = "https://fakestoreapi.com/";

  async getData(url) {
    const response = await fetch(`${this._apiBase}${url}`);
    if (response.status !== 200) {
      throw new Error(
        `Couldn't fetch data from url: ${this._apiBase}; Status of response is ${response.status}`
      );
    }
    return await response.json();
  }

  async getAllProducts() {
    const URL = "products";
    return this.getData(URL);
  }
  
  async getProductById(id) {
    const URL = `products/${id}`;
    return this.getData(URL);
  }
}

const apiService = new ProductsData();


