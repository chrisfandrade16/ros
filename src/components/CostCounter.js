import React, { useState, useEffect } from "react";
import "../styles/Menu.scss";

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
    <div className="cost-counter" style={{ userSelect: "none" }}>
      <div>${cost}</div>
      <div className="cost-incrementer">
        <button
          style={{ marginRight: "5px" }}
          onClick={() => {
            setCount(count + 1);
            setTotalCost(
              (prevTotal) => Math.round((prevTotal + cost) * 100) / 100
            );
            sessionStorage.setItem(
              "totalItems",
              parseInt(sessionStorage.getItem("totalItems") + 1)
            );
            setTotalItems((prevTotal) => prevTotal + 1);
          }}
        >
          +
        </button>
        {count}
        <button
          style={{ marginLeft: "5px" }}
          onClick={() => {
            if (count > 0) {
              setCount(count - 1);
              setTotalCost(
                (prevTotal) => Math.round((prevTotal - cost) * 100) / 100
              );
              sessionStorage.setItem(
                "totalItems",
                parseInt(sessionStorage.getItem("totalItems") - 1)
              );
              setTotalItems((prevTotal) => prevTotal - 1);
            }
          }}
        >
          -
        </button>
      </div>
    </div>
  );
}
