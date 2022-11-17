import React, { useState, useEffect } from "react";
import "../styles/Menu.scss";
import MenuItem from "./MenuItem";
import * as constants from "../utils/constants";
import { Scrollbars } from "react-custom-scrollbars-2";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

export default function Menu({ setCurrentPageTab, data }) {
  const [activeCategory, setActiveCategory] = useState(data.getFirstCategory());
  const [totalCost, setTotalCost] = useState(
    parseFloat(sessionStorage.getItem("totalCost")) || 0
  );
  const [clear, setClear] = useState(false);

  const [totalItems, setTotalItems] = useState(
    parseInt(sessionStorage.getItem("totalItems")) || 0
  );

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
      setShow(false);
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

  const [show, setShow] = useState(false);

  return (
    <div id="menu-container">
      <div id="menu-categories">
        {data.getCategoryNames().map((name) => (
          <div
            key={name}
            className="menu-category"
            active={name === activeCategory ? "true" : "false"}
            onClick={() => {
              setActiveCategory(name);
              const scroll = document
                .getElementById("menu-item-container")
                .getElementsByTagName("div")[0];
              scroll.scrollTop = 0;
            }}
          >
            <div>{name}</div>
          </div>
        ))}
      </div>
      <Scrollbars id="menu-item-container" renderThumbVertical={renderThumb}>
        {data.getCategoryItems(activeCategory).map((name) => (
          <MenuItem
            key={name}
            info={data.getItemInfo(name)}
            setTotalCost={setTotalCost}
            setTotalItems={setTotalItems}
            clear={clear}
          />
        ))}
      </Scrollbars>
      <div id="menu-footer">
        <OverlayTrigger
          placement="left"
          show={totalCost > 0 ? show : false}
          rootClose
          overlay={
            <Popover>
              <Popover.Body>
                <Button variant="danger" onClick={() => setClear(true)}>
                  Clear {totalItems} items?
                </Button>
              </Popover.Body>
            </Popover>
          }
        >
          <Button
            variant="secondary"
            onClick={() => setShow(!show)}
            onBlur={() => setShow(false)}
          >
            Clear
          </Button>
        </OverlayTrigger>
        <button
          onClick={() => setCurrentPageTab(constants.PAGE_TABS.CART)}
          disabled={totalCost === 0}
        >
          Checkout - ${totalCost.toFixed(2)}
        </button>
      </div>
    </div>
  );
}
