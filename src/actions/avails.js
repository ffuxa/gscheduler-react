import {
  ADD_AVAIL,
} from "./types";

export function addAvail(newAvail) {
  return {
    type: ADD_AVAIL,
    newAvail
  }
}