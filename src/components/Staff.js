import React, { useState } from "react";
import "../styles/Menu.scss";
import OrderItem from "./OrderItem";
import { Scrollbars } from "react-custom-scrollbars-2";
import Navigator from "./Navigatior";
import ParseJSON from "../utils/ParseJSON";
import emptyOrder from "images/emptyOrder.png";

export default function Staff({ data }) {
  const [orderJSON, setOrderJSON] = useState(new ParseJSON().orderJSON);

  const getOrderInfo = function (order) {
    for (const key of orderJSON) {
      if (key.order === order) return key;
    }
  }

  const updateOrderJSON = function (orderInfo) {
    const jsonString = JSON.stringify(orderJSON)
    let newOrderJSON = JSON.parse(jsonString);
    const index = newOrderJSON.findIndex(
      (order) => order.order === orderInfo.order
    );

    if (orderInfo.status === null) {
      if (index > -1) {
        newOrderJSON.splice(index, 1);
      }
    } else {
      newOrderJSON[index] = orderInfo;
    }

    setOrderJSON(newOrderJSON);
  }

  const getOrderCategoryItems = function (name) {
    let search = [];
    if (name === "In Progress") {
      search = ["Cooking", "Serving"];
    } else {
      search = ["Completed"];
    }

    const orders = [];
    for (const key of orderJSON) {
      if (search.includes(key.status)) {
        orders.push(key.order);
      }
    }

    return orders;
  }

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


      {getOrderCategoryItems(activeCategory).length === 0 ? (
        <div>
          <div>
            <img className="orderEmpty" src={emptyOrder} alt="Order empty" />
          </div>
          <h1 style={{fontSize: "2em"}}>Waiting for Orders...</h1>
        </div>
      ) :
        <Scrollbars id="menu-item-container" renderThumbVertical={renderThumb}>
          {getOrderCategoryItems(activeCategory).map((order) => (
            <OrderItem
              key={order}
              orderInfo={getOrderInfo(order)}
              updateOrderJSON={updateOrderJSON}
              data={data}
            />
          ))}
        </Scrollbars>
      }
    </div>
  );
}
