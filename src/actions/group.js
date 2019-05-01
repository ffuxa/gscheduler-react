import { ADD_GROUP } from "./types";

export function addGroup(newGroup) {
  return {
    type: ADD_GROUP,
    newGroup
  }
}
