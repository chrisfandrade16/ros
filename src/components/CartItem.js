import React, { useEffect, useState } from "react";
import "../styles/Menu.scss";
import Button from "./Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyMotion, domAnimation, m } from "framer-motion";
import delete_trash from "images/image_delete_trash.png";
import CostCounter from "./CostCounter";

export default function CartItem({
  info,
  setTotalCost,
  setTotalItems,
  removeItem,
}) {
  const [quantity, setQuantity] = useState(
    parseFloat(sessionStorage.getItem(info.name))
  );

  useEffect(() => {
    sessionStorage.setItem(info.name, quantity);
  }, [quantity, info.name]);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="cartItem"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="tw-self-center">
          <Button
            color="red"
            content={
              <img
                className="tw-w-[14px] tw-h-[14px] tw-brightness-0 tw-invert"
                src={delete_trash}
                alt="delete item"
              />
            }
            onClick={() => removeItem(info.name, quantity, info.cost)}
            className="tw-mr-[30px]"
          />
        </div>
        <LazyLoadImage
          src={info.img}
          width={125}
          alt={info.name}
          style={{ alignSelf: "center", marginRight: "30px" }}
          placeholderSrc={info.low}
          effect="blur"
        />
        <div className="cartItemDesc" style={{ userSelect: "none" }}>
          <div>
            <span style={{ color: "#B5838D" }}>Name: </span>
            {info.name}
          </div>
          {info.size ?
            <div>
              <span style={{ color: "#B5838D" }}>Size: </span>
              {info.size}
            </div>
          : null}
        </div>

        <CostCounter
          name={info.name}
          cost={info.cost}
          setQuantity={setQuantity}
          setTotalCost={setTotalCost}
          setTotalItems={setTotalItems}
          removeItem={removeItem}
          clear={false}
        />
        <div className="basketLeft tw-ml-auto tw-mr-[50px]">
          <div>${(info.cost * quantity).toFixed(2)}</div>
        </div>
      </m.div>
    </LazyMotion>
  );
}
