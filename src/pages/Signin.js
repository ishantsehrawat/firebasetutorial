import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, provider, db } from "../firebase-config";

function Signin() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});
  const userRef = collection(db, "users");

  const createUser = async (user, authprovider) => {
    await setDoc(doc(userRef, user.email), {
      name: user?.displayName,
      phone: user?.phoneNumber,
      photo: user?.photoURL,
      email: user.email,
      uid: user.uid,
      authprovider: authprovider,
    });
  };

  // User Registration
  const userRegistration = async () => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      const user = res.user;
      setUser(user);
      localStorage.setItem("token", JSON.stringify(user.accessToken));
      console.log(auth.currentUser);
      createUser(user, "local");
    } catch (err) {
      console.log(err.message);
    }
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setUser(auth.currentUser);
      localStorage.setItem(
        "token",
        JSON.stringify(auth.currentUser.accessToken)
      );
      console.log(auth.currentUser);
    } catch (err) {
      console.log(err.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, provider);
      const res = await getDocs(
        query(collection(db, "users"), where("email", "==", user.user.email))
      );
      setUser(user);
      localStorage.setItem("token", JSON.stringify(user.user.accessToken));
      console.log(auth.currentUser);
      if (res.empty) {
        createUser(user.user, user.providerId);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const logout = async () => {
    await signOut(auth)
      .then(() => {
        console.log("sign out successful");
        setUser({});
        localStorage.removeItem("token");
      })
      .catch((err) => console.log(err));
  };
  console.log(auth.currentUser);

  return (
    <div className="App">
      <div>
        <h3> Register User </h3>
        <input
          placeholder="Email..."
          value={registerEmail}
          onChange={(event) => setRegisterEmail(event.target.value)}
        />
        <input
          placeholder="Password..."
          value={registerPassword}
          onChange={(event) => setRegisterPassword(event.target.value)}
        />

        <button onClick={userRegistration}> Create User</button>
      </div>

      <div>
        <h3> Login </h3>
        <input
          placeholder="Email..."
          value={loginEmail}
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          value={loginPassword}
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />

        <button onClick={signIn}> Login</button>
      </div>

      <button onClick={signInWithGoogle}>Sign in with Google</button>

      <h4> User Logged In: </h4>
      {user?.email}

      <button onClick={logout}> Sign Out </button>
    </div>
  );
}

export default Signin;
