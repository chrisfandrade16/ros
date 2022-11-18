import React from "react";
import "../styles/Menu.scss";
import CostCounter from "./CostCounter";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function MenuItem({ info, setTotalCost, setTotalItems, clear }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="menu-item"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <LazyLoadImage
          src={info.img}
          width={150}
          alt={info.name}
          style={{ alignSelf: "center" }}
          placeholderSrc={info.low}
          effect="blur"
        />
        <div className="item-desc">
          <div className="tw-flex tw-justify-center">
            <p style={{ color: "#B5838D" }}>Name:</p>
            <p>&nbsp;{info.name}</p>
          </div>
          <div className="tw-flex tw-justify-center">
            <p style={{ color: "#B5838D" }}>Ingredients:&nbsp;</p>
            <p>{info.ingredients.join(", ")}</p>
          </div>
          {info.size && (
            <div className="tw-flex tw-justify-center">
              <p style={{ color: "#B5838D" }}>Size:&nbsp;</p>
              <p>{info.size}</p>
            </div>
          )}
        </div>
        <CostCounter
          name={info.name}
          cost={info.cost}
          setTotalCost={setTotalCost}
          setTotalItems={setTotalItems}
          clear={clear}
        />
      </m.div>
    </LazyMotion>
  );
}
