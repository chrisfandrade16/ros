import "../styles/MyOrders.scss";
import MyOrdersItem from "./MyOrdersItem";
import { DropdownButton, Dropdown } from 'react-bootstrap';

export default function ViewOrder() {

    const items =
        [{
            "name": "Large Pepperoni Pizza",
            "cost": 15.12,
            "num": 1
        },
        {
            "name": "Medium Hawaiian Pizza",
            "cost": 10.63,
            "num": 1
        },
        {
            "name": "Chicken Tenders",
            "cost": 8.33,
            "num": 1
        },
        {
            "name": "Cheese Burger",
            "cost": 5.70,
            "num": 2
        },
        {
            "name": "Pancake",
            "cost": 14.25,
            "num": 5
        },
        {
            "name": "Chocolate Cake",
            "cost": 2.85,
            "num": 1
        },
        {
            "name": "Fries",
            "cost": 9.98,
            "num": 2
        },
        {
            "name": "Red Soup",
            "cost": 7.41,
            "num": 1
        }
        ]

    return (
        <div className="view-orders">
            <h1 className="title-header">My Orders</h1>
            <div className="view-order-container">
                <h1 className="status-heading">Cooking</h1>
                <Dropdown>
                    <Dropdown.Toggle className="dropdown-toggle" title="Click to see detailed Information about your order!">
                        Order #224: 3 items, $34.08
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <MyOrdersItem items={[items[0], items[1], items[2]]} status="Cooking"></MyOrdersItem>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle className="dropdown-toggle" title="Click to see detailed Information about your order!">
                        Order #225: 2 items, $5.70
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <MyOrdersItem items={[items[3]]} status="Cooking"></MyOrdersItem>
                    </Dropdown.Menu>
                </Dropdown>

            </div>
            <div className="view-order-container">
                <h1 className="status-heading">Serving</h1>
                <Dropdown>
                    <Dropdown.Toggle className="dropdown-toggle" title="Click to see detailed Information about your order!">
                        Order #223: 6 items, $17.10
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <MyOrdersItem items={[items[4], items[5]]} status="Serving"></MyOrdersItem>
                    </Dropdown.Menu>
                </Dropdown>

            </div>
            <div className="view-order-container">
                <h1 className="status-heading">Completed</h1>
                <Dropdown>
                    <Dropdown.Toggle className="dropdown-toggle" title="Click to see detailed Information about your order!">
                        Order #222: 3 items, $17.39
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <MyOrdersItem items={[items[6], items[7]]} status="Completed"></MyOrdersItem>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div >
    );
}
