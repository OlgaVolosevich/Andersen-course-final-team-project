"use strict";

window.onload = function () {
  let products = [];
  apiService.getAllProducts().then((items) => {
    catalogPage.render(items);
    products = [...items];
  });

  const roots = {
    logo: document.getElementsByClassName("navbar_logo")[0],
    catalog: document.getElementsByClassName("catalog")[0],
    categoties: {
      allCategory: document.getElementById("all"),
      womenCategory: document.getElementById("women clothing"),
      menCategory: document.getElementById("men clothing"),
      electCategory: document.getElementById("electronics"),
      jewelryCategory: document.getElementById("jewelery"),
    },
  };

  class DataWork {
    filterByCategoty(category) {
      roots.catalog.innerHTML = "";
      if (category === "all") {
        catalogPage.render(products);
      } else {
        const newProducts = products.filter((el) => el.category === category);
        catalogPage.render(newProducts);
      }
    }
  }
  const dataManager = new DataWork();

  for (let item in roots.categoties) {
    const category = roots.categoties[item].getAttribute("id");
    roots.categoties[item].addEventListener("click", () =>
      dataManager.filterByCategoty(category)
    );
    roots.logo.addEventListener("click", () => {
      roots.catalog.innerHTML = "";
      catalogPage.render(products);
    });
  }
};
