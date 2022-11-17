import React, { useState, useEffect } from "react";
import "../styles/Cart.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import emptyCart from "images/emptyCart.png";
import {
  List, ListItem, Select, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input,   extendTheme, InputRightAddon, InputGroup

} from '@chakra-ui/react';

import * as chakra from '@chakra-ui/react' ;
import Button from "components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


export default function Basket(props) {
  const { cartItems, onAdd, onRemove, onRemoveAll} = props;
  const totalCost = cartItems.reduce((a, c) => a + c.cost * c.count, 0);
  const taxPrice = totalCost * 0.13;
  // const [tipAmount, setTipAmount] = useState(0.0);
  const [tipPercentage,setTipPercentage] = useState(0)
  const tipAmount = totalCost * tipPercentage/100;
  const cartTotal = totalCost + taxPrice + tipAmount;
  const [isOpen,setOpen] = useState(false);
  const [paymentOptionSelected,setPaymentOption] = useState("");
  const [paymentAlert,showPaymentAlert] = useState("none");

  const onChangePaymentOption = (event) => {
    setPaymentOption(event.target.value)
  };

  const onChangeTipAmount = (event) => {
      setTipPercentage(event.target.value)
  };

  const submitOrder = (event) => {
    if(paymentOptionSelected == ""){
      showPaymentAlert("")
    }
    else{
      showPaymentAlert("none")
      setOpen(true)
    }
  };

  const cancel = (event) =>{
    setOpen(false)
  }

  const removeAllItems = (itemName) =>{
    onRemoveAll(itemName);
    
  }


  const theme = extendTheme({
    components: {
      Modal: {
        baseStyle: (props) => ({
          dialog: {
            bg: "#282935"
          }
        })
      }
    }
  });

  return (


    <div class="basket">
      <div class="basketItems">
        {cartItems.map((item) => (
            <div className="cartItem">
              <div class="trashIcon">
                <FontAwesomeIcon icon={faTrash} onClick={() => removeAllItems(item.name)}/>
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

              <div class="basketMiddle">
                <div class="cartItemCost">${item.cost}</div>
                <div class="cartItemCount">
                  <Button
                    width="8"
                    content="-"
                    onClick={() => onRemove(item.name)}
                  ></Button>
                  <div class="itemCount">{item.count}</div>
                  <Button
                    width="8"
                    color="green"
                    content="+"
                    onClick={() => onAdd(item.name)}
                  ></Button>
                </div>
              </div>

              <div class="basketLeft">
                <div>${(item.cost * item.count).toFixed(2)}</div>
              </div>
            </div>
          ))}
        {cartItems.length === 0 && <div><img class="cartEmpty" src={emptyCart}></img></div>}
      </div>

      {cartItems.length !== 0 && (
        <div class="basketFooter">
          <div class="orderSummary">
            <List spacing={3}>
              <ListItem>
                <div class="orderSummaryRow">
                  <div class="orderSummaryTitle">Cost:</div>
                  <div class="orderSummaryValue">${totalCost.toFixed(2)}</div>
                </div>
              </ListItem>
                <div class="orderSummaryRow">
                  <div class="orderSummaryTitle">Tax:</div>
                  <div class="orderSummaryValue">${taxPrice.toFixed(2)}</div>
                </div>
              <ListItem>
                <div class="orderSummaryRow">
                  <div class="orderSummaryTitle">Tip:</div>
                  <div class="orderSummaryValue">${tipAmount.toFixed(2)}</div>
                  <div class="tipOptions">
                    <InputGroup size='xs' onChange={onChangeTipAmount}>
                      <Input style={{width:"55px"}} placeholder='Tip' />
                      <InputRightAddon style={{color:"black"}} children='%' />
                    </InputGroup>
                  </div>
                </div>
              </ListItem>
              <ListItem>
                <div class="orderSummaryRow">
                  <div class="orderSummaryTitle">Total:</div>
                  <div class="orderSummaryValue">${cartTotal.toFixed(2)}</div>
                </div>
              </ListItem>
            </List>

            <div class="footerOptions"> 
              <div class="paymentOptions">
                  <Select size='sm' onChange={onChangePaymentOption}>
                    <option value="">Payment Option</option>
                    <option  value="Debit">Debit</option>
                    <option value="Credit">Credit</option>
                    <option value="Inperson"> In person</option>
                  </Select>
                </div>
                <chakra.Button colorScheme='blue' size='sm' onClick={() => {submitOrder()}}> 
                  Submit
                </chakra.Button>
            </div>

            <div style={{display:paymentAlert}} class="paymentAlert"> Please select payment option</div>

          </div>
        </div>
      )}

    <Modal theme={theme} closeOnOverlayClick={false} isOpen={isOpen} onClose={cancel}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{["Debit","Credit"].includes(paymentOptionSelected) &&  <div>Enter payment information</div>}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {["Debit","Credit"].includes(paymentOptionSelected) && <div class="modalBody">

                <div class="cardDetailsRow">
                  <FormControl isRequired>
                    <FormLabel>Cardholder Name</FormLabel>
                    <Input placeholder='Cardholder Name' />
                  </FormControl>
                  <FormControl style={{paddingLeft:"10px"}} isRequired>
                    <FormLabel>Expiry</FormLabel>
                    <div style={{display:"flex"}}>
                      <div style={{paddingRight:"10px"}}><Input placeholder='Month' /></div>
                      <div><Input placeholder='Year' /></div>
                    </div>
                  </FormControl>
                </div>

                <div class="cardDetailsRow">
                  <FormControl isRequired>
                    <FormLabel>Cardholder Name</FormLabel>
                    <Input placeholder='Card Number' />
                  </FormControl>
                  <FormControl style={{paddingLeft:"10px"}} isRequired>
                    <FormLabel>CVC</FormLabel>
                    <div>
                      <div><Input placeholder='CVC' /></div>
                    </div>
                  </FormControl>
                </div>
              </div>}
            </ModalBody>

            <ModalBody pb={6}>
              {paymentOptionSelected == "Inperson" && <div style={{paddingLeft:"30px"}} class="modalBody">

                Hang Tight! Server will be with you shortly.

                
              </div>}
            </ModalBody>

            <ModalFooter>
              {["Debit","Credit"].includes(paymentOptionSelected) && <chakra.Button colorScheme='blue' mr={3}>Complete Order</chakra.Button>}
              <chakra.Button colorScheme='gray' onClick={cancel}><a style={{color:"black"}}>Cancel</a></chakra.Button>
            </ModalFooter>
          </ModalContent>
      </Modal>

    </div>
  );
}
