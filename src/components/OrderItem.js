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
  TableContainer
} from "@chakra-ui/react";

export default function OrderItem({ info, data, setData }) {
  const createItemRows = function () {
    return info.items.map((item) => {
      return (
        <Tr>
          <Td>{item.name}</Td>
          <Td>{item.amount}</Td>
          <Td>{data.getItemInfo(item.name).cost}</Td>
        </Tr>
      );
    });
  };

  //View Items button stuff
  const [viewItems, setViewItems] = useState(false);
  const viewItemsClose = () => setViewItems(false);
  const viewItemsShow = () => setViewItems(true);
  const onChangeOrderStatus = function (status) {
    const newData = data;
    const index = newData.orderJSON.findIndex(
      (order) => order.order === info.order
    );
    newData.orderJSON[index].status = status;
    setData(newData);
  };

  //Cancel order button stuff
  const [cancelOrder, setCancelOrder] = useState(false);
  const cancelOrderClose = () => setCancelOrder(false);
  const cancelOrderShow = () => setCancelOrder(true);

  return (
    <div className="menu-item tw-gap-[20px]">
      <div className="item-desc">
        <TableContainer>
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>Order: #{info.order}</Td>
                <Td>Order Time: {info.orderTime}</Td>
              </Tr>
              <Tr>
                <Td>Customer: {info.customer}</Td>
                <Td>Server: {info.server}</Td>
              </Tr>
              <Tr>
                <Td>Table: #{info.table}</Td>
                <Td>Total: ${info.total}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </div>

      <div className="item-desc tw-w-[100px]">
        Status
        <Select
          className="form_select"
          value={info.status}
          onChange={(options) => onChangeOrderStatus(options.value)}
        >
          <option style={{ backgroundColor: "#434560" }} key="Cooking" value="Cooking">
            Cooking
          </option>
          <option style={{ backgroundColor: "#434560" }} key="Serving" value="Serving">
            Serving
          </option>
          <option style={{ backgroundColor: "#434560" }} key="Completed" value="Completed">
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
          disabled={info.status === 'Completed'}
          onClick={cancelOrderShow}
        />

        <AlertDialog
          isCentered
          isOpen={viewItems}
          onClose={viewItemsClose}
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
                {"Order: #".concat(info.order)}
                <AlertDialogCloseButton />
              </AlertDialogHeader>
              <AlertDialogBody>
                <Table>
                  <Tr>
                    <th>Item</th>
                    <th>Amount</th>
                    <th>Price</th>
                  </Tr>
                  {createItemRows()}
                </Table>
              </AlertDialogBody>
              <AlertDialogFooter>
                <div className="tw-flex tw-flex-row">
                  <p>Status: {info.status}</p>
                  <p>Total: ${info.total}</p>
                </div>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        <AlertDialog
          isCentered
          isOpen={cancelOrder}
          onClose={cancelOrderClose}
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
                {"Order: #".concat(info.order)}
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
                <Button
                  onClick={() => {
                    cancelOrderClose();
                    const newData = data;
                    const index = newData.orderJSON.findIndex(
                      (order) => order.order === info.order
                    );
                    if (index > -1) {
                      newData.orderJSON.splice(index, 1);
                    }
                    // console.log(newData);
                    setData(newData);
                  }}
                  content="Yes"
                  color="green"
                />
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </div>
    </div>
  );
}