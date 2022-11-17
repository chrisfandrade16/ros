import React, { useState } from "react";
import Basket from "./Basket";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure
  } from '@chakra-ui/react'
  import * as chakra from '@chakra-ui/react' ;


export default function Cart({data}) {
   
   const [cartItems, setCartItems] = useState(data.getCartItems(["Large Pepperoni Pizza", "Small Pepperoni Pizza", "Cheese Burger"]))
   const [showConfirmation,setShowConfirmation] = useState(false)
   const [itemToBeDeleted,setItemToBeDeleted] = useState("")
   const {onClose } = useDisclosure()
   const cancelRef = React.useRef()

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
            setShowConfirmation(true)
            setItemToBeDeleted(itemName)
        }
        else{
            setCartItems(
                cartItems.map((x) =>
                x.name === itemName ? {...exists, count: parseInt(exists.count) - 1} : x
                )
            );
        }
    }

    const onRemoveAll = (itemName) => {
        const exists = cartItems.find((x) => x.name === itemName);
        if(exists){
            setShowConfirmation(true)
            setItemToBeDeleted(itemName)
        }
    }

    const deleteLastOrder = (event) => {
        setCartItems(cartItems.filter((x) => x.name !== itemToBeDeleted))
        setShowConfirmation(false)
    }

    const cancel = (event)=>{
        setShowConfirmation(false)

    }



  return (
    <div id="cart-container">
        <Basket cartItems={cartItems} onAdd={onAdd} onRemove = {onRemove} onRemoveAll={onRemoveAll}></Basket>
        <AlertDialog
            isOpen={showConfirmation}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Item
                </AlertDialogHeader>

                <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                <chakra.Button style={{color:"black"}} ref={cancelRef} onClick={cancel}>
                    Cancel
                </chakra.Button>
                <chakra.Button colorScheme='red' onClick={deleteLastOrder} ml={3}>
                    Delete
                </chakra.Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    </div>
  );
}