import React, { useState, useEffect } from "react";
import { Input, Select } from "@chakra-ui/react";
import "../styles/StartScreen.scss";
import * as constants from "../utils/constants";
import { flags, storage } from "../utils/storage";
import Button from "components/Button";

export default function StartScreen({ setCurrentPageTab }) {
  const [name, setName] = useState("");
  const [tableNum, setTableNum] = useState(1);
  const [start, setStart] = useState(false);
  const [error, setError] = useState(false);
  const [error_msg, setErrorMsg] = useState("")


  useEffect(() => {
    if (start) {
      storage.currentCustomerName = name;
      storage.currentCustomerTable = tableNum;
      if (name === "" || tableNum === null) {
        setStart(false);
        setErrorMsg("Please enter both your name and table number before starting your order.")
        setError(true);
      }
      else if (!(/^[A-Za-z\s\-]*$/.test(name))) {
        setStart(false);
        setErrorMsg("Please enter a valid name, with no numbers or special characters.")
        setError(true);
      }
      else {
        setError(false);
        flags.isSignedIn = true;
        setCurrentPageTab(constants.PAGE_TABS.MENU);
      }
    }
  }, [start]);


  return (
    <div id="start-screen-container">
      <p className="prompt">Welcome to McPizza, Hamilton's most authentic pizza restaurant.</p>
      <p className="prompt">Enter your name and table number below to begin ordering!</p>
      <div className="form">
        <div className="form_field" key="name">
          <label className="form_label">Name</label>
          <Input
            className="form_text_box"
            placeholder="Enter your name here"
            id="name"
            onChange={(e) => setName(e.target.value)}></Input>
        </div>
        <div className="form_field" key="tablenum">
          <label className="form_label">Table Number</label>
          <Select
            className="form_select"
            default_value="1"
            onChange={(e) => setTableNum(e.target.value)}
          >
            <option key="1" value="1">1</option>
            <option key="2" value="2">2</option>
            <option key="3" value="3">3</option>
            <option key="4" value="4">4</option>
            <option key="5" value="5">5</option>
            <option key="6" value="6">6</option>
            <option key="7" value="7">7</option>
          </Select>

        </div>
        <Button className="submit_button" color="blue" content="Submit" onClick={() => setStart(true)} />
      </div>
      {error ? (
        <>
          <p className="error_msg">
            {error_msg}
          </p>
        </>
      ) : null}
    </div>
  );
}
