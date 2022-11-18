import React, { useState, useEffect } from "react";
import "../styles/StaffLogin.scss";
import * as constants from "../utils/constants";
import { storage } from "utils/storage";
import Button from "components/Button";

export default function StaffLogin({ setCurrentPageTab }) {
  const currentRestaurant = storage.restaurants[storage.currentRestaurant];

  const [staffID, setStaffID] = useState("");
  const [staffPassword, setStaffPassword] = useState("");

  return (
    <div id="staff-login-container">
      <div className="form">
        <h1 className="form_header">Staff Login</h1>
        <div className="form_field" key="staffId">
          <label className="form_label">Staff ID Number</label>
          <input
            className="form_input"
            id="id_num"
            onChange={(e) => setStaffID(e.target.value)}
          />
        </div>
        <div className="form_field" key="password">
          <label className="form_label">Password</label>
          <input
            className="form_input"
            type="password"
            id="password"
            onChange={(e) => setStaffPassword(e.target.value)}
          />
        </div>
        <Button
          colour="blue"
          content="Submit"
          onClick={() => {
            if (
              currentRestaurant.restaurantOwner.username === staffID &&
              currentRestaurant.restaurantOwner.password === staffPassword
            ) {
              setCurrentPageTab(constants.PAGE_TABS.CHANGE_MENU);
            } else if (
              currentRestaurant.restaurantEmployees.find(
                (employee) =>
                  employee.username === staffID &&
                  employee.password === staffPassword
              )
            ) {
              setCurrentPageTab(constants.PAGE_TABS.VIEW_ORDERS);
            }
          }}
        />
      </div>
    </div>
  );
}
