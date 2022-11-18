import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import ParseJSON from "utils/ParseJSON";
import { storage } from "utils/storage";

const currentRestaurant = storage.restaurants[storage.currentRestaurant];

const data = new ParseJSON();
data.getCategoryNames().forEach((category) => {
  currentRestaurant.restaurantMenu[category] = [];
  data.getCategoryItems(category).forEach((item) => {
    const info = data.getItemInfo(item);
    currentRestaurant.restaurantMenu[category].push({
      name: info.name,
      description: info.ingredients.join(", "),
      cost: info.cost,
      img: info.img,
    });
  });
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
