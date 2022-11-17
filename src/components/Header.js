import { storage, flags } from "utils/storage";
import pizza_logo from "images/image_pizza_logo.png";
import { useState, useEffect } from "react";
import * as constants from "utils/constants";

const Header = (props) => {
  const [home, setHome] = useState(false);
  useEffect(() => {
    if (home) {
      sessionStorage.clear();
      window.location.reload(false);
    }
  }, [home]);

  return (
    <div className="tw-flex tw-flex-row tw-justify-between tw-my-[20px] tw-mx-[30px]">
      {flags.isSignedIn ? (
        <>
          <div className="tw-flex tw-flex-col tw-justify-center">
            <div className="tw-text-sm">Name: {storage.customerName}</div>
            <div className="tw-text-sm">
              Table Number: {storage.customerTable}
            </div>
          </div>
        </>
      ) : null}
      <div
        className="tw-flex tw-flex-row tw-items-center"
        onClick={() => setHome(true)}
        style={{ cursor: "pointer" }}
      >
        <div className="tw-text-5xl">{storage.restaurantName}</div>
        <img className="tw-w-[64px] tw-h-[64px]" src={pizza_logo} alt="logo" />
      </div>
      {flags.isSignedIn ? <button></button> : null}
    </div>
  );
};

export default Header;
