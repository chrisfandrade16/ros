import React from "react";
import "../App.css";
import CostCounter from "./CostCounter";

export default function MenuItem({ info }) {
  return (
    <div className="menu-item">
      <img
        src={info.img}
        height="150"
        alt={info.name}
        style={{ userSelect: "none" }}
      />
      <div className="item-desc" style={{ userSelect: "none" }}>
        <div>{info.name}</div>
        <div>{info.ingredients}</div>
        {info.size && <div>Size: {info.size}</div>}
      </div>
      <CostCounter name={info.name} cost={info.cost} />
    </div>
  );
}
