import React, { useEffect, useState } from "react";
import "../styles/Menu.scss";
import Button from "./Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyMotion, domAnimation, m } from "framer-motion";
import delete_trash from "images/image_delete_trash.png";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

export default function CartItem({ info, setTotalCost, removeItem }) {
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
                className="tw-w-[24px] tw-h-[24px] tw-brightness-0 tw-invert"
                src={delete_trash}
                alt="delete item"
              />
            }
            onClick={() => removeItem(info.name, quantity, info.cost)}
          />
        </div>

        <LazyLoadImage
          src={info.img}
          width={150}
          alt={info.name}
          style={{ alignSelf: "center" }}
          placeholderSrc={info.low}
          effect="blur"
        />
        <div className="cartItemDesc" style={{ userSelect: "none" }}>
          <div>{info.name}</div>
          {info.size && <div>Size: {info.size}</div>}
        </div>

        <div className="basketMiddle">
          <div className="cartItemCost">${info.cost}</div>
          <div className="cartItemCount">
            <Button
              height="8"
              width="8"
              color="red"
              disabled={quantity === 0}
              content={<MinusIcon w={3} h={3} />}
              onClick={() => {
                if (quantity === 1) removeItem(info.name, quantity, info.cost);
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                  setTotalCost(
                    (prevTotal) =>
                      Math.round((prevTotal - info.cost) * 100) / 100
                  );
                  sessionStorage.setItem(
                    "totalItems",
                    parseInt(sessionStorage.getItem("totalItems")) - 1
                  );
                }
              }}
            />
            <div className="tw-rounded tw-border-[2px] tw-border-solid tw-border-[#CBD5E1] tw-w-[30px] tw-h-[28px] tw-content-center tw-flex tw-justify-center">
              <p>{quantity}</p>
            </div>
            <Button
              width="8"
              color="green"
              content={<AddIcon w={3} h={3} />}
              onClick={() => {
                setQuantity(quantity + 1);
                setTotalCost(
                  (prevTotal) => Math.round((prevTotal + info.cost) * 100) / 100
                );
                sessionStorage.setItem(
                  "totalItems",
                  parseInt(sessionStorage.getItem("totalItems")) - 1
                );
              }}
            />
          </div>
        </div>
        <div className="basketLeft">
          <div>${(info.cost * quantity).toFixed(2)}</div>
        </div>
      </m.div>
    </LazyMotion>
  );
}
