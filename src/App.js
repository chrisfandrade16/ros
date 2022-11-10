import { useState } from "react"
import Header from "./components/header"
import Navigator from "./components/navigatior"
import * as constants from "./utils/constants"
import { storage, flags } from "./utils/storage"

const App = () => {
    const [currentPageTab, setCurrentPageTab] = useState(constants.PAGE_TABS.MENU)

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
            {currentPageTab == constants.PAGE_TABS.MENU ? "Put menu page component here" : ""}
            {currentPageTab == constants.PAGE_TABS.CART ? "Put cart page component here" : ""}
            {currentPageTab == constants.PAGE_TABS.MY_ORDERS ? "Put my orders page component here" : ""}
            {currentPageTab == constants.PAGE_TABS.ABOUT_US ? "Put about us page component here" : ""}
            {currentPageTab == constants.PAGE_TABS.STAFF_LOGIN ? "Put staff login page component here" : ""}
        </div>
    )
}

export default App
