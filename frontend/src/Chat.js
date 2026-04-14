import React, {useState} from "react";
import "./Chat.css";

function Chat(){
  const [input, setInput]= useState("");
  const [messages, setMessages]= useState([]);

  const handleSend= (e)=>{
    e.preventDefault();
    if(!input.trim()) return;

    //add user message to chat
    setMessages([...messages, {text: input, sender:"user"}]);
    setInput("");

    //will connect to backend later
  };

  return(
    <div className="chat-container">
      <h2>Chat</h2>
      <div className="chat-box">
        {messages.map((msg, index)=>(
          <div key={index} className={`chat-message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e)=> setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
