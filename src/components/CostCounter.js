import React, { useState, useEffect } from "react";
import Input from "components/Input";
import Button from "components/Button";
import "../styles/Menu.scss";
import { Tooltip } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

export default function CostCounter({
  name,
  cost,
  setQuantity = () => {},
  setTotalCost,
  setTotalItems,
  clear,
  hideCost,
}) {
  const [count, setTheCount] = useState(
    parseInt(sessionStorage.getItem(name)) || 0
  );

  const setCount = (val) => {
    setQuantity(val);
    setTheCount(val);
  };

  useEffect(() => {
    sessionStorage.setItem(name, count);
  }, [name, count]);

  useEffect(() => {
    if (clear) setCount(0);
  }, [clear]);

  return (
    <div className="cost-counter tw-flex tw-flex-col tw-items-center tw-justify-evenly tw-select-none">
      {!hideCost ? <p>${cost}</p> : null}
      <div className="tw-flex tw-flex-row tw-gap-[12px] tw-items-center">
        <Tooltip
          hasArrow
          isDisabled={count === 0}
          label={`"CRTL" click to remove ${count < 5 ? count : "5"}`}
          aria-label="A tooltip"
        >
          <span>
            <Button
              content={<MinusIcon w={3} h={3} />}
              height="8"
              color="red"
              disabled={count === 0}
              onClick={(e) => {
                if (count > 0) {
                  let multi = e.ctrlKey ? (count < 5 ? count : 5) : 1;
                  setCount(count - 1 * multi);
                  setTotalCost(
                    (prevTotal) =>
                      Math.round((prevTotal - cost * multi) * 100) / 100
                  );
                  setTotalItems((prevTotal) => prevTotal - 1 * multi);
                }
              }}
            />
          </span>
        </Tooltip>
        <Input
          value={count}
          onChange={(newValue) => {
            const regex = new RegExp("^[0-9]+$");
            if (!regex.test(newValue) && newValue != "") {
              return;
            }
            const newCount = newValue !== "" ? parseInt(newValue) : 0;
            setTotalCost((prevTotal) => {
              const newTotal = prevTotal - count * cost + newCount * cost;
              return newTotal;
            });
            setTotalItems((prevTotal) => {
              const newTotal = prevTotal - count + newCount;
              return newTotal;
            });
            setCount(newValue);
          }}
          onBlur={() => {
            if (count === "") {
              setCount(0);
            }
          }}
          className="tw-w-[40px]"
          type="text"
        />
        <Tooltip hasArrow label={`"CRTL" click to add 5`}>
          <span>
            <Button
              content={<AddIcon w={3} h={3} />}
              height="8"
              color="green"
              onClick={(e) => {
                let multi = e.ctrlKey ? 5 : 1;
                setCount(count + 1 * multi);
                setTotalCost(
                  (prevTotal) =>
                    Math.round((prevTotal + cost * multi) * 100) / 100
                );
                setTotalItems((prevTotal) => prevTotal + 1 * multi);
              }}
            />
          </span>
        </Tooltip>
      </div>
    </div>
  );
}
