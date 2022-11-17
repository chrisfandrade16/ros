import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
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
        <Button
          style={{ marginRight: "10px", width: "40px" }}
          variant="success"
          onClick={() => {
            setCount(count + 1);
            setTotalCost(
              (prevTotal) => Math.round((prevTotal + cost) * 100) / 100
            );
            setTotalItems((prevTotal) => prevTotal + 1);
          }}
        >
          +
        </Button>
        {count}
        <Button
          style={{ marginLeft: "10px", width: "40px" }}
          variant="danger"
          onClick={() => {
            if (count > 0) {
              setCount(count - 1);
              setTotalCost(
                (prevTotal) => Math.round((prevTotal - cost) * 100) / 100
              );
              setTotalItems((prevTotal) => prevTotal - 1);
            }
          }}
        >
          -
        </Button>
      </div>
    </div>
  );
}
