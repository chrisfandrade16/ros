import React, { useState } from 'react';
import "../styles/Menu.scss";
import { Button, Table, Modal } from 'react-bootstrap';
import Select from 'react-select'
import "react-lazy-load-image-component/src/effects/blur.css";

export default function OrderItem({ info, data, setData }) {

  const options = [
    { value: "Preparing Food", label: "Preparing Food" },
    { value: "Delivering to Table", label: "Delivering to Table" },
    { value: "Completed", label: "Completed" }
  ]

  const createItemRows = function () {
    let counter = 0;
    return info.items.map(item => {
      return (
        <tr>
          <td>{counter++}</td>
          <td>{item.name}</td>
          <td>{item.amount}</td>
          <td>{data.getItemInfo(item.name).cost}</td>
        </tr>
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
      <Table>
        <tr>
          <td>Order: #{info.order}</td>
          <td>Table: #{info.table}</td>
        </tr>
        <tr>
          <td>Total: ${info.total}</td>
          <td>Server: {info.server}</td>
        </tr>
        <tr>
          <td>
            Status:
            <Select className="form_select" defaultValue={{ value: info.status, label: info.status }} options={options} onChange={(options) => onChangeOrderStatus(options.value)} />
          </td>
          <td>Order Time: {info.orderTime}</td>
        </tr>
        <tr>
          <td>Customer: {info.customer}</td>
        </tr>
      </Table>
      <Button variant="primary" onClick={viewItemsShow}>View Items</Button>
      <Button variant="secondary" onClick={cancelOrderShow}>Cancel Order</Button>
      <Modal show={viewItems} onHide={viewItemsClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order: #{info.order}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Table>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Amount</th>
              <th>Price</th>
            </tr>
            {createItemRows()}
          </Table>
        </Modal.Body>
        <Modal.Footer>
          Status: {info.status}
          Total: {info.total}
        </Modal.Footer>
      </Modal>

      <Modal
        show={cancelOrder}
        onHide={cancelOrderClose}
        centered
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Order: #{info.order}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you would like to cancel this order?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onCancelOrder}>Yes</Button>
          <Button variant="secondary" onClick={cancelOrderClose}>No </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}


