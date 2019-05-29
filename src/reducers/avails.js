import {
  ADD_AVAIL
} from "../actions/types";

export const avails = (state = {
  avails: [],
}, action) => {
  switch (action.type) {
    case ADD_AVAIL:
      return {
        ...state,
        avails: [...state.avails, action.newAvail],
      };
    default:
      return state;
  }
};
