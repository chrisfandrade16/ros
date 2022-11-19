import { storage, flags } from "utils/storage";
import pizza_logo from "images/image_pizza_logo.png";
import { useState, useEffect } from "react";
import Button from "components/Button";
import * as constants from "utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@chakra-ui/react";

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
      {flags.isCustomerSignedIn ? (
        <div className="tw-flex tw-items-center">
          <div className="tw-flex tw-flex-col tw-flex tw-flex-1 tw-mr-auto tw-mr-3 tw-grow">
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
            />
          </Tooltip>
        </div>
      ) : null}
      {flags.isEmployeeSignedIn ? (
        <>
          <div className="tw-flex tw-flex-col tw-flex tw-flex-1 tw-justify-center tw-mr-auto"></div>
        </>
      ) : null}
      <div
        className="tw-flex tw-flex-row tw-items-center tw-grow tw-justify-center"
        onClick={() => setHome(true)}
        style={{ cursor: "pointer" }}
      >
        <div className="tw-text-5xl">{currentRestaurant.restaurantName}</div>
        <img className="tw-w-[64px] tw-h-[64px]" src={pizza_logo} alt="logo" />
      </div>
      {flags.isCustomerSignedIn ? (
        <div className="tw-flex">
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
      {flags.isEmployeeSignedIn ? (
        <div className="tw-flex tw-flex-1 tw-justify-end tw-ml-auto">
          <Button
            color="blue"
            content={"Logout"}
            onClick={() => {
              setHome(true);
            }}
          ></Button>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
