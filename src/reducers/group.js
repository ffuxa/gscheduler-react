import {
  ADD_GROUP,
  START_ADDING_GROUP,
  CANCEL_ADDING_GROUP,
  DELETE_GROUP,
  DELETE_GROUP_ERROR,
  DELETE_MEMBER_FROM_GROUP,
  DELETE_MEMBER_FROM_GROUP_ERROR,
  ADD_MEMBER_TO_GROUP,
  ADD_MEMBER_TO_GROUP_ERROR
} from "../actions/types";

export const group = (state = {
  groups: [],
  addingGroup: false,
}, action) => {
  switch (action.type) {
    case ADD_GROUP:
      console.log("Successfully added group to database");
      return {
        ...state,
        addingGroup: false,
      };
    case START_ADDING_GROUP:
      return {
        ...state,
        addingGroup: true,
      };
    case CANCEL_ADDING_GROUP:
      return {
        ...state,
        addingGroup: false,
      };
    case DELETE_GROUP:
      console.log("Successfully deleted group from database");
      return state;
    case DELETE_GROUP_ERROR:
      console.log("Error deleting group from database. ERROR message: ", action.error);
      return state;
    case DELETE_MEMBER_FROM_GROUP:
      console.log("Successfully deleted member from group in database");
      return state;
    case DELETE_MEMBER_FROM_GROUP_ERROR:
      console.log("ERROR deleting member from group in database. ERROR message: ", action.error);
      return state;
    case ADD_MEMBER_TO_GROUP:
      console.log("Successfully added member to group in database");
      return state;
    case ADD_MEMBER_TO_GROUP_ERROR:
      console.log("ERROR adding member to group in database. ERROR message: ", action.error);
      return state;
    default:
      return state;
  }
};
