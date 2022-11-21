import { storage, flags } from "utils/storage";
import pizza_logo from "images/image_pizza_logo.png";
import { useState, useEffect } from "react";
import Button from "components/Button";
import * as constants from "utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import {
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Select,
  useDisclosure,
  extendTheme,
} from "@chakra-ui/react";

const Header = (props) => {
  const { setCurrentPageTab } = props;
  const currentRestaurant = storage.restaurants[storage.currentRestaurant];
  const [getHelpLabel, setGetHelpLabel] = useState("Get Help");
  const [home, setHome] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState("");
  const [tableNum, setTableNum] = useState(1);
  const [start, setStart] = useState(false);
  const [error, setError] = useState(false);
  const [error_msg, setErrorMsg] = useState("");

  useEffect(() => {
    if (start) {
      console.log(name, tableNum);
      storage.currentCustomerName = name;
      storage.currentCustomerTable = tableNum;
      if (name === "" || tableNum === null) {
        setStart(false);
        setErrorMsg("Please enter both your name and table number.");
        setError(true);
      } else if (!/^[A-Za-z\s-]*$/.test(name)) {
        setStart(false);
        setErrorMsg(
          "Please enter a valid name, with no numbers or special characters."
        );
        setError(true);
      } else {
        setError(false);
        setStart(false);
        onClose();
      }
    }
  }, [start]);

  useEffect(() => {
    if (home) {
      sessionStorage.clear();
      window.location.reload(false);
    }
  }, [home]);

  const theme = extendTheme({
    components: {
      Modal: {
        baseStyle: (props) => ({
          dialog: {
            bg: "#282935",
          },
        }),
      },
    },
  });

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
                onClick={onOpen}
              />
            </Tooltip>
          </>
        ) : null}
      </div>
      <div
        className="tw-flex tw-flex-row tw-items-center tw-grow tw-justify-center"
        style={{ cursor: "pointer" }}
        onClick={() => {
          setHome(true);
        }}
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
          />
        ) : null}
        {flags.isCustomerSignedIn ? (
          <Button
            color="blue"
            content={"About Us"}
            onClick={() => {
              setCurrentPageTab(constants.PAGE_TABS.ABOUT_US);
            }}
          />
        ) : null}
        {flags.isEmployeeSignedIn ? (
          <Button
            color="blue"
            content={"Logout"}
            onClick={() => {
              setHome(true);
            }}
          />
        ) : null}
      </div>
      <Modal isOpen={isOpen} onClose={onClose} theme={theme}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader style={{ color: "#B5838D" }}>
            Change Your Info
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="form_field" key="name">
              <label className="form_label">Name</label>
              <Input
                className="form_text_box"
                placeholder="Enter your name here."
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form_field" key="tablenum">
              <label className="form_label">Table Number</label>
              <Select
                className="form_select"
                placeholder="Choose a table number"
                onChange={(e) => setTableNum(e.target.value)}
              >
                <option
                  style={{ backgroundColor: "#434560" }}
                  key="1"
                  value="1"
                >
                  1
                </option>
                <option
                  style={{ backgroundColor: "#434560" }}
                  key="2"
                  value="2"
                >
                  2
                </option>
                <option
                  style={{ backgroundColor: "#434560" }}
                  key="3"
                  value="3"
                >
                  3
                </option>
                <option
                  style={{ backgroundColor: "#434560" }}
                  key="4"
                  value="4"
                >
                  4
                </option>
                <option
                  style={{ backgroundColor: "#434560" }}
                  key="5"
                  value="5"
                >
                  5
                </option>
                <option
                  style={{ backgroundColor: "#434560" }}
                  key="6"
                  value="6"
                >
                  6
                </option>
                <option
                  style={{ backgroundColor: "#434560" }}
                  key="7"
                  value="7"
                >
                  7
                </option>
              </Select>
            </div>
            <Button
              className="submit_button"
              color="blue"
              content="Confirm"
              onClick={() => setStart(true)}
            />
            {error ? <p className="error_msg">{error_msg}</p> : null}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Header;
