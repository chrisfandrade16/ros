import React, { useState, useRef } from "react";
import "../styles/Menu.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
import Button from "components/Button";
import { Select } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from "@chakra-ui/react";

export default function OrderItem({ orderInfo, updateOrderJSON, data }) {
  const createItemRows = function () {
    return orderInfo.items.map((item) => {
      return (
        <Tr>
          <Td style={{ textAlign: "left" }}>{item.name}</Td>
          <Td isNumeric style={{ textAlign: "left" }}>
            {item.amount}
          </Td>
          <Td isNumeric style={{ textAlign: "left" }}>
            ${data.getItemInfo(item.name).cost}
          </Td>
        </Tr>
      );
    });
  };

  //View Items button stuff
  const [viewItems, setViewItems] = useState(false);
  const viewItemsClose = () => setViewItems(false);
  const viewItemsShow = () => setViewItems(true);
  const onChangeOrderStatus = function (status) {
    const jsonString = JSON.stringify(orderInfo);
    let newOrderInfo = JSON.parse(jsonString);
    newOrderInfo.status = status;
    updateOrderJSON(newOrderInfo);
  };

  //Cancel order button stuff
  const [cancelOrder, setCancelOrder] = useState(false);
  const cancelOrderClose = () => setCancelOrder(false);
  const cancelOrderShow = () => setCancelOrder(true);
  const onCancelOrder = function () {
    cancelOrderClose();
    const jsonString = JSON.stringify(orderInfo);
    let newOrderInfo = JSON.parse(jsonString);
    newOrderInfo.status = null;
    updateOrderJSON(newOrderInfo);
  };

  return (
    <div className="menu-item tw-gap-[20px]">
      <div className="item-desc">
        <TableContainer>
          <Table variant="simple" size="sm">
            <Tbody>
              <Tr>
                <Td>Order: #{orderInfo.order}</Td>
                <Td>Order Time: {orderInfo.orderTime}</Td>
              </Tr>
              <Tr>
                <Td>Customer: {orderInfo.customer}</Td>
                <Td>Server: {orderInfo.server}</Td>
              </Tr>
              <Tr>
                <Td>Table: #{orderInfo.table}</Td>
                <Td>Total: ${orderInfo.total}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </div>

      <div className="item-desc tw-w-[100px]">
        Status
        <Select
          className="form_select"
          value={orderInfo.status}
          onChange={(event) => onChangeOrderStatus(event.target.value)}
        >
          <option
            style={{ backgroundColor: "#434560" }}
            key="Cooking"
            value="Cooking"
          >
            Cooking
          </option>
          <option
            style={{ backgroundColor: "#434560" }}
            key="Serving"
            value="Serving"
          >
            Serving
          </option>
          <option
            style={{ backgroundColor: "#434560" }}
            key="Completed"
            value="Completed"
          >
            Completed
          </option>
        </Select>
      </div>

      <div className="item-desc tw-flex tw-flex-col tw-gap-[20px]">
        <Button
          color="blue"
          content="View Items"
          disabled={false}
          onClick={viewItemsShow}
        />
        <Button
          color="red"
          content="Cancel Order"
          disabled={orderInfo.status === "Completed"}
          onClick={cancelOrderShow}
        />

        <AlertDialog isCentered isOpen={viewItems} onClose={viewItemsClose}>
          <AlertDialogOverlay>
            <AlertDialogContent
              style={{ color: "#FFCDB2", backgroundColor: "#272838" }}
            >
              <AlertDialogHeader
                fontSize="lg"
                fontWeight="bold"
                style={{ color: "#B5838D" }}
              >
                {"Order: #".concat(orderInfo.order)}
                <AlertDialogCloseButton />
              </AlertDialogHeader>
              <AlertDialogBody>
                <Table>
                  <Tr>
                    <Td style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Item
                    </Td>
                    <Td style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Amount
                    </Td>
                    <Td style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Price
                    </Td>
                  </Tr>
                  {createItemRows()}
                </Table>
              </AlertDialogBody>
              <AlertDialogFooter>
                <div className="tw-flex tw-flex-row">
                  <p>
                    <span style={{ color: "#B5838D" }}>Status: </span>
                    {orderInfo.status}
                  </p>
                  <p className="tw-ml-2">
                    <span style={{ color: "#B5838D" }}>Total: </span>$
                    {orderInfo.total}
                  </p>
                </div>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        <AlertDialog isCentered isOpen={cancelOrder} onClose={cancelOrderClose}>
          <AlertDialogOverlay>
            <AlertDialogContent
              style={{ color: "#FFCDB2", backgroundColor: "#272838" }}
            >
              <AlertDialogHeader
                fontSize="lg"
                fontWeight="bold"
                style={{ color: "#B5838D" }}
              >
                {"Order: #".concat(orderInfo.order)}
              </AlertDialogHeader>
              <AlertDialogBody>
                Are you sure you would like to cancel this order?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button
                  onClick={cancelOrderClose}
                  content="No"
                  color="red"
                  className="tw-mx-3"
                />
                <Button onClick={onCancelOrder} content="Yes" color="green" />
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </div>
    </div>
  );
}
