import React from "react";
import "../styles/Menu.scss";
import CostCounter from "./CostCounter";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function MenuItem({ info, setTotalCost, setTotalItems, clear }) {
  return (
    <div className="menu-item">
      <LazyLoadImage
        src={info.img}
        width={150}
        alt={info.name}
        style={{ alignSelf: "center" }}
        placeholderSrc={info.low}
        effect="blur"
      />
      <div className="item-desc" style={{ userSelect: "none" }}>
        <div>Name: {info.name}</div>
        <div>Ingredients: {info.ingredients.join(", ")}</div>
        {info.size && <div>Size: {info.size}</div>}
      </div>
      <CostCounter
        name={info.name}
        cost={info.cost}
        setTotalCost={setTotalCost}
        setTotalItems={setTotalItems}
        clear={clear}
      />
    </div>
  );
}
