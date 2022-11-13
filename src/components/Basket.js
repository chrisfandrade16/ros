import React, { useState, useEffect } from "react";
import "../styles/Cart.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {Button,ListGroup,DropdownButton,Dropdown,InputGroup,Form} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export default function Basket(props) {
  const {cartItems, onAdd, onRemove} = props;
  const totalCost = cartItems.reduce((a,c) => a + c.cost * c.count,0)
  const taxPrice = totalCost * 0.13
  const [tipAmount, setTipAmount] = useState(0.00)
  const cartTotal = totalCost + taxPrice + tipAmount

  const handleChange = event => {
    console.log(event.target.value);
  };

  const onChangeTipAmount = event => {
    if(event.target.value != "0"){
      const tipAmount = totalCost * (event.target.value)
      setTipAmount(tipAmount)
    }
    else{
      setTipAmount(0)

    }
    

  };

  return (

    <div class="basket">
      {cartItems.map((item) => (
      
        <div className="cartItem">
          <div class="trashIcon"><FontAwesomeIcon icon={faTrash} /></div>

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
                <Button onClick={() => onAdd(item.name)}>+</Button>
              <div class="itemCount">{item.count}</div>
                <Button onClick={()=> onRemove(item.name)}>-</Button>
            </div>



        </div>


        <div class="basketLeft">
            <div>${(item.cost * item.count).toFixed(2)}</div>
        </div>
      </div>
      ))}
      {cartItems.length === 0 && <div>Cart is empty</div>}
      {cartItems.length !== 0 &&

        <div class="basketFooter">
          <div class="backButton"> <Button variant="outline-primary">Back to Main Menu</Button>{' '}</div>

        <div class="footerMid">

          <div class="footerOptions"> 
            <div class="paymentOptions">
                <Form.Select onChange={handleChange} aria-label="Default select example">
                  <option >Payment Option</option>
                  <option  value="Debit">Debit</option>
                  <option value="1">Credit</option>
                  <option value="2">In person</option>
                </Form.Select>
              </div>
              <div class="submitButton"><Button variant="success">Submit Order</Button>{' '}</div>
          </div>
          
          
        </div>
          


          

          <div class="orderSummary">
            <ListGroup>
              <ListGroup.Item>Cost: ${totalCost.toFixed(2)}</ListGroup.Item>
              <ListGroup.Item>Tax: ${taxPrice.toFixed(2)}</ListGroup.Item>
              <ListGroup.Item id="tipRow">
                Tip: ${tipAmount.toFixed(2)} 
                <div class="tipOptions">
                  <Form.Select size="sm" onChange={onChangeTipAmount}>
                    <option value="0">Tip Amount</option>
                    <option value="0.05">5%</option>
                    <option value="0.1">10%</option>
                    <option value="0.15">15%</option>
                    <option value="0.20">20%</option>
                  </Form.Select>
              </div>
              </ListGroup.Item>
              <ListGroup.Item>Total: ${cartTotal.toFixed(2)}</ListGroup.Item>
            </ListGroup> 
          </div>

        </div>
        
          
        }




    </div>



  );
}
