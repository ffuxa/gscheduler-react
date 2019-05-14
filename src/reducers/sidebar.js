import { OPEN_SIDEBAR } from "../actions/types";
import { CLOSE_SIDEBAR } from "../actions/types";
import { SELECT_SIDEBAR_ITEM } from "../actions/types";

export const sidebar = (state = {
  selected: "people",
  isOpen: false
}, action) => {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return {
        ...state,
        isOpen: true,
      };
    case CLOSE_SIDEBAR:
      return {
        ...state,
        isOpen: false,
      };
    case SELECT_SIDEBAR_ITEM:
      return {
        ...state,
        selected: action.selected,
      };
    default:
      return state;
  }
};
