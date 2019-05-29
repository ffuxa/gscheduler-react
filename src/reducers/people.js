import {
  ADD_PERSON,
  ADD_PERSON_ERROR,
  CHANGE_PERSON_NAME,
  CHANGE_PERSON_NAME_ERROR,
} from "../actions/types";

export const people = (state = {}, action) => {
  switch (action.type) {
    case ADD_PERSON:
      console.log("Successfully added person to database");
      return state;
    case ADD_PERSON_ERROR:
      console.log("ERROR adding new person. Error details: ", action.error);
      return state;
    case CHANGE_PERSON_NAME:
      console.log("Successfully changed person's name in database");
      return state;
    case CHANGE_PERSON_NAME_ERROR:
      console.log(`ERROR changing ${action.person.name}'s name to ${action.newName}`, action.error);
      return state;
    default:
      return state;
  }
};
