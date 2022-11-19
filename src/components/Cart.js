import React, { useState, useEffect } from "react";
import "../styles/Cart.scss";
import * as constants from "../utils/constants";
import emptyCart from "images/emptyCart.png";
import { Scrollbars } from "react-custom-scrollbars-2";
import {
  List,
  ListItem,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  extendTheme,
  InputRightAddon,
  InputGroup,
  Divider,
  useToast,
} from "@chakra-ui/react";
import CartItem from "./CartItem";
import Button from "./Button";

export default function Basket({ data, setCurrentPageTab }) {
  const toast = useToast();
  const [totalCost, setTotalCost] = useState(
    parseFloat(sessionStorage.getItem("totalCost")) || 0
  );
  const [totalItems, setTotalItems] = useState(
    parseInt(sessionStorage.getItem("totalItems")) || 0
  );
  const taxPrice = totalCost * 0.13;
  const [tipPercentage, setTipPercentage] = useState(0);
  const tipAmount = (totalCost * tipPercentage) / 100;
  const cartTotal = totalCost + taxPrice + tipAmount;
  const [isOpen, setOpen] = useState(false);
  const [paymentOptionSelected, setPaymentOption] = useState("");
  const [paymentAlert, showPaymentAlert] = useState("none");
  const [cartItems, setCartItems] = useState(
    Object.keys(sessionStorage).filter(
      (item) =>
        item !== "totalCost" &&
        item !== "totalItems" &&
        sessionStorage.getItem(item) > 0
    )
  );

  useEffect(() => {
    sessionStorage.setItem("totalCost", totalCost);
    setCartItems(
      Object.keys(sessionStorage).filter(
        (item) =>
          item !== "totalCost" &&
          item !== "totalItems" &&
          sessionStorage.getItem(item) > 0
      )
    );
  }, [totalCost]);

  useEffect(() => {
    sessionStorage.setItem("totalItems", totalItems);
  }, [totalItems]);

  const onChangePaymentOption = (event) => {
    setPaymentOption(event.target.value);
  };

  const onChangeTipAmount = (event) => {
    setTipPercentage(
      event.target.value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1")
    );
  };

  const submitOrder = (event) => {
    if (paymentOptionSelected === "") {
      showPaymentAlert("");
    } else if (paymentOptionSelected === "Inperson") {
      reset();
    } else {
      showPaymentAlert("none");
      setOpen(true);
    }
  };

  const cancel = (event) => {
    setOpen(false);
  };

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

  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: `#6D6875`,
    };
    return (
      <div className="bar" style={{ ...style, ...thumbStyle }} {...props} />
    );
  };

  const removeItem = (name, quantity, cost) => {
    sessionStorage.setItem(name, 0);
    setTotalCost(
      (prevTotal) => Math.round((prevTotal - quantity * cost) * 100) / 100
    );
    setTotalItems((prevTotal) => prevTotal - quantity);
    toast({
      title: `${name} removed`,
      status: "info",
      isClosable: true,
    });
  };

  const reset = () => {
    sessionStorage.clear();
    toast({
      title: `Order Submitted`,
      description: "Submit another order or view orders in 'My Orders'",
      status: "success",
      isClosable: true,
    });
    setCurrentPageTab(constants.PAGE_TABS.MENU);
  };

  return (
    <div
      className={`basket ${
        cartItems.length !== 0 ? "tw-h-[40vh]" : "tw-h-[80vh]"
      }`}
    >
      {cartItems.length !== 0 ? (
        <div className="cartHeader">
          <div className="itemNameHeader">ITEM NAME</div>
          <div className="itemCostHeader">ITEM COST</div>
        </div>
      ) : null}
      <Divider orientation="horizontal" />
      <Scrollbars
        renderThumbVertical={renderThumb}
        autoHeight
        autoHeightMin={100}
        autoHeightMax={500}
      >
        {cartItems.map((item) => (
          <CartItem
            key={item}
            info={data.getItemInfo(item)}
            setTotalCost={setTotalCost}
            setTotalItems={setTotalItems}
            removeItem={removeItem}
          />
        ))}
        {cartItems.length === 0 && (
          <div>
            <img className="cartEmpty" src={emptyCart} alt="cart empty" />
          </div>
        )}
      </Scrollbars>
      <Divider orientation="horizontal" />
      {cartItems.length !== 0 && (
        <div className="basketFooter">
          <div className="orderSummary">
            <List spacing={3}>
              <ListItem>
                <div className="orderSummaryRow">
                  <div
                    className="orderSummaryTitle"
                    style={{ color: "#B5838D" }}
                  >
                    Cost:
                  </div>
                  <div className="orderSummaryValue">
                    ${totalCost.toFixed(2)}
                  </div>
                </div>
              </ListItem>
              <div className="orderSummaryRow">
                <div className="orderSummaryTitle" style={{ color: "#B5838D" }}>
                  Tax:
                </div>
                <div className="orderSummaryValue">${taxPrice.toFixed(2)}</div>
              </div>
              <ListItem>
                <div className="orderSummaryRow">
                  <div
                    className="orderSummaryTitle"
                    style={{ color: "#B5838D" }}
                  >
                    Tip:
                  </div>
                  <div className="orderSummaryValue">
                    ${tipAmount.toFixed(2)}
                  </div>
                  <div className="tipOptions">
                    <InputGroup size="xs" onChange={onChangeTipAmount}>
                      <Input
                        style={{ width: "55px" }}
                        placeholder="Tip"
                        onInput={(e) =>
                          (e.target.value = e.target.value
                            .replace(/[^0-9.]/g, "")
                            .replace(/(\..*?)\..*/g, "$1"))
                        }
                      />
                      <InputRightAddon
                        style={{ color: "black" }}
                        children="%"
                      />
                    </InputGroup>
                  </div>
                </div>
              </ListItem>
              <ListItem>
                <div className="orderSummaryRow">
                  <div
                    className="orderSummaryTitle"
                    style={{ color: "#B5838D" }}
                  >
                    Total:
                  </div>
                  <div className="orderSummaryValue">
                    ${cartTotal.toFixed(2)}
                  </div>
                </div>
              </ListItem>
            </List>

            <div className="footerOptions">
              <div className="paymentOptions">
                <Select size="sm" onChange={onChangePaymentOption}>
                  <option style={{ backgroundColor: "#434560" }} value="">
                    Payment Option
                  </option>
                  <option style={{ backgroundColor: "#434560" }} value="Debit">
                    Debit
                  </option>
                  <option style={{ backgroundColor: "#434560" }} value="Credit">
                    Credit
                  </option>
                  <option
                    style={{ backgroundColor: "#434560" }}
                    value="Inperson"
                  >
                    In person
                  </option>
                </Select>
              </div>
              <Button
                content="Submit"
                onClick={() => {
                  submitOrder();
                }}
              />
            </div>

            <div style={{ display: paymentAlert }} className="paymentAlert">
              Please select payment option
            </div>
          </div>
        </div>
      )}

      <Modal
        theme={theme}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={cancel}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {["Debit", "Credit"].includes(paymentOptionSelected) && (
              <div>Enter payment information</div>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {["Debit", "Credit"].includes(paymentOptionSelected) && (
              <div className="modalBody">
                <div className="cardDetailsRow">
                  <FormControl isRequired>
                    <FormLabel>Cardholder Name</FormLabel>
                    <Input placeholder="Cardholder Name" />
                  </FormControl>
                  <FormControl style={{ paddingLeft: "10px" }} isRequired>
                    <FormLabel>Expiry</FormLabel>
                    <div style={{ display: "flex" }}>
                      <div style={{ paddingRight: "10px" }}>
                        <Input placeholder="Month" />
                      </div>
                      <div>
                        <Input placeholder="Year" />
                      </div>
                    </div>
                  </FormControl>
                </div>

                <div className="cardDetailsRow">
                  <FormControl isRequired>
                    <FormLabel>Card Number</FormLabel>
                    <Input placeholder="Card Number" />
                  </FormControl>
                  <FormControl style={{ paddingLeft: "10px" }} isRequired>
                    <FormLabel>CVC</FormLabel>
                    <div>
                      <div>
                        <Input placeholder="CVC" />
                      </div>
                    </div>
                  </FormControl>
                </div>
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            {["Debit", "Credit"].includes(paymentOptionSelected) && (
              <Button
                className="tw-mr-3"
                color="green"
                content="Complete Order"
                onClick={() => {
                  cancel();
                  reset();
                }}
              />
            )}
            <Button color="red" onClick={cancel} content={<p>Cancel</p>} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
