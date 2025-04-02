import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { signinSuc, signinRej } from "../../Service/Actions/authActions";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists() && userSnap.data().isAdmin) {
        dispatch(signinSuc({ ...userSnap.data(), id: user.uid }));
        navigate("/admin");
      } else {
        setError("Access denied! You are not an admin.");
      }
    } catch (error) {
      setError(error.message);
      dispatch(signinRej(error.message));
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
