// const initialState = {
//     user: null,
//     isCreated: false,
//     error: null,
//     isUpdate: false,
//     isLoading: true, 
//   };
  
//   export const userReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case "SIGNUP_SUCCESS":
//         return {
//           ...state,
//           isCreated: true,
//         };
  
//       case "SIGNUP_REJECT":
//         return {
//           ...state,
//           isCreated: false,
//           error: action.payload,
//         };
  
//       case "SIGNIN_SUCCESS":
//         return {
//           ...state,
//           user: action.payload,
//           isLoading: false, 
//         };
  
//       case "SIGNIN_REJECT":
//         return {
//           ...state,
//           error: action.payload,
//           isLoading: false, 
//         };
  
//       case "LOGOUT":
//         return {
//           ...state,
//           user: null,
//           isLoading: false, 
//         };
  
//       case "AUTH_CHECK_DONE": 
//         return {
//           ...state,
//           isLoading: false,
//         };
  
//       default:
//         return state;
//     }
//   };
  

const initialState = {
  user: null,
  error: null,
  isLoading: true, 
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNIN_SUCCESS":
  return {
    ...state,
    user: {
      ...action.payload,
      role: action.payload.role || "user", // ✅ Role Set Karna Zaroori Hai
    },
    isLoading: false,
  };


    case "SIGNIN_REJECT":
      return {
        ...state,
        error: action.payload,
        isLoading: false, 
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isLoading: false, 
      };

    case "AUTH_CHECK_DONE":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
