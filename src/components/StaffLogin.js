import React, { useState, useEffect } from "react";
import "../styles/StaffLogin.scss";
import { Input } from "@chakra-ui/react";
import * as constants from "../utils/constants";
import { storage, flags } from "utils/storage";
import Button from "components/Button";

export default function StaffLogin({ setCurrentPageTab }) {
  const currentRestaurant = storage.restaurants[storage.currentRestaurant];

  const [staffID, setStaffID] = useState("");
  const [staffPassword, setStaffPassword] = useState("");

  return (
    <div id="staff-login-container">
      <p className="prompt">Staff Login</p>
      <div className="form">
        <div className="form_field" key="staffId">
          <label className="form_label">Staff Username</label>
          <Input
            placeholder="Enter your username here."
            className="form_text_box"
            id="id_num"
            onChange={(e) => setStaffID(e.target.value)}
          />
        </div>
        <div className="form_field" key="password">
          <label className="form_label">Password</label>
          <Input
            className="form_text_box"
            placeholder="Enter your password here."
            type="password"
            id="password"
            onChange={(e) => setStaffPassword(e.target.value)}
          />
        </div>
        <Button
          className="submit_button"
          colour="blue"
          content="Submit"
          onClick={() => {
            if (
              currentRestaurant.restaurantOwner.username === staffID &&
              currentRestaurant.restaurantOwner.password === staffPassword
            ) {
              flags.isEmployeeSignedIn = true;
              setCurrentPageTab(constants.PAGE_TABS.OWNER_VIEW);
            } else if (
              currentRestaurant.restaurantEmployees.find(
                (employee) =>
                  employee.username === staffID &&
                  employee.password === staffPassword
              )
            ) {
              flags.isEmployeeSignedIn = true;
              setCurrentPageTab(constants.PAGE_TABS.EMPLOYEE_VIEW);
            }
          }}
        />
      </div>
    </div>
  );
}
