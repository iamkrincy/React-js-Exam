import { ADD_HOTEL, GET_HOTELS, UPDATE_HOTEL, DELETE_HOTEL } from "../Actions/hotelAction";


const initialState = {
  hotels: [],
};

export const hotelReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_HOTEL:
      return { ...state, hotels: [...state.hotels, action.payload] };

    case GET_HOTELS:
      return { ...state, hotels: action.payload };

    case UPDATE_HOTEL:
      return {
        ...state,
        hotels: state.hotels.map(hotel =>
          hotel.id === action.payload.id ? action.payload : hotel
        ),
      };

    case DELETE_HOTEL:
      return {
        ...state,
        hotels: state.hotels.filter(hotel => hotel.id !== action.payload),
      };

    default:
      return state;
  }
};
