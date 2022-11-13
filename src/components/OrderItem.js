import React from "react";
import "../styles/Menu.scss";
import "react-lazy-load-image-component/src/effects/blur.css";

const viewItems = function () {

}

const cancelOrder = function () {

}

export default function OrderItem({ info }) {
  return (
    <div className="menu-item">
      <table border="1">
        <tr>
          <td>Order: #{info.order}</td>
          <td>Table: #{info.table}</td>
        </tr>
        <tr>
          <td>Total: ${info.total}</td>
          <td>Server: {info.server}</td>
        </tr>
        <tr>
          <td>Status: {info.status}</td>
          <td>Order Time: {info.orderTime}</td>
        </tr>
        <tr>
          <td>Customer: {info.customer}</td>
        </tr>
      </table>
      <button onClick={() => viewItems(true)}>View Items</button>
      <button onClick={() => cancelOrder(true)}>Cancel Order</button>
    </div>
  );
}


