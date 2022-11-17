import React, { useState, useEffect } from "react";
import "../styles/Menu.scss";
import OrderItem from "./OrderItem";
import { Scrollbars } from "react-custom-scrollbars-2";

export default function Staff({ data, setData }) {
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
            data={data}
            setData={setData}
          />
        ))}
      </Scrollbars>
    </div>
  );
}
