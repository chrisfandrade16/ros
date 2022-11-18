import * as constants from "./constants";

export const storage = {
  currentCustomerName: "",
  currentCustomerTable: "",
  currentRestaurant: "McPizza_North_Hamilton",
  restaurants: {
    McPizza_North_Hamilton: {
      restaurantName: "McPizza",
      restaurantOwner: {
        username: "John",
        password: "Johnny",
        firstName: "John",
        lastName: "King",
        phone: "844-310-3300",
        address: "1016 King Street West, Hamilton, Ontario, L8S 1L4",
      },
      restaurantEmployees: [
        {
          username: "Bob",
          password: "Bobbie",
        },
        {
          username: "Joe",
          password: "Biden",
        },
      ],
      restaurantMenu: {},
    },
  },
};

export const flags = {
  isCustomerSignedIn: false,
  isEmployeeSignedIn: false,
};
