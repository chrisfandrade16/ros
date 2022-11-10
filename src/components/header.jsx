import { storage, flags } from "../utils/storage"
import pizza_logo from "../images/image_pizza_logo.png"

const Header = (props) => {
    return (
        <div className="row spaced header">
            {flags.isSignedIn ? 
            <>
                <div className="column justify-center">
                    <div className="small-text">{storage.customerName}</div>
                    <div className="small-text">#{storage.customerTable}</div>
                </div>
            </> : null}
            <div className="row align-center">
                <div className="big-text">{storage.restaurantName}</div>
                <img className="big-icon" src={pizza_logo}/>
            </div>
            <button></button>
        </div>
    )
};

export default Header;
