import React, {useState, useEffect, useRef} from "react";
import "./Chat.css";

function Chat(){
  const [input, setInput]= useState("");
  const [messages, setMessages]= useState([]);
  const [loading, setLoading]= useState(false);

  //ref to scroll chat to bottom
  const chatEndRef= useRef(null);

  //load previous chats when component loads
  useEffect(()=>{
    loadHistory();
  }, []);

  //scroll to bottom whenever messages change
  useEffect(()=>{
    chatEndRef.current?.scrollIntoView({behavior:"smooth"});
  }, [messages, loading]);

  const loadHistory= async ()=>{
    try{
      const token= localStorage.getItem("token");

      //if no token just return
      if(!token) return;

      const res= await fetch("http://localhost:5001/api/chat/history",{
        headers:{
          "Authorization": "Bearer " + token
        }
      });

      //if token is expired or invalid
      if(res.status === 401){
        localStorage.removeItem("token");
        window.location.reload();
        return;
      }

      const data= await res.json();

      //convert old chats to message format
      const oldMessages= [];
      data.chats.forEach(chat=>{
        oldMessages.push({text: chat.userMessage, sender:"user"});
        oldMessages.push({text: chat.botReply, sender:"bot"});
      });

      setMessages(oldMessages);
    }catch(error){
      console.log("could not load history", error);
    }
  };

  const handleSend= async (e)=>{
    e.preventDefault();
    if(!input.trim()) return;

    const userMessage= {text: input, sender:"user"};
    setMessages(prev=> [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try{
      const token= localStorage.getItem("token");

      const res= await fetch("http://localhost:5001/api/chat",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({message: input})
      });

      //handle expired token
      if(res.status === 401){
        localStorage.removeItem("token");
        window.location.reload();
        return;
      }

      const data= await res.json();

      const botMessage= {text: data.reply, sender:"bot"};
      setMessages(prev=> [...prev, botMessage]);
    }catch(error){
      console.log(error);
      setMessages(prev=> [...prev, {text:"Error getting reply", sender:"bot"}]);
    }

    setLoading(false);
  };

  return(
    <div className="chat-container">
      <h2>Priva-Sync Chat</h2>
      <div className="chat-box">
        {messages.length === 0 && (
          <p className="empty-msg">No messages yet. Say hello!</p>
        )}
        {messages.map((msg, index)=>(
          <div key={index} className={`chat-message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        {loading && <p className="loading">Bot is typing...</p>}
        {/*scroll anchor*/}
        <div ref={chatEndRef}></div>
      </div>
      <form onSubmit={handleSend} className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e)=> setInput(e.target.value)}
        />
        <button type="submit" disabled={loading}>Send</button>
      </form>
    </div>
  );
}

export default Chat;
