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
            <h1 className="title-header">My Orders (Sorted by Status)</h1>
            <div className="view-order-container">
                <h1 className="status-heading">Preparing Food</h1>
                <Dropdown>
                    <Dropdown.Toggle className="dropdown-toggle">
                        Order #224
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <MyOrdersItem items={[items[0], items[1], items[2]]} status="Preparing Food"></MyOrdersItem>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle className="dropdown-toggle">
                        Order #225
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <MyOrdersItem items={[items[3]]} status="Preparing Food"></MyOrdersItem>
                    </Dropdown.Menu>
                </Dropdown>

            </div>
            <div className="view-order-container">
                <h1 className="status-heading">Delivering to Table</h1>
                <Dropdown>
                    <Dropdown.Toggle className="dropdown-toggle">
                        Order #223
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <MyOrdersItem items={[items[4], items[5]]} status="Delivering to Table"></MyOrdersItem>
                    </Dropdown.Menu>
                </Dropdown>

            </div>
            <div className="view-order-container">
                <h1 className="status-heading">Completed</h1>
                <Dropdown>
                    <Dropdown.Toggle className="dropdown-toggle">
                        Order #222
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <MyOrdersItem items={[items[6], items[7]]} status="Completed"></MyOrdersItem>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div >
    );
}
