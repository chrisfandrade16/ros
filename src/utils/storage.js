import * as constants from "./constants";

export const storage = {
  currentCustomerName: "",
  currentCustomerTable: "",
  currentRestaurant: "McPizza_North_Hamilton",
  restaurants: {
    McPizza_North_Hamilton: {
      restaurantName: "McPizza",
      restaurantOwner: {
        username: "john",
        password: "johnny",
        aboutUs: "It’s a simple equation that keeps our customers coming back for more. Always fresh toppings and great service plus low, low prices equals great pizza. Here at McPizza, we strive to give our customers the best. We’re one of the few family-owned companies left that still truly care about our customers. Our customers can count on prompt and quality service, high-quality food made from high-quality products with the freshest ingredients available and great prices. Whether you’re looking to feed your family or have a great meal with friends, feeding a large group is both easy and affordable at McPizza. In business since 1989, McPizza is a fast food restaurant offering delivery and take-out food service, and also a high-tech web ordering system.",
        location: "123 Main Street West, Hamilton ON, L3R OB2",
        email: "mcpizzasupport@gmail.com",
        phone: "123-456-7890"
      },
      restaurantEmployees: [
        {
          username: "bob",
          password: "bobbie",
        },
        {
          username: "joe",
          password: "biden",
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
