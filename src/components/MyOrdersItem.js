import React from "react";
import { Table } from 'react-bootstrap';
import "../styles/MyOrders.scss";
import "react-lazy-load-image-component/src/effects/blur.css";


export default function MyOrdersItem({ items, status }) {
    let total = 0;
    for (var i = 0; i < items.length; i++) {
        total += items[i].cost
    }
    return (
        <div className="order-item">
            <Table striped bordered>
                <tr>
                    <th>Item</th>
                    <th>Amount</th>
                    <th>Price</th>
                </tr>
                {
                    items.map((item) => {
                        return (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.num}</td>
                                <td>${item.cost.toFixed(2)}</td>
                            </tr>
                        )
                    })
                }
            </Table>
            <p className="item-listing">Total Cost: ${total.toFixed(2)}</p>
        </div>
    );
}
