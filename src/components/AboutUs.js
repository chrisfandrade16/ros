import "../styles/AboutUs.scss";
import chef from "../images/chef.jpg";
import waitress from "../images/waitress.jpg";
import restaurant from "../images/restaurant.jpg";
export default function AboutUs() {

    return (
        <div className="about-us-container">
            <div className="text-container">
                <h1 className="about-us-heading">About Us</h1>
                <p className="about-us-text">It’s a simple equation that keeps our customers coming back for more. Always fresh toppings and great service plus low, low prices equals great pizza. Here at McPizza, we strive to give our customers the best. We’re one of the few family-owned companies left that still truly care about our customers.
                    Our customers can count on prompt and quality service, high-quality food made from high-quality products with the freshest ingredients available and great prices. Whether
                    you’re looking to feed your family or have a great meal with friends, feeding a large group is both easy and affordable at McPizza.
                    In business since 1989, The McPizza is a fast food restaurant offering delivery and take-out food service, and also a high-tech web ordering system. </p>
                <div className="horizontal-section">
                    <div className="vertical-section">
                        <h1 className="about-us-heading">Location</h1>
                        <p className="about-us-text">123 Main Street West, Hamilton ON, L3R OB2 </p>
                    </div>
                    <div className="vertical-section">
                        <h1 className="about-us-heading">Contact Us</h1>
                        <a className="about-us-text" id="contact" title="Click to send us an email!">
                            Email: mcpizzasupport@gmail.com
                        </a>
                        <a className="about-us-text" id="contact" title="Click to call our number">
                            Phone: 123-456-7890
                        </a>
                    </div>
                </div>
                <img className="image-b" src={restaurant} title="Click to view the restaurant location on Google Maps!"></img>
            </div>
            <div className="images-container">
                <img className="image" src={chef}></img>
                <img className="image" src={waitress}></img>
            </div>
        </div >
    );
}