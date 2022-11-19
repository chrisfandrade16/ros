import { storage, flags } from "utils/storage";
import pizza_logo from "images/image_pizza_logo.png";
import { useState, useEffect } from "react";
import Button from "components/Button";
import * as constants from "utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@chakra-ui/react";

const Header = (props) => {
  const { setCurrentPageTab } = props;
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
      <div className="tw-flex tw-flex-row tw-gap-[20px] tw-items-center tw-mr-auto tw-w-[33%]">
        {flags.isCustomerSignedIn ? (
          <>
            <div className="tw-flex tw-flex-col">
              <div className="tw-text-sm">
                <span style={{ color: "#B5838D" }}>Name: &nbsp; &nbsp;</span>
                {storage.currentCustomerName}
              </div>
              <div className="tw-text-sm">
                <span style={{ color: "#B5838D" }}>Table #: </span>
                {storage.currentCustomerTable}
              </div>
            </div>
            <Tooltip label="Change your info" hasArrow placement="right">
              <FontAwesomeIcon
                className="tw-cursor-pointer"
                icon={faPenToSquare}
                onClick={() => {
                  setHome(true);
                }}
              />
            </Tooltip>
          </>
        ) : null}
      </div>
      <div
        className="tw-flex tw-flex-row tw-items-center tw-grow tw-justify-center"
        style={{ userSelect: "none" }}
      >
        <div className="tw-text-5xl">{currentRestaurant.restaurantName}</div>
        <img className="tw-w-[64px] tw-h-[64px]" src={pizza_logo} alt="logo" />
      </div>
      <div className="tw-flex tw-flex-row tw-items-center tw-gap-[20px] tw-ml-auto tw-w-[33%] tw-justify-end">
        {flags.isCustomerSignedIn ? (
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
        ) : null}
        {flags.isCustomerSignedIn ? (
          <Button
            color="blue"
            content={"About Us"}
            onClick={() => {
              setCurrentPageTab(constants.PAGE_TABS.ABOUT_US);
            }}
          ></Button>
        ) : null}
        {flags.isEmployeeSignedIn ? (
          <Button
            color="blue"
            content={"Logout"}
            onClick={() => {
              setHome(true);
            }}
          ></Button>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
