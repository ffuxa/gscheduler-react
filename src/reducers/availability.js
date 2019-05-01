import {
  FETCHING_AVAILABILITY, FETCH_AVAILABILITY_SUCCESS, FETCH_AVAILABILITY_FAILURE
} from "../actions/types";

export const availability = (state = {
  loading: false,
  students: [],
  error: false,
}, action) => {
  switch (action.type) {
    case FETCHING_AVAILABILITY:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_AVAILABILITY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        students: action.students,
      };
    case FETCH_AVAILABILITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
