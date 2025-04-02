// import { auth } from "../../firebaseConfig";
// import {
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";


// export const signinSuc = (user) => ({
//   type: "SIGNIN_SUCCESS",
//   payload: user,
// });

// const signupSuc = () => ({
//   type: "SIGNUP_SUCCESS",
// });

// const signinRej = (error) => ({
//   type: "SIGNIN_REJECT",
//   payload: error,
// });

// const logout = () => ({
//   type: "LOGOUT",
// });


// export const registerUserAsync = (data) => async (dispatch) => {
//   try {
//     const newUser = await createUserWithEmailAndPassword(auth, data.email, data.password);
//     dispatch(signupSuc());
//   } catch (error) {
//     console.error("Registration Error:", error);
//     dispatch(signinRej(error.message));
//   }
// };

// export const LoginUserAsync = (data) => async (dispatch) => {
//   try {
//     const loginUser = await signInWithEmailAndPassword(auth, data.email, data.password);
//     const user = {
//       displayName: loginUser.user.displayName,
//       email: loginUser.user.email,
//       id: loginUser.user.uid,
//     };

//     dispatch(signinSuc(user));
//   } catch (error) {
//     console.error("Login Error:", error);
//     dispatch(signinRej(error.message));
//   }
// };


// export const LoginWithGoogleAsync = () => async (dispatch) => {
//   try {
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider);
//     const user = {
//       displayName: result.user.displayName,
//       email: result.user.email,
//       id: result.user.uid,
//     };

//     dispatch(signinSuc(user)); 
//   } catch (error) {
//     console.error("Google Login Error:", error);
//     dispatch(signinRej(error.message));
//   }
// };

// export const logOutAsync = () => async (dispatch) => {
//   try {
//     await signOut(auth);
//     dispatch(logout());
//   } catch (error) {
//     console.error("Logout Error:", error);
//     dispatch(signinRej(error.message));
//   }
// };

// export const authCheckDone = () => ({
//   type: "AUTH_CHECK_DONE", 
// });

// export const checkAuthStateAsync = () => (dispatch) => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       const userData = {
//         displayName: user.displayName,
//         email: user.email,
//         id: user.uid,
//       };
//       dispatch(signinSuc(userData));
//     } else {
//       dispatch(logout());
//     }
//     dispatch(authCheckDone()); 
//   });
// };


import { auth, db } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Action Types
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_REJECT = "SIGNIN_REJECT";
export const LOGOUT = "LOGOUT";
export const AUTH_CHECK_DONE = "AUTH_CHECK_DONE";

// Action Creators
export const signinSuc = (user) => ({
  type: SIGNIN_SUCCESS,
  payload: user,
});

export const signinRej = (error) => ({
  type: SIGNIN_REJECT,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const LoginUserAsync = (data) => async (dispatch) => {
  try {
    const loginUser = await signInWithEmailAndPassword(auth, data.email, data.password);
    const user = loginUser.user;

    console.log("✅ User Authenticated, UID:", user.uid);

    // Firestore se role fetch karein
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.log("🚨 User data not found in Firestore for UID:", user.uid);
      dispatch(signinRej("User data not found in Firestore"));
      return;
    }

    let role = userSnap.data().role || "user";

    console.log("🔥 Firestore Role Fetched:", role);

    dispatch(signinSuc({ uid: user.uid, email: user.email, role }));
  } catch (error) {
    console.error("🚨 Login Error:", error.message);
    dispatch(signinRej(error.message));
  }
};


// 🔥 Logout Function
export const logOutAsync = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(logout());
  } catch (error) {
    console.error("Logout Error:", error);
    dispatch(signinRej(error.message));
  }
};

// 🔥 Check User Authentication & Role
export const checkAuthStateAsync = () => (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      let role = "user"; // Default role
      if (userSnap.exists()) {
        role = userSnap.data().role;
      }

      dispatch(signinSuc({ uid: user.uid, email: user.email, role }));
    } else {
      dispatch(logout());
    }
    dispatch({ type: AUTH_CHECK_DONE });
  });
};

export const LoginWithGoogleAsync = () => async (dispatch) => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = {
      displayName: result.user.displayName,
      email: result.user.email,
      id: result.user.uid,
    };
    dispatch(signinSuc(user));
  } catch (error) {
    console.error("Google Login Error:", error);
    dispatch(signinRej(error.message));
  }
};

export const registerUserAsync = (data) => async (dispatch) => {
  try {
    const newUser = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const user = newUser.user;

    // ✅ Firestore Me Authentication UID ke Sath Data Save Karo
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid, // Ye authentication UID hai
      email: user.email,
      role: data.role || "user", // Default role: user
    });

    console.log("🔥 User Registered & Saved in Firestore with UID:", user.uid);

  } catch (error) {
    console.error("🚨 Registration Error:", error.message);
  }
};
