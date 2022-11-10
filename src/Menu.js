import React, { useState, useEffect } from "react";
import "./App.css";
import MenuItem from "./components/MenuItem";
import ParseJSON from "./ParseJSON";
export const data = new ParseJSON();

export default function Menu() {
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
            onClick={() => setActiveCategory(name)}
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
        <button style={{ height: "6vh", margin: "0.5%" }}>
          Checkout - ${totalCost.toFixed(2)}
        </button>
      </div>
    </div>
  );
}
