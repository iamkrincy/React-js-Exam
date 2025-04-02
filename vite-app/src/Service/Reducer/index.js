import { combineReducers } from "redux";
import { userReducer } from "./authReducer";
import { roomReducer } from './roomReducer';
import { hotelReducer } from "./hotelReducer";
import { reservationReducer } from "./reservationReducer";

export const rootReducer = combineReducers(
    {
        roomReducer,
       userReducer,
        reservationReducer,
       hotelReducer
    }
)