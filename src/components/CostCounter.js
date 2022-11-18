import React, { useState, useEffect } from "react";
import Button from "components/Button";
import "../styles/Menu.scss";
import { Tooltip } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

export default function CostCounter({
  name,
  cost,
  setTotalCost,
  setTotalItems,
  clear,
}) {
  const [count, setCount] = useState(
    parseInt(sessionStorage.getItem(name)) || 0
  );

  useEffect(() => {
    sessionStorage.setItem(name, count);
  }, [name, count]);

  useEffect(() => {
    if (clear) setCount(0);
  }, [clear]);

  return (
    <div
      className="cost-counter tw-flex tw-flex-col tw-items-center tw-justify-evenly"
      style={{ userSelect: "none" }}
    >
      <p>${cost}</p>
      <div className="tw-flex tw-flex-row tw-gap-[12px] tw-items-center">
        <Tooltip
          hasArrow
          isDisabled={count === 0}
          label={`"crtl" click to remove ${count < 5 ? count : "5"}`}
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
        <p style={{ width: "30px" }}>{count}</p>
        <Tooltip
          hasArrow
          label={`"crtl" click to add 5`}
          aria-label="A tooltip"
        >
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
