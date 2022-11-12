class ParseJSON {
  constructor() {
    this.categoryJSON = require(`../data/categories.json`);
    this.itemJSON = require(`../data/items.json`);
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
  getCost(name) {
    for (const key of this.itemJSON) {
      if (key.name === name) return key.cost;
    }
  }
}

export default ParseJSON;
