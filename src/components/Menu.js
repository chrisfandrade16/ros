import React, { useState, useEffect } from "react";
import "../styles/Menu.scss";
import MenuItem from "./MenuItem";
import ParseJSON from "../utils/ParseJSON";
import * as constants from "../utils/constants";
export const data = new ParseJSON();

export default function Menu({ setCurrentPageTab }) {
  const [data] = useState(new ParseJSON());
  const [activeCategory, setActiveCategory] = useState(data.getFirstCategory());
  const [totalCost, setTotalCost] = useState(
    parseFloat(sessionStorage.getItem("total")) || 0
  );
  const [clear, setClear] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("total", totalCost);
  }, [totalCost]);

  useEffect(() => {
    if (clear) {
      sessionStorage.clear();
      setTotalCost(0);
      setClear(false);
    }
  }, [clear]);

  return (
    <div id="menu-container">
      <div id="menu-categories">
        {data.getCategoryNames().map((name) => (
          <div
            key={name}
            className="menu-category"
            active={name === activeCategory ? "true" : "false"}
            onClick={() => {
              setActiveCategory(name);
              const scroll = document.getElementById("menu-item-container");
              scroll.scrollTop = 0;
            }}
          >
            <div>{name}</div>
          </div>
        ))}
      </div>
      <div id="menu-item-container">
        {data.getCategoryItems(activeCategory).map((name) => (
          <MenuItem
            key={name}
            info={data.getItemInfo(name)}
            setTotalCost={setTotalCost}
            clear={clear}
          />
        ))}
      </div>
      <div id="menu-footer">
        <button onClick={() => setClear(true)}>Clear</button>
        <button onClick={() => setCurrentPageTab(constants.PAGE_TABS.CART)}>
          Checkout - ${totalCost.toFixed(2)}
        </button>
      </div>
    </div>
  );
}
