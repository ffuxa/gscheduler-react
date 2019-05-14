import { OPEN_SIDEBAR } from "./types";
import { CLOSE_SIDEBAR } from "./types";
import { SELECT_SIDEBAR_ITEM } from "./types";

export function toggleSidebar(isOpen) {
  return {
    type: isOpen ? OPEN_SIDEBAR : CLOSE_SIDEBAR,
  }
}

export function selectSidebarItem(selected) {
  return {
    type: SELECT_SIDEBAR_ITEM,
    selected
  }
}
