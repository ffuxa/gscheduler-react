import { combineReducers } from "redux";

import { availability } from "./availability";
import { group } from "./group";
import { sidebar } from "./sidebar";
import { people } from "./people";

export default combineReducers({
  availability,
  group,
  sidebar,
  people
});
