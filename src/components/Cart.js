import React, { useState, useEffect } from "react";
import Basket from "./Basket";

export default function Cart({data}) {
   
   const [cartItems, setCartItems] = useState(data.getCartItems(["Large Pepperoni Pizza", "Chicken Wings", "Cheese Burger"]))

   const onAdd = (itemName) => {
        const exists = cartItems.find((x) => x.name === itemName);
        if(exists){
            setCartItems(
                cartItems.map((x) =>
                x.name === itemName ? {...exists, count: parseInt(exists.count) + 1} : x
                )
            );
        }
   }


   const onRemove = (itemName) => {
    const exists = cartItems.find((x) => x.name === itemName);
    if(exists.count === 1){
        setCartItems(cartItems.filter((x) => x.name !== itemName))
    }
    else{
        setCartItems(
            cartItems.map((x) =>
            x.name === itemName ? {...exists, count: parseInt(exists.count) - 1} : x
            )
        );
    }
}

  return (
    <div id="cart-container">
        {cartItems.length !== 0 && <div>Your Cart</div>}

        <Basket cartItems={cartItems} onAdd={onAdd} onRemove = {onRemove}></Basket>
      
    </div>
  );
}