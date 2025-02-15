import React from "react";
import "./Login.css";
import { Button } from "@mui/material";
import WhatsAppLogo from "./WhatsApp.svg";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
  const [{},dispatch]=useStateValue();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type:actionTypes.SET_USER,
          user:result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img src={WhatsAppLogo} alt="" />
        <div className="login__text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
}

export default Login;
