import {
  ADD_PERSON, ADD_PERSON_ERROR,
  CHANGE_PERSON_NAME, CHANGE_PERSON_NAME_ERROR
} from "./types";

export function addPerson(name) {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const timestamp = new Date();

    try {
      await firestore.collection('people').add({
        name,
        createdAt: timestamp,
        updatedAt: timestamp
      });

      dispatch({ type: ADD_PERSON, name });
    }
    catch (error) {
      dispatch({ type: ADD_PERSON_ERROR, error });
    }
  }
}

export function updatePersonName(index, newName, person) {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    try {
      await firestore.collection('people').doc(person.id).update({
        name: newName,
        updatedAt: new Date()
      });

      dispatch({ type: CHANGE_PERSON_NAME, index, newName });
    }
    catch (error) {
      dispatch({ type: CHANGE_PERSON_NAME_ERROR, person, newName, error });
    }
  }
}
