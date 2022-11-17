import React, { useState, useEffect } from "react";
import "../styles/Menu.scss";
import MenuItem from "./MenuItem";
import * as constants from "../utils/constants";
import { Scrollbars } from "react-custom-scrollbars-2";
import Button from "components/Button";
import Navigator from "./Navigatior";
import { storage } from "utils/storage";

export default function Menu({ data, setCurrentPageTab }) {
  const [currentCategoryTab, setCurrentCategoryTab] = useState(
    Object.keys(storage.restaurantMenu)[0]
  );
  const [totalCost, setTotalCost] = useState(
    parseFloat(sessionStorage.getItem("totalCost")) || 0
  );
  const [clear, setClear] = useState(false);

  const [totalItems, setTotalItems] = useState(
    parseInt(sessionStorage.getItem("totalItems")) || 0
  );

  useEffect(() => {
    sessionStorage.setItem("totalCost", totalCost);
  }, [totalCost]);

  useEffect(() => {
    sessionStorage.setItem("totalItems", totalItems);
  }, [totalItems]);

  useEffect(() => {
    if (clear) {
      sessionStorage.clear();
      setTotalCost(0);
      setTotalItems(0);
      setClear(false);
    }
  }, [clear]);

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
        tabs={Object.keys(storage.restaurantMenu).map((category) => {
          return {
            text: category,
            onClick: () => {
              setCurrentCategoryTab(category);
              const scroll = document
                .getElementById("menu-item-container")
                .getElementsByTagName("div")[0];
              scroll.scrollTop = 0;
            },
          };
        })}
        activeTab={currentCategoryTab}
        activePointerTab={true}
        useTextAsId={true}
      />
      <Scrollbars id="menu-item-container" renderThumbVertical={renderThumb}>
        {data.getCategoryItems(currentCategoryTab).map((name) => (
          <MenuItem
            key={name}
            info={data.getItemInfo(name)}
            setTotalCost={setTotalCost}
            setTotalItems={setTotalItems}
            clear={clear}
          />
        ))}
      </Scrollbars>
      <div id="menu-footer">
        <Button
          color="red"
          content="Clear Selections"
          disabled={totalItems === 0}
          onClick={() => setClear(true)}
        />
        <Button
          color="green"
          content="Go to Cart"
          onClick={() => setCurrentPageTab(constants.PAGE_TABS.CART)}
          disabled={totalCost === 0}
        />
      </div>
    </div>
  );
}
