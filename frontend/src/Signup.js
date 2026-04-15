import React, {useState} from "react";
import "./Login.css";

function Signup({onSignup}){
  const [name, setName]= useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [message, setMessage]= useState("");

  const handleSignup= async (e)=>{
    e.preventDefault();
    try{
      const res= await fetch("http://localhost:5001/api/auth/signup",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({name, email, password})
      });
      const data= await res.json();

      if(res.ok){
        localStorage.setItem("token", data.token);
        setMessage("Account created!");
        onSignup();
      }else{
        setMessage(data.message || "Signup failed");
      }
    }catch(error){
      console.log(error);
      setMessage("Server error");
    }
  };

  return(
    <div className="login-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e)=> setName(e.target.value)}
          required
        />
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
        <button type="submit">Sign Up</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Signup;
