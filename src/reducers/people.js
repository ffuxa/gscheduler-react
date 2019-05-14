import { ADD_PERSON, CHANGE_NAME } from "../actions/types";

export const people = (state = {
  people: [],
}, action) => {
  switch (action.type) {
    case ADD_PERSON:
      return {
        ...state,
        people: [...state.people, { name: action.name }],
      };
    case CHANGE_NAME:
      return {
        ...state,
        people: state.people.map(
          (person, i) => i === action.index ? {...person, name: action.newName}
            : person
        ),
      };
    default:
      return state;
  }
};
