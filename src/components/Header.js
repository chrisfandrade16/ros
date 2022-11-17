import { storage, flags } from "utils/storage";
import pizza_logo from "images/image_pizza_logo.png";
import { useState, useEffect } from "react";
import Button from "components/Button";
import * as constants from "utils/constants";

const Header = (props) => {
  const currentRestaurant = storage.restaurants[storage.currentRestaurant];
  const [getHelpLabel, setGetHelpLabel] = useState("Get Help");
  const [home, setHome] = useState(false);
  useEffect(() => {
    if (home) {
      sessionStorage.clear();
      window.location.reload(false);
    }
  }, [home]);

  return (
    <div className="tw-flex tw-flex-row tw-mb-[20px] tw-items-center">
      {flags.isSignedIn ? (
        <>
          <div className="tw-flex tw-flex-col tw-flex tw-flex-1 tw-justify-center tw-mr-auto">
            <div className="tw-text-sm">
              Name: {storage.currentCustomerName}
            </div>
            <div className="tw-text-sm">
              Table Number: {storage.currentCustomerTable}
            </div>
          </div>
        </>
      ) : null}
      <div
        className="tw-flex tw-flex-row tw-items-center tw-flex tw-flex-1 tw-justify-center"
        onClick={() => setHome(true)}
      >
        <div className="tw-text-5xl tw-ml-[30px]">
          {currentRestaurant.restaurantName}
        </div>
        <img className="tw-w-[64px] tw-h-[64px]" src={pizza_logo} />
      </div>
      {flags.isSignedIn ? (
        <div className="tw-flex tw-flex-1 tw-justify-end tw-ml-auto">
          <Button
            color="blue"
            content={getHelpLabel}
            onClick={() => {
              setGetHelpLabel("Help is on the way!");
              setTimeout(() => {
                setGetHelpLabel("Get Help");
              }, 5000);
            }}
          ></Button>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
