import { storage, flags } from "./storage";

export const EMPTY_FUNCTION = () => {};
export const EMPTY_STRING = "";

export const PAGE_TABS = {
  MENU: 0,
  CART: 1,
  MY_ORDERS: 2,
  ABOUT_US: 3,
  STAFF_LOGIN: 4,
  VIEW_ORDERS: 5,
  CHANGE_MENU: 6,
  START_SCREEN: 7,
};

export const PAGE_TABS_CONFIG = (setCurrentPageTab) => {
  return [
    {
      text: "Menu",
      onClick: () => {
        setCurrentPageTab(PAGE_TABS.MENU);
      },
      getIsDisabled: () => {
        return !flags.isSignedIn;
      },
    },
    {
      text: "Cart",
      onClick: () => {
        setCurrentPageTab(PAGE_TABS.CART);
      },
      getIsDisabled: () => {
        return !flags.isSignedIn;
      },
    },
    {
      text: "My Orders",
      onClick: () => {
        setCurrentPageTab(PAGE_TABS.MY_ORDERS);
      },
      getIsDisabled: () => {
        return !flags.isSignedIn;
      },
    },
    {
      text: "About Us",
      onClick: () => {
        setCurrentPageTab(PAGE_TABS.ABOUT_US);
      },
      getIsDisabled: () => {
        return !flags.isSignedIn;
      },
    },
  ];
};

export const OWNER_PAGE_TABS = {
  MENU_ITEMS: 0,
  CONTACT_INFO: 1,
  ACCOUNT: 2,
};

export const OWNER_PAGE_TABS_CONFIGS = (setCurrentPageTab) => {
  return [
    {
      text: "Menu Items",
      onClick: () => {
        setCurrentPageTab(OWNER_PAGE_TABS.MENU_ITEMS);
      },
      getIsDisabled: () => {
        return false;
      },
    },
    {
      text: "Contact Info",
      onClick: () => {
        setCurrentPageTab(OWNER_PAGE_TABS.CONTACT_INFO);
      },
      getIsDisabled: () => {
        return false;
      },
    },
    {
      text: "Account",
      onClick: () => {
        setCurrentPageTab(OWNER_PAGE_TABS.ACCOUNT);
      },
      getIsDisabled: () => {
        return false;
      },
    },
  ];
};
