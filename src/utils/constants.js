import { storage } from "./storage";

export const EMPTY_FUNCTION = () => {};

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
    },
    {
      text: "Cart",
      onClick: () => {
        setCurrentPageTab(PAGE_TABS.CART);
      },
    },
    {
      text: "My Orders",
      onClick: () => {
        setCurrentPageTab(PAGE_TABS.MY_ORDERS);
      },
    },
    {
      text: "About Us",
      onClick: () => {
        setCurrentPageTab(PAGE_TABS.ABOUT_US);
      },
    },
    {
      text: "Staff Login",
      onClick: () => {
        setCurrentPageTab(PAGE_TABS.STAFF_LOGIN);
      },
    },
  ];
};
