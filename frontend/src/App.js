import React, {useState} from "react";
import Login from "./Login";
import Chat from "./Chat";

function App(){
  const [isLoggedIn, setIsLoggedIn]= useState(false);

  return(
    <div>
      {isLoggedIn ? <Chat /> : <Login onLogin={()=> setIsLoggedIn(true)} />}
    </div>
  );
}

export default App;
