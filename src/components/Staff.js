import React, { useState } from "react";
import "../styles/Menu.scss";
import OrderItem from "./OrderItem";
import { Scrollbars } from "react-custom-scrollbars-2";
import Navigator from "./Navigatior";

export default function Staff({ data, setData }) {
  const [activeCategory, setActiveCategory] = useState("In Progress");

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
      <Navigator
        tabs={["In Progress", "Completed"].map((category) => {
          return {
            text: category,
            onClick: () => {
              setActiveCategory(category);
              const scroll = document
                .getElementById("menu-item-container")
                .getElementsByTagName("div")[0];
              scroll.scrollTop = 0;
            },
          };
        })}
        activeTab={activeCategory}
        activePointerTab={true}
        useTextAsId={true}
      />

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
