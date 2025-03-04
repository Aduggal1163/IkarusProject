// src/components/Auth.js
import { useState } from "react";
import { signUp, logIn, logOut } from "../utils/authActions";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h2>Sign Up / Log In</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => signUp(email, password)}>Sign Up</button>
      <button onClick={() => logIn(email, password)}>Log In</button>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};

export default Auth;