import React, {useState} from "react";
import "./Login.css";

function Login(){
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [message, setMessage]= useState("");

  const handleLogin= async (e)=>{
    e.preventDefault();
    try{
      const res= await fetch("http://localhost:5000/api/auth/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({email, password})
      });
      const data= await res.json();

      if(res.ok){
        //save token
        localStorage.setItem("token", data.token);
        setMessage("Login successful!");
      }else{
        setMessage(data.message || "Login failed");
      }
    }catch(error){
      console.log(error);
      setMessage("Server error");
    }
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
