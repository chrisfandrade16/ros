import React, { useState, useEffect } from "react";
import "../styles/StaffLogin.scss";
import * as constants from "../utils/constants";

export default function StaffLogin({ setCurrentPageTab }) {
    const [staffID, setStaffID] = useState("")
    const [login, setLogin] = useState(false);

    useEffect(() => {
        if (login) {
            if (staffID === "123") {
                setCurrentPageTab(constants.PAGE_TABS.CHANGE_MENU)
            }
            else {
                setCurrentPageTab(constants.PAGE_TABS.VIEW_ORDERS)
            }
        }
    }, [login]);

    return (
        <div id="staff-login-container">
            <div className="form">
                <div className="form_field" key="staffId">
                    <label className="form_label">
                        Staff ID Number
                    </label>
                    <input className="form_input" id="id_num" onChange={e => setStaffID(e.target.value)} />
                </div>
                <div className="form_field" key="password">
                    <label className="form_label">
                        Password
                    </label>
                    <input className="form_input" type="password" id="password" />
                </div>
                <input className="btn" type="submit" onClick={() => setLogin(true)}></input>
            </div>
        </div>
    );
}