import { primaryDetails } from "../state/detail.state";
import { officialDetails } from "../state/detail.state";
export const primaryReducer = (state = primaryDetails, action) => {
  switch (action.type) {
    case "PRIMARY_DETAILS":
      return {
        ...state,
        firstName: action.firstName,
        middleName: action.middleName,
        lastName: action.lastName,
        states: action.states,
        city: action.city,
      };

    default:
      // ADD_TO_CART
      return state;
  }
};
export const officialReducer = (state = officialDetails, action) => {
  switch (action.type) {
    case "OFFICIAL_DETAILS":
      return {
        ...state,
        orgName: action.orgName,
        experience: action.experience,
        salary: action.salary,
        age: action.age,
      };

    default:
      // ADD_TO_CART
      return state;
  }
};
