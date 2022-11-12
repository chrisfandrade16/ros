import React from "react";
import "../App.css";
import CostCounter from "./CostCounter";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function MenuItem({ info, setTotalCost, clear }) {
  return (
    <div className="menu-item">
      <LazyLoadImage
        src={info.img}
        width={175}
        height={150}
        alt={info.name}
        style={{ alignSelf: "center" }}
        effect="blur"
      />
      <div className="item-desc" style={{ userSelect: "none" }}>
        <div>{info.name}</div>
        <div>{info.ingredients}</div>
        {info.size && <div>Size: {info.size}</div>}
      </div>
      <CostCounter
        name={info.name}
        cost={info.cost}
        setTotalCost={setTotalCost}
        clear={clear}
      />
    </div>
  );
}
