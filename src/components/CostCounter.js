import React, { useState, useEffect } from "react";
import "../App.css";

export default function CostCounter({ name, cost }) {
  const [count, setCount] = useState(
    parseInt(sessionStorage.getItem(name)) || 0
  );

  useEffect(() => {
    sessionStorage.setItem(name, count);
  }, [name, count]);

  return (
    <div className="cost-counter" style={{ userSelect: "none" }}>
      <div>${cost}</div>
      <button onClick={() => setCount(count + 1)}>+</button>
      {count}
      <button
        onClick={() => {
          if (count > 0) setCount(count - 1);
        }}
      >
        -
      </button>
    </div>
  );
}
