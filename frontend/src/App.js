import React, {useState} from "react";
import Login from "./Login";
import Signup from "./Signup";
import Chat from "./Chat";

function App(){
  const [page, setPage]= useState("login"); // login | signup | chat

  const handleLogin= ()=> setPage("chat");
  const handleSignup = ()=> setPage("chat");

  const handleLogout=()=>{
    localStorage.removeItem("token");
    setPage("login");
  };

  return(
    <div>
      {page === "chat" && (
        <div style={{textAlign:"right", padding:"10px"}}>
          <button onClick={handleLogout} style={{
            padding:"6px 14px",
            background:"#dc3545",
            color:"white",
            border:"none",
            borderRadius:"5px",
            cursor:"pointer"
          }}>Logout</button>
        </div>
      )}

      {page === "login" && (
        <div>
          <Login onLogin={handleLogin} />
          <p style={{textAlign:"center"}}>
            No account?{" "}
            <span
              onClick={()=> setPage("signup")}
              style={{color:"blue", cursor:"pointer"}}
            >Sign up</span>
          </p>
        </div>
      )}

      {page === "signup" && (
        <div>
          <Signup onSignup={handleSignup} />
          <p style={{textAlign:"center"}}>
            Already have an account?{" "}
            <span
              onClick={()=> setPage("login")}
              style={{color:"blue", cursor:"pointer"}}
            >Login</span>
          </p>
        </div>
      )}

      {page === "chat" && <Chat />}
    </div>
  );
}

export default App;
