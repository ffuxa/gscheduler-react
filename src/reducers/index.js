import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from 'react-redux-firebase';

import { availability } from "./availability";
import { avails } from "./avails";
import { group } from "./group";
import { sidebar } from "./sidebar";
import { people } from "./people";

export default combineReducers({
  availability,
  avails,
  group,
  sidebar,
  people,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});
