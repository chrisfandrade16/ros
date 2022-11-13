import React, { useState, useEffect } from "react";
import { storage, flags } from "../utils/storage"
import pizza_logo from "../images/image_pizza_logo.png"
import * as constants from "../utils/constants";


const Header = (props) => {
    const [home, setHome] = useState(false);
    useEffect(() => {
        if (home) {
            sessionStorage.clear();
            window.location.reload(false);
        }
    }, [home]);
    return (
        <div className="row spaced header">
            {flags.isSignedIn ?
                <>
                    <div className="column justify-center">
                        <div className="small-text">Name: {storage.customerName}</div>
                        <div className="small-text">Table Number: {storage.customerTable}</div>
                    </div>
                </> : null}
            <div className="row align-center" onClick={() => setHome(true)}>
                <div className="big-text">{storage.restaurantName}</div>
                <img className="big-icon" src={pizza_logo} />
            </div>
            <button></button>
        </div>
    )
};

export default Header;
