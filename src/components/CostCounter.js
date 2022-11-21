import React, { useState, useEffect } from "react";
import Input from "components/Input";
import Button from "components/Button";
import "../styles/Menu.scss";
import { Tooltip, useToast } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

export default function CostCounter({
  name,
  cost,
  setQuantity = () => {},
  setTotalCost,
  setTotalItems,
  removeItem = null,
  clear,
  hideCost,
  showToast = false,
}) {
  const toast = useToast();

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
                if (removeItem) if (count === 1) removeItem(name, count, cost);
                if (count > (removeItem ? 1 : 0)) {
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
          centerText={true}
          value={count}
          onChange={(newValue) => {
            newValue =
              newValue.length > 2 ? newValue.substring(0, 2) : newValue;
            if (newValue.length === 0 || newValue === "0") {
              newValue = 0;
              if (showToast)
                toast({
                  title: `${name} removed`,
                  status: "info",
                  isClosable: true,
                });
            }
            const regex = new RegExp("^[0-9]+$");
            if (!regex.test(newValue) && newValue !== "") {
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
            setCount(parseInt(newValue));
          }}
          onBlur={() => {
            if (count === "") {
              setCount(0);
            }
          }}
          className="tw-w-[40px]"
          type="number"
        />
        <Tooltip
          hasArrow
          isDisabled={count === 99}
          label={`"CRTL" click to add ${count > 94 ? 99 - count : 5}`}
        >
          <span>
            <Button
              content={<AddIcon w={3} h={3} />}
              height="8"
              color="green"
              disabled={count === 99}
              onClick={(e) => {
                let multi = e.ctrlKey ? (count > 94 ? 99 - count : 5) : 1;
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
