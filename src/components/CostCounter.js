import React, { useState } from "react";
import "../App.css";

export default function CostCounter({ cost }) {
  const [count, setCount] = useState(0);
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
