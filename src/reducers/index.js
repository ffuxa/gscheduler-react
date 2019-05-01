import { combineReducers } from "redux";

import { availability } from "./availability";
import { group } from "./group";

export default combineReducers({
  availability,
  group
});
