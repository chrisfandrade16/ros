import React, { useState } from "react";
import "./App.css";
import MenuItem from "./components/MenuItem";
import ParseJSON from "./ParseJSON";
export const data = new ParseJSON();

export default function Menu() {
  const [data] = useState(new ParseJSON());
  const [activeCategory, setActiveCategory] = useState(data.getFirstCategory());

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
          <MenuItem key={name} info={data.getItemInfo(name)} />
        ))}
      </div>
      <div id="menu-footer">
        <div style={{ height: "8vh", userSelect: "none" }}>
          check me out and clear all selected
        </div>
      </div>
    </div>
  );
}
