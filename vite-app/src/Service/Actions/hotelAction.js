import { db } from "../../firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";

// Action Types
export const ADD_HOTEL = "ADD_HOTEL";
export const GET_HOTELS = "GET_HOTELS";
export const UPDATE_HOTEL = "UPDATE_HOTEL";
export const DELETE_HOTEL = "DELETE_HOTEL";

// 🏨 Add Hotel Action
export const addHotelAsync = (hotelData) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, "hotels"), hotelData);
    dispatch({ type: ADD_HOTEL, payload: { id: docRef.id, ...hotelData } });
  } catch (error) {
    console.error("Error adding hotel: ", error);
  }
};

// 🏠 Get Hotels Action
export const getHotelsAsync = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, "hotels"));
    const hotelsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    dispatch({ type: GET_HOTELS, payload: hotelsList });
  } catch (error) {
    console.error("Error fetching hotels: ", error);
  }
};

export const getHotelByIdAsync = async (id) => {
    const hotelRef = doc(db, "hotels", id);
    const hotelSnap = await getDoc(hotelRef);
    if (hotelSnap.exists()) {
      return { id: hotelSnap.id, ...hotelSnap.data() };
    } else {
      return null;
    }
  };
  
  export const updateHotelAsync = (id, updatedData) => async (dispatch) => {
    const hotelRef = doc(db, "hotels", id);
    await updateDoc(hotelRef, updatedData);
    dispatch(getHotelsAsync()); // Update ke baad latest list fetch karo
  };

// ❌ Delete Hotel Action
export const deleteHotelAsync = (hotelId) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, "hotels", hotelId));
    dispatch({ type: DELETE_HOTEL, payload: hotelId });
  } catch (error) {
    console.error("Error deleting hotel: ", error);
  }
};
