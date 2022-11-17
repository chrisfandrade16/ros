import { useState } from "react";
import Header from "./components/Header";
import Navigator from "./components/Navigatior";
import * as constants from "./utils/constants";
import { storage, flags } from "./utils/storage";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Staff from "./components/Staff";
import MyOrders from "./components/MyOrders";
import ParseJSON from "./utils/ParseJSON";
import AboutUs from "./components/AboutUs";
import "bootstrap/dist/css/bootstrap.css";

import StaffLogin from "./components/StaffLogin";
import StartScreen from "./components/StartScreen";
import OwnerPage from "components/OwnerPage";

const App = () => {
  const [currentPageTab, setCurrentPageTab] = useState(
    constants.PAGE_TABS.START_SCREEN
  );

  const [data, setData] = useState(new ParseJSON());

  return (
    <div className="ros tw-px-[40px] tw-py-[30px]">
      <Header setCurrentPageTab={setCurrentPageTab} />
      <Navigator
        tabs={constants.PAGE_TABS_CONFIG(setCurrentPageTab)}
        activeTab={currentPageTab}
        activeHighlightTab={true}
      />
      {currentPageTab === constants.PAGE_TABS.MENU ? (
        <Menu setCurrentPageTab={setCurrentPageTab} data={data} />
      ) : null}
      {currentPageTab === constants.PAGE_TABS.CART ? <Cart data={data} /> : ""}
      {currentPageTab === constants.PAGE_TABS.MY_ORDERS ? <MyOrders /> : ""}
      {currentPageTab === constants.PAGE_TABS.ABOUT_US ? <AboutUs /> : ""}
      {currentPageTab === constants.PAGE_TABS.STAFF_LOGIN ? (
        <StaffLogin setCurrentPageTab={setCurrentPageTab} />
      ) : null}
      {currentPageTab === constants.PAGE_TABS.VIEW_ORDERS ? (
        <Staff
          setCurrentPageTab={setCurrentPageTab}
          data={data}
          setData={setData}
        />
      ) : null}
      {currentPageTab === constants.PAGE_TABS.CHANGE_MENU ? (
        <OwnerPage />
      ) : null}
      {currentPageTab === constants.PAGE_TABS.START_SCREEN ? (
        <StartScreen setCurrentPageTab={setCurrentPageTab} />
      ) : null}
    </div>
  );
};

export default App;
