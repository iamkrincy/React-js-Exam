import { db } from "../../firebaseConfig";
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc } from "firebase/firestore";

export const fetchRooms = () => async (dispatch) => {
  try {
    dispatch({ type: "ROOMS_REQUEST" });
    const querySnapshot = await getDocs(collection(db, "rooms"));
    const rooms = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    dispatch({ type: "ROOMS_SUCCESS", payload: rooms });
  } catch (error) {
    dispatch({ type: "ROOMS_FAILURE", payload: error.message });
  }
};

// // 📌 Add Room Action (Without Redux Toolkit)
// export const addRoom = (roomData) => async (dispatch) => {
//   try {
//     dispatch({ type: "ADD_ROOM_REQUEST" });
//     const docRef = await addDoc(collection(db, "rooms"), roomData);
//     dispatch({ type: "ADD_ROOM_SUCCESS", payload: { id: docRef.id, ...roomData } });
//   } catch (error) {
//     dispatch({ type: "ADD_ROOM_FAILURE", payload: error.message });
//   }
// };

// // 📌 Delete Room Action (Without Redux Toolkit)
// export const deleteRoom = (roomId) => async (dispatch) => {
//   try {
//     dispatch({ type: "DELETE_ROOM_REQUEST" });
//     await deleteDoc(doc(db, "rooms", roomId));
//     dispatch({ type: "DELETE_ROOM_SUCCESS", payload: roomId });
//   } catch (error) {
//     dispatch({ type: "DELETE_ROOM_FAILURE", payload: error.message });
//   }
// };

export const addRoomAsync = (roomData) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_ROOM_REQUEST" });

    // Firebase me room add karna
    const docRef = await addDoc(collection(db, "rooms"), roomData);

    dispatch({ type: "ADD_ROOM_SUCCESS", payload: { id: docRef.id, ...roomData } });
  } catch (error) {
    dispatch({ type: "ADD_ROOM_FAILURE", payload: error.message });
  }
};

export const deleteRoomAsync = (roomId) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_ROOM_REQUEST" });

    // Firebase se room delete karna
    await deleteDoc(doc(db, "rooms", roomId));

    dispatch({ type: "DELETE_ROOM_SUCCESS", payload: roomId });
  } catch (error) {
    dispatch({ type: "DELETE_ROOM_FAILURE", payload: error.message });
  }
};

export const editRoomAsync = (roomId, updatedData) => async (dispatch) => {
  try {
    dispatch({ type: "EDIT_ROOM_REQUEST" });

    // Firebase me room update karna
    const roomRef = doc(db, "rooms", roomId);
    await updateDoc(roomRef, updatedData);

    dispatch({ type: "EDIT_ROOM_SUCCESS", payload: { roomId, updatedData } });
  } catch (error) {
    dispatch({ type: "EDIT_ROOM_FAILURE", payload: error.message });
  }
};

export const fetchRoomById = (roomId) => async (dispatch, getState) => {
  try {
    const roomRef = doc(db, "rooms", roomId);
    const roomSnap = await getDoc(roomRef);

    if (roomSnap.exists()) {
      dispatch({ type: "ROOM_FETCH_SUCCESS", payload: roomSnap.data() });
    } else {
      dispatch({ type: "ROOM_FETCH_ERROR", payload: "Room not found" });
    }
  } catch (error) {
    dispatch({ type: "ROOM_FETCH_ERROR", payload: error.message });
  }
};

export const setSortOption = (option) => ({
  type: "SET_SORT_OPTION",
  payload: option,
});

export const setFilterOption = (option) => ({
  type: "SET_FILTER_OPTION",
  payload: option,
});
