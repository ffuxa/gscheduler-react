import {
  ADD_GROUP,
  ADD_GROUP_ERROR,
  START_ADDING_GROUP,
  CANCEL_ADDING_GROUP,
  DELETE_GROUP,
  DELETE_GROUP_ERROR,
  DELETE_MEMBER_FROM_GROUP,
  DELETE_MEMBER_FROM_GROUP_ERROR,
  ADD_MEMBER_TO_GROUP,
  ADD_MEMBER_TO_GROUP_ERROR,
} from "./types";

export function addGroup(newGroup) {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const timestamp = new Date();

    try {
      await firestore.collection('groups').add({
        ...newGroup,
        createdAt: timestamp,
        updatedAt: timestamp
      });

      dispatch({ type: ADD_GROUP, newGroup });
    }
    catch (error) {
      dispatch({ type: ADD_GROUP_ERROR, newGroup, error });
    }
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

export function deleteGroup(group) {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    try {
      await firestore.collection('groups').doc(group.id).delete();
      dispatch({ type: DELETE_GROUP, group });
    }
    catch (error) {
      dispatch({ type: DELETE_GROUP_ERROR, group, error });
    }
  }
}

export function deleteMemberFromGroup(member, group) {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    try {
      await firestore.collection('groups').doc(group.id).update({
        members: firestore.FieldValue.arrayRemove(member)
      });

      dispatch({ type: DELETE_MEMBER_FROM_GROUP, member, group });
    }
    catch (error) {
      dispatch({ type: DELETE_MEMBER_FROM_GROUP_ERROR, member, group, error });
    }
  }
}

export function addMemberToGroup(newMember, group) {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    try {
      await firestore.collection('groups').doc(group.id).update({
        members: firestore.FieldValue.arrayUnion(newMember)
      });

      dispatch({ type: ADD_MEMBER_TO_GROUP, newMember, group });
    }
    catch (error) {
      dispatch({ type: ADD_MEMBER_TO_GROUP_ERROR, newMember, group, error });
    }
  }
}