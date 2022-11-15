import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import ParseJSON from "utils/ParseJSON";
import { storage } from "utils/storage";

const data = new ParseJSON();
data.getCategoryNames().forEach((category) => {
  storage.restaurantMenu[category] = [];
  data.getCategoryItems(category).forEach((item) => {
    const info = data.getItemInfo(item);
    storage.restaurantMenu[category].push({
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
