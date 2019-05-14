import { ADD_PERSON } from "./types";
import { CHANGE_NAME } from "./types";

export function addPerson(name) {
  return {
    type: ADD_PERSON,
    name
  }
}

export function updateName(index, newName) {
  return {
    type: CHANGE_NAME,
    index,
    newName
  }
}
