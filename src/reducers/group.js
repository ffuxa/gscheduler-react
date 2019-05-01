import { ADD_GROUP } from "../actions/types";

export const group = (state = {
  groups: [],
}, action) => {
  switch (action.type) {
    case ADD_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.newGroup],
      };
    default:
      return state;
  }
};
