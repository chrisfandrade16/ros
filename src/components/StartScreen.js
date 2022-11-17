import React, { useState, useEffect } from "react";
import Select from "react-select";
import "../styles/StartScreen.scss";
import * as constants from "../utils/constants";
import { flags, storage } from "../utils/storage";
import Button from "components/Button";

export default function StartScreen({ setCurrentPageTab }) {
  const [name, setName] = useState("");
  const [tableNum, setTableNum] = useState(null);
  const [start, setStart] = useState(false);
  const [error, setError] = useState(false);
  const options = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
  ];

  useEffect(() => {
    if (start) {
      storage.customerName = name;
      storage.customerTable = tableNum;
      if (name === "" || tableNum === null) {
        setStart(false);
        setError(true);
      } else {
        setError(false);
        flags.isSignedIn = true;
        setCurrentPageTab(constants.PAGE_TABS.MENU);
      }
    }
  }, [start]);

  return (
    <div id="start-screen-container">
      <div className="form">
        <p>Welcome to McPizza! We serve authentic pizza and burgers!</p>
        <div className="form_field" key="name">
          <label className="form_label">Name</label>
          <input
            className="form_input"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form_field" key="tablenum">
          <label className="form_label">Table Number</label>
          <Select
            className="form_select"
            options={options}
            onChange={(options) => setTableNum(options.value)}
          />
        </div>
        <Button color="blue" content="Submit" onClick={() => setStart(true)} />
      </div>
      {error ? (
        <>
          <p className="error_msg">
            Please enter both your name and table number before starting your
            order.
          </p>
        </>
      ) : null}
    </div>
  );
}
