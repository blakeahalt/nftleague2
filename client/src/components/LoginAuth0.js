import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from 'react'
import { Link } from 'react-router-dom'

const AuthLoginButton = () => {
  
  const { loginWithRedirect } = useAuth0();
    return (
      <button onClick={() => loginWithRedirect()}>
      </button>
    )
  }
  
export default AuthLoginButton;