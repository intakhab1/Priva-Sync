import React, {useState} from "react";
import "./Login.css";

function Login(){
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [message, setMessage]= useState("");

  const handleLogin= (e)=>{
    e.preventDefault();
    //will connect to backend later
    console.log("Login clicked", email, password);
    setMessage("Login button clicked!");
  };

  return(
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Login;
