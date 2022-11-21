import React, { useEffect, useState } from "react";
import "../styles/Menu.scss";
import CostCounter from "./CostCounter";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function MenuItem({
  info,
  setTotalCost,
  totalItems,
  setTotalItems,
  clear,
}) {
  const [count, setCount] = useState(
    parseInt(sessionStorage.getItem(info.name))
  );

  useEffect(() => {
    setCount(parseInt(sessionStorage.getItem(info.name)));
  }, [totalItems, info.name]);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="menu-item tw-border-[2px] tw-border-solid"
        style={{ borderColor: `${count > 0 ? "#FFB4A2" : "#73454E"}` }}
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
          {info.ingredients.length > 0 && (
            <div className="tw-flex tw-justify-center">
              <p style={{ color: "#B5838D" }}>Ingredients:&nbsp;</p>
              <p>{info.ingredients.join(", ")}</p>
            </div>
          )}
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
