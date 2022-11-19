import React, { useState } from "react";
import Basket from "./Basket";
import { useToast } from "@chakra-ui/react";

export default function Cart({ data }) {
  const [cartItems, setCartItems] = useState(
    data.getCartItems([
      "Large Pepperoni Pizza",
      "Small Pepperoni Pizza",
      "Cheese Burger",
    ])
  );

  const toast = useToast();

  const onAdd = (itemName) => {
    const exists = cartItems.find((x) => x.name === itemName);
    if (exists) {
      setCartItems(
        cartItems.map((x) =>
          x.name === itemName
            ? { ...exists, count: parseInt(exists.count) + 1 }
            : x
        )
      );
    }
  };

  const onRemove = (itemName) => {
    const exists = cartItems.find((x) => x.name === itemName);
    if (exists.count === 1) {
      toast({
        title: `${itemName} removed`,
        status: "info",
        isClosable: true,
      });
      setCartItems(cartItems.filter((x) => x.name !== itemName));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.name === itemName
            ? { ...exists, count: parseInt(exists.count) - 1 }
            : x
        )
      );
    }
  };

  const onRemoveAll = (itemName) => {
    const exists = cartItems.find((x) => x.name === itemName);
    if (exists) {
      toast({
        title: `${itemName} removed`,
        status: "info",
        isClosable: true,
      });
      setCartItems(cartItems.filter((x) => x.name !== itemName));
    }
  };

  return (
    <div id="cart-container">
      <Basket
        cartItems={cartItems}
        onAdd={onAdd}
        onRemove={onRemove}
        onRemoveAll={onRemoveAll}
      />
    </div>
  );
}
