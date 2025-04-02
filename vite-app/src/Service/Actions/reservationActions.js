import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

// 📌 Fetch Reservations
export const fetchReservations = () => async (dispatch) => {
  dispatch({ type: "FETCH_RESERVATIONS_REQUEST" });

  try {
    const querySnapshot = await getDocs(collection(db, "reservations"));
    const reservations = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    dispatch({ type: "FETCH_RESERVATIONS_SUCCESS", payload: reservations });
  } catch (error) {
    dispatch({ type: "FETCH_RESERVATIONS_FAILURE", payload: error.message });
  }
};

// 📌 Make Reservation
export const makeReservation = (reservationData) => async (dispatch) => {
  try {
    await addDoc(collection(db, "reservations"), reservationData);
    dispatch({ type: "MAKE_RESERVATION_SUCCESS" });
    dispatch(fetchReservations());  // Auto-refresh reservations list
  } catch (error) {
    dispatch({ type: "MAKE_RESERVATION_FAILURE", payload: error.message });
  }
};

export const updateReservation = (reservation) => async (dispatch) => {
  try {
    const reservationRef = doc(db, "reservations", reservation.id);
    await updateDoc(reservationRef, reservation);

    dispatch({ type: "UPDATE_RESERVATION", payload: reservation });
  } catch (error) {
    console.error("Error updating reservation:", error);
  }
};

// ✅ Action to cancel reservation
export const cancelReservation = (reservationId) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, "reservations", reservationId));

    dispatch({ type: "CANCEL_RESERVATION", payload: reservationId });
  } catch (error) {
    console.error("Error canceling reservation:", error);
  }
};
