import React, { useState } from "react";
import "../styles/Cart.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
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
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import * as chakra from "@chakra-ui/react";
import Button from "components/Button";
import delete_trash from "images/image_delete_trash.png";

export default function Basket(props) {
  const toast = useToast();
  const { cartItems, onAdd, onRemove, onRemoveAll } = props;
  const totalCost = cartItems.reduce((a, c) => a + c.cost * c.count, 0);
  const taxPrice = totalCost * 0.13;
  // const [tipAmount, setTipAmount] = useState(0.0);
  const [tipPercentage, setTipPercentage] = useState(0);
  const tipAmount = (totalCost * tipPercentage) / 100;
  const cartTotal = totalCost + taxPrice + tipAmount;
  const [isOpen, setOpen] = useState(false);
  const [paymentOptionSelected, setPaymentOption] = useState("");
  const [paymentAlert, showPaymentAlert] = useState("none");

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
      toast({
        title: `Order Submitted`,
        description: "Submit another order or view orders in 'My Orders'",
        status: "success",
        isClosable: true,
      });
    } else {
      showPaymentAlert("none");
      setOpen(true);
    }
  };

  const cancel = (event) => {
    setOpen(false);
  };

  const removeAllItems = (itemName) => {
    onRemoveAll(itemName);
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

  return (
    <div className="basket">
      <div className="cartHeader">
        <div className="itemNameHeader">ITEM NAME</div>
        <div className="itemCostHeader">ITEM COST</div>
      </div>
      <Divider orientation="horizontal" />
      <Scrollbars style={{ height: "520px" }} renderThumbVertical={renderThumb}>
        {cartItems.map((item) => (
          <div className="cartItem" key={item.name}>
            <div className="tw-self-center">
              <Button
                color="red"
                content={
                  <img
                    className="tw-w-[24px] tw-h-[24px] tw-brightness-0 tw-invert"
                    src={delete_trash}
                    alt="delete item"
                  />
                }
                onClick={() => {
                  removeAllItems(item.name);
                }}
              />
            </div>

            <LazyLoadImage
              src={item.img}
              width={175}
              height={150}
              alt={item.name}
              style={{ alignSelf: "center" }}
              effect="blur"
            />
            <div className="cartItemDesc" style={{ userSelect: "none" }}>
              <div>{item.name}</div>
              {item.size && <div>Size: {item.size}</div>}
            </div>

            <div className="basketMiddle">
              <div className="cartItemCost">${item.cost}</div>
              <div className="cartItemCount">
                <Button
                  height="8"
                  width="8"
                  color="red"
                  content={<MinusIcon w={3} h={3} />}
                  onClick={() => onRemove(item.name)}
                />
                <div className="tw-rounded tw-border-[2px] tw-border-solid tw-border-[#CBD5E1] tw-w-[30px] tw-h-[28px] tw-content-center tw-flex tw-justify-center">
                  <p>{item.count}</p>
                </div>
                <Button
                  width="8"
                  color="green"
                  content={<AddIcon w={3} h={3} />}
                  onClick={() => onAdd(item.name)}
                />
              </div>
            </div>

            <div className="basketLeft">
              <div>${(item.cost * item.count).toFixed(2)}</div>
            </div>
          </div>
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
                  <option value="">Payment Option</option>
                  <option value="Debit">Debit</option>
                  <option value="Credit">Credit</option>
                  <option value="Inperson"> In person</option>
                </Select>
              </div>
              <chakra.Button
                colorScheme="blue"
                size="sm"
                onClick={() => {
                  submitOrder();
                }}
              >
                Submit
              </chakra.Button>
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
              <chakra.Button colorScheme="blue" mr={3}>
                Complete Order
              </chakra.Button>
            )}
            <chakra.Button colorScheme="gray" onClick={cancel}>
              <p style={{ color: "black" }}>Cancel</p>
            </chakra.Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
