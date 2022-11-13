import { useState } from "react";
import Header from "./components/header";
import Navigator from "./components/navigatior";
import * as constants from "./utils/constants";
import { storage, flags } from "./utils/storage";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Staff from "./components/Staff";
import 'bootstrap/dist/css/bootstrap.css'


const App = () => {
  const [currentPageTab, setCurrentPageTab] = useState(
    constants.PAGE_TABS.MENU
  );

  return (
    <div className="ros">
      <Header />
      {flags.isSignedIn ? (
        <Navigator
          tabs={constants.PAGE_TABS_CONFIG(setCurrentPageTab)}
          activeTab={currentPageTab}
          activeTabStyle="highlight-tab"
          height="small-tab-height"
        />
      ) : null}
      {currentPageTab == constants.PAGE_TABS.MENU ? <Menu /> : ""}
      {currentPageTab == constants.PAGE_TABS.CART? <Cart /> : ""}
      {currentPageTab == constants.PAGE_TABS.MENU ? (
        <Menu setCurrentPageTab={setCurrentPageTab} />
      ) : (
        ""
      )}
      {/* {currentPageTab == constants.PAGE_TABS.CART
        ? "Put cart page component here"
        : ""} */}
      {currentPageTab == constants.PAGE_TABS.MY_ORDERS
        ? "Put my orders page component here"
        : ""}
      {currentPageTab == constants.PAGE_TABS.ABOUT_US
        ? "Put about us page component here"
        : ""}
      {currentPageTab == constants.PAGE_TABS.STAFF_LOGIN
        ? <Staff />
        : ""}
    </div>
  );
};

export default App;
