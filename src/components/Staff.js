import React, { useState, useEffect } from "react";
import "../styles/Menu.scss";
import OrderItem from "./OrderItem";
import ParseJSON from "../utils/ParseJSON";
import { Scrollbars } from "react-custom-scrollbars-2";
export const data = new ParseJSON();

export default function Staff() {
  const [data] = useState(new ParseJSON());
  const [activeCategory, setActiveCategory] = useState(data.getFirstOrderCategory());

  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: `grey`,
    };
    return (
      <div className="bar" style={{ ...style, ...thumbStyle }} {...props} />
    );
  };

  return (
    <div id="menu-container">
      <div id="menu-categories">
        {data.getOrderCategoryNames().map((name) => (
          <div
            key={name}
            className="menu-category"
            active={name === activeCategory ? "true" : "false"}
            onClick={() => {
              setActiveCategory(name);
              const scroll = document
                .getElementById("menu-item-container")
                .getElementsByTagName("div")[0];
              scroll.scrollTop = 0;
            }}
          >
            <div>{name}</div>
          </div>
        ))}
      </div>

      <Scrollbars id="menu-item-container" renderThumbVertical={renderThumb}>
        {data.getOrderCategoryItems(activeCategory).map((order) => (
          <OrderItem
            key={order}
            info={data.getOrderInfo(order)}
          />
        ))}
      </Scrollbars>
    </div>
  );
}
