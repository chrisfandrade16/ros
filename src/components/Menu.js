import React, { useState, useEffect, useRef } from "react";
import "../styles/Menu.scss";
import MenuItem from "./MenuItem";
import * as constants from "../utils/constants";
import { Scrollbars } from "react-custom-scrollbars-2";
import Button from "components/Button";
import Navigator from "./Navigatior";
import { storage } from "utils/storage";
import {
  InputGroup,
  Input,
  InputLeftElement,
  Tooltip,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { matchSorter } from "match-sorter";

export default function Menu({ data, setCurrentPageTab }) {
  const currentRestaurant = storage.restaurants[storage.currentRestaurant];
  const [currentCategoryTab, setCurrentCategoryTab] = useState(
    Object.keys(currentRestaurant.restaurantMenu)[0]
  );
  const [totalCost, setTotalCost] = useState(
    parseFloat(sessionStorage.getItem("totalCost")) || 0
  );
  const [clear, setClear] = useState(false);

  const [totalItems, setTotalItems] = useState(
    parseInt(sessionStorage.getItem("totalItems")) || 0
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    sessionStorage.setItem("totalCost", totalCost);
  }, [totalCost]);

  useEffect(() => {
    sessionStorage.setItem("totalItems", totalItems);
  }, [totalItems]);

  useEffect(() => {
    if (clear) {
      sessionStorage.clear();
      setTotalCost(0);
      setTotalItems(0);
      setClear(false);
    }
  }, [clear]);

  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: `grey`,
    };
    return (
      <div className="bar" style={{ ...style, ...thumbStyle }} {...props} />
    );
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <div id="menu-container">
      <Navigator
        tabs={Object.keys(currentRestaurant.restaurantMenu).map((category) => {
          return {
            text: category,
            onClick: () => {
              setCurrentCategoryTab(category);
              const scroll = document
                .getElementById("menu-item-container")
                .getElementsByTagName("div")[0];
              scroll.scrollTop = 0;
            },
          };
        })}
        activeTab={currentCategoryTab}
        activePointerTab={true}
        useTextAsId={true}
      />
      <Scrollbars id="menu-item-container" renderThumbVertical={renderThumb}>
        {matchSorter(data.getCategoryPattern(currentCategoryTab), search, {
          keys: ["name", "ingredients"],
        }).length > 0
          ? matchSorter(data.getCategoryPattern(currentCategoryTab), search, {
              keys: ["name", "ingredients"],
            }).map((obj) => (
              <MenuItem
                key={obj.name}
                info={data.getItemInfo(obj.name)}
                setTotalCost={setTotalCost}
                setTotalItems={setTotalItems}
                clear={clear}
              />
            ))
          : "No matching items found :("}
      </Scrollbars>
      <div className="menu-footer tw-flex tw-justify-around">
        <InputGroup style={{ width: "20%" }}>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            type="search"
            placeholder="Search for item"
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>

        <Tooltip
          label="No items in cart!"
          hasArrow
          isDisabled={totalItems > 0}
          openDelay={800}
        >
          <span>
            <Button
              color="red"
              content="Clear Selections"
              disabled={totalItems === 0}
              onClick={onOpen}
            />
          </span>
        </Tooltip>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent
              style={{ color: "#FFCDB2", backgroundColor: "#272838" }}
            >
              <AlertDialogHeader
                fontSize="lg"
                fontWeight="bold"
                style={{ color: "#B5838D" }}
              >
                Clear {totalItems} Items?
              </AlertDialogHeader>
              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button
                  onClick={onClose}
                  content="Cancel"
                  color="green"
                  className="tw-mx-3"
                />
                <Button
                  onClick={() => {
                    onClose();
                    setClear(true);
                  }}
                  content="Clear"
                  color="red"
                />
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        <div style={{ width: "150px" }}>
          <p align="left">
            <span style={{ color: "#B5838D" }}>Total Items:</span> {totalItems}
          </p>
          <p align="left">
            <span style={{ color: "#B5838D" }}>Total Cost:</span>
            &nbsp;&nbsp;&nbsp;${totalCost.toFixed(2)}
          </p>
        </div>
        <Tooltip
          label="No items in cart!"
          hasArrow
          isDisabled={totalItems > 0}
          openDelay={800}
        >
          <span>
            <Button
              color="green"
              content="Go to Cart"
              onClick={() => setCurrentPageTab(constants.PAGE_TABS.CART)}
              disabled={totalItems === 0}
            />
          </span>
        </Tooltip>
      </div>
    </div>
  );
}
