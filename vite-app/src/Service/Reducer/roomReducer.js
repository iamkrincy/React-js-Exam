const initialState = {
  rooms: [],
  loading: false,
  error: null,
  filteredRooms: [],
  sortOption: "",
  filterOption: "",
};

export const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ROOMS_REQUEST":
      return { ...state, loading: true };
    case "ROOMS_SUCCESS":
      return { ...state, loading: false, rooms: action.payload };
    case "ROOMS_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "ADD_ROOM_REQUEST":
      return { ...state, loading: true };
    case "ADD_ROOM_SUCCESS":
      return { ...state, loading: false, rooms: [...state.rooms, action.payload] };
    case "ADD_ROOM_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "DELETE_ROOM_REQUEST":
      return { ...state, loading: true };
    case "DELETE_ROOM_SUCCESS":
      return { 
        ...state, 
        loading: false, 
        rooms: state.rooms.filter(room => room.id !== action.payload) 
      };
    case "DELETE_ROOM_FAILURE":
      return { ...state, loading: false, error: action.payload };

      case "ROOM_FETCH_SUCCESS":
      return { ...state, currentRoom: action.payload, loading: false };
      
    case "ROOM_FETCH_ERROR":
      return { ...state, error: action.payload, loading: false };

      case "SET_SORT_OPTION":
        return { ...state, sortOption: action.payload };
        
      case "SET_FILTER_OPTION":
        return { ...state, filterOption: action.payload };
  
      case "FETCH_ROOMS_SUCCESS":
        return { ...state, rooms: action.payload, filteredRooms: action.payload };
        
    default:
      return state;
  }
};
