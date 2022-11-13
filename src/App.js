import { useState } from "react";
import Header from "./components/header";
import Navigator from "./components/navigatior";
import * as constants from "./utils/constants";
import { storage, flags } from "./utils/storage";
import Menu from "./components/Menu";
import StaffLogin from "./components/StaffLogin";
import StartScreen from "./components/StartScreen";

const App = () => {
  const [currentPageTab, setCurrentPageTab] = useState(
    constants.PAGE_TABS.START_SCREEN
  );

  return (
    <div className="ros">
      <Header setCurrentPageTab={setCurrentPageTab} />
      <Navigator
        tabs={constants.PAGE_TABS_CONFIG(setCurrentPageTab)}
        activeTab={currentPageTab}
        activeTabStyle="highlight-tab"
        height="small-tab-height"
      />
      {currentPageTab == constants.PAGE_TABS.MENU ? (
        <Menu setCurrentPageTab={setCurrentPageTab} />
      ) : (
        ""
      )}
      {currentPageTab == constants.PAGE_TABS.CART
        ? "Put cart page component here"
        : ""}
      {currentPageTab == constants.PAGE_TABS.MY_ORDERS
        ? "Put my orders page component here"
        : ""}
      {currentPageTab == constants.PAGE_TABS.ABOUT_US
        ? "Put about us page component here"
        : ""}
      {currentPageTab == constants.PAGE_TABS.STAFF_LOGIN
        ? (<StaffLogin setCurrentPageTab={setCurrentPageTab} />)
        : ""}
      {currentPageTab == constants.PAGE_TABS.VIEW_ORDERS
        ? "Put view orders page component here"
        : ""}
      {currentPageTab == constants.PAGE_TABS.CHANGE_MENU
        ? "Put change menu page component here"
        : ""}
      {currentPageTab == constants.PAGE_TABS.START_SCREEN
        ? <StartScreen setCurrentPageTab={setCurrentPageTab} />
        : ""}
    </div>
  );
};

export default App;
