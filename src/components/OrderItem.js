import React, { useState } from 'react';
import "../styles/Menu.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
import Button from "components/Button";
import {
  Table, Tbody, Tr, Td, TableContainer
} from '@chakra-ui/react';
import Select from "react-select";
import Modal2 from "components/Modal2";

export default function OrderItem({ info, data, setData }) {
  const options = [
    { value: "Preparing Food", label: "Preparing Food" },
    { value: "Delivering to Table", label: "Delivering to Table" },
    { value: "Completed", label: "Completed" }
  ];

  const createItemRows = function () {
    return info.items.map(item => {
      return (
        <Tr>
          <Td>{item.name}</Td>
          <Td>{item.amount}</Td>
          <Td>{data.getItemInfo(item.name).cost}</Td>
        </Tr>
      )
    });
  }

  //View Items button stuff
  const [viewItems, setViewItems] = useState(false);
  const viewItemsClose = () => setViewItems(false);
  const viewItemsShow = () => setViewItems(true);
  const onChangeOrderStatus = function (status) {
    const newData = data;
    const index = newData.orderJSON.findIndex(order => order.order === info.order);
    newData.orderJSON[index].status = status;
    setData(newData);
  };

  //Cancel order button stuff
  const [cancelOrder, setCancelOrder] = useState(false);
  const cancelOrderClose = () => setCancelOrder(false);
  const cancelOrderShow = () => setCancelOrder(true);
  const onCancelOrder = function () {
    cancelOrderClose();
    const newData = data;
    const index = newData.orderJSON.findIndex(order => order.order === info.order);
    if (index > -1) {
      newData.orderJSON.splice(index, 1);
    }
    console.log(newData);
    setData(newData);
  }

  return (
    <div className="menu-item">
      <div className="item-desc">
        <TableContainer>
          <Table variant='simple'>
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

      <div className="item-desc">
        Status
        <Select className="form_select" defaultValue={{ value: info.status, label: info.status }} options={options} onChange={(options) => onChangeOrderStatus(options.value)} />
      </div>

      <div className="item-desc">
        <Button
          color="blue"
          content="View Items"
          disabled={false}
          onClick={viewItemsShow}
        />
        <Button
          color="red"
          content="Cancel Order"
          disabled={false}
          onClick={cancelOrderShow}
        />

        {viewItems ? (
          <Modal2
            title={"Order: #".concat(info.order)}
            onClose={viewItemsClose}
            renderBody={() => {
              return (
                <Table>
                  <Tr>
                    <th>Item</th>
                    <th>Amount</th>
                    <th>Price</th>
                  </Tr>
                  {createItemRows()}
                </Table>
              );
            }}
            renderFooter={() => {
              return (
                <div>
                  <p>
                    Status: {info.status}
                  </p>
                  <p>
                    Total: ${info.total}
                  </p>
                </div>
              );
            }}
          />
        ) : null}

        {cancelOrder ? (
          <Modal2
            title={"Order: #".concat(info.order)}
            onClose={cancelOrderClose}
            renderBody={() => {
              return (
                <p>
                  Are you sure you would like to cancel this order?
                </p>
              );
            }}
            renderFooter={() => {
              return (
                <div>
                <Button
                  color="red"
                  content="No"
                  disabled={false}
                  onClick={cancelOrderClose}
                />
                  <Button
                    color="blue"
                    content="Yes"
                    disabled={false}
                    onClick={onCancelOrder}
                  />
                </div>
              );
            }}
          />
        ) : null}
      </div>
    </div>
  );
}


