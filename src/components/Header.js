import { storage, flags } from "utils/storage";
import pizza_logo from "images/image_pizza_logo.png";

const Header = (props) => {
  return (
    <div className="tw-flex tw-flex-row tw-justify-between tw-my-[20px] tw-mx-[30px]">
      {flags.isSignedIn ? (
        <>
          <div className="tw-flex tw-flex-col tw-justify-center">
            <div className="tw-text-sm">{storage.customerName}</div>
            <div className="tw-text-sm">#{storage.customerTable}</div>
          </div>
        </>
      ) : null}
      <div className="tw-flex tw-flex-row tw-items-center">
        <div className="tw-text-5xl">{storage.restaurantName}</div>
        <img className="tw-w-[64px] tw-h-[64px]" src={pizza_logo} />
      </div>
      <button></button>
    </div>
  );
};

export default Header;
