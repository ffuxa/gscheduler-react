import {
  ADD_GROUP,
  START_ADDING_GROUP,
  CANCEL_ADDING_GROUP,
  DELETE_GROUP,
  DELETE_MEMBER_FROM_GROUP,
  ADD_MEMBER_TO_GROUP
} from "./types";

export function addGroup(newGroup) {
  return {
    type: ADD_GROUP,
    newGroup
  }
}

export function startAddingGroup() {
  return {
    type: START_ADDING_GROUP,
  }
}

export function cancelAddingGroup() {
  return {
    type: CANCEL_ADDING_GROUP,
  }
}

export function deleteGroup(index) {
  return {
    type: DELETE_GROUP,
    index
  }
}

export function deleteMemberFromGroup(member_index, group_index) {
  return {
    type: DELETE_MEMBER_FROM_GROUP,
    member_index,
    group_index
  }
}

export function addMemberToGroup(newMember, group_index) {
  return {
    type: ADD_MEMBER_TO_GROUP,
    newMember,
    group_index
  }
}