import {
  ADD_GROUP,
  START_ADDING_GROUP,
  CANCEL_ADDING_GROUP,
  DELETE_GROUP,
  DELETE_MEMBER_FROM_GROUP,
  ADD_MEMBER_TO_GROUP
} from "../actions/types";

export const group = (state = {
  groups: [],
  addingGroup: false,
}, action) => {
  switch (action.type) {
    case ADD_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.newGroup],
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
      return {
        ...state,
        groups: state.groups.filter((_, i) => i !== action.index),
      };
    case DELETE_MEMBER_FROM_GROUP:
      return {
        ...state,
        groups: state.groups.map(
          (group, i) => i === action.group_index ? {
            ...group, members: group.members.filter((_, j) => j !== action.member_index)
          } : group
        ),
      };
    case ADD_MEMBER_TO_GROUP:
      return {
        ...state,
        groups: state.groups.map(
          (group, i) => i === action.group_index ? {
            ...group, members: [...group.members, action.newMember]
          } : group
        ),
      };
    default:
      return state;
  }
};
