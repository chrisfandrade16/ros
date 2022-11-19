class ParseJSON {
  constructor() {
    this.categoryJSON = require(`../data/categories.json`);
    this.itemJSON = require(`../data/items.json`);
    this.cartItemJSON = require(`../data/cartItems.json`);
    this.orderJSON = require(`../data/orders.json`);
  }
  getFirstCategory() {
    return this.categoryJSON[0].name;
  }
  getCategoryNames() {
    let categories = [];
    for (const key of this.categoryJSON) {
      categories.push(key.name);
    }
    return categories;
  }
  getCategoryItems(name) {
    for (const key of this.categoryJSON) {
      if (key.name === name) return key.items;
    }
  }
  getCategoryPattern(name) {
    for (const key of this.categoryJSON) {
      if (key.name === name) {
        let objList = [];
        for (const item of key.items) {
          for (const k of this.itemJSON) {
            if (k.name === item)
              objList.push({
                name: item,
                ingredients: k.ingredients.join(" "),
              });
          }
        }
        return objList;
      }
    }
  }
  getOtherCategoryPattern(name) {
    let objListList = [];
    for (const key of this.categoryJSON) {
      if (key.name !== name) {
        objListList.push({
          category: key.name,
          pattern: this.getCategoryPattern(key.name),
        });
      }
    }
    return objListList;
  }
  getItemInfo(name) {
    for (const key of this.itemJSON) {
      if (key.name === name) return key;
    }
  }
  getItems() {
    let items = [];
    for (const key of this.itemJSON) {
      items.push(key);
    }
    return items;
  }
  getOrderInfo(order) {
    for (const key of this.orderJSON) {
      if (key.order === order) return key;
    }
  }
  getOrders() {
    let orders = [];
    for (const key of this.orderJSON) {
      orders.push(key);
    }
    return orders;
  }
  getOrderCategoryItems(name) {
    let search = [];
    if (name === "In Progress") {
      search = ["Preparing Food", "Delivering to Table"];
    } else {
      search = ["Completed"];
    }

    const orders = [];
    for (const key of this.orderJSON) {
      if (search.includes(key.status)) {
        orders.push(key.order);
      }
    }

    return orders;
  }
  getCost(name) {
    for (const key of this.itemJSON) {
      if (key.name === name) return key.cost;
    }
  }

  getCartItems(namesList) {
    let items = [];
    for (const key of this.cartItemJSON) {
      if (namesList.includes(key.name)) {
        items.push(key);
      }
    }
    return items;
  }
}

export default ParseJSON;
