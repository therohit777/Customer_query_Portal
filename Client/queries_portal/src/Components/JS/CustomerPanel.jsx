import React, { useEffect, useState } from 'react';
import "../Css/customerpanel.css";
import send from "../images/send.png";
import  io from 'socket.io-client';
import { useLocation } from 'react-router-dom';



const socket = io("http://localhost:8000");



const CustomerPanel = () => {
  const [chats, setchats] = useState([]);
  const [message, setmessage] = useState('');
  const location = useLocation();
  const username = new URLSearchParams(location.search).get('data');
  const roomName = new URLSearchParams(location.search).get('room');
  console.log(roomName);

  const messagesent = (e)=>{
    e.preventDefault();
    socket.emit("chat",{room: roomName,message,username})
    setmessage('');
  }

  useEffect(() => {
    socket.on("chat",(payload)=>{
      setchats([...chats,payload]);
    });
  })
  
  return (
    <div className='CustomerPanel'>      
      <form className="querybox" onSubmit={messagesent}>
        <div className="messagebox">
          {
            chats.map((payload,index)=>{
              return(
                <div key={index} style={{width:'100%'}}>
                  { (payload.username===username)?
                   <div style={{display:'flex',justifyContent:'flex-end',width:'100%'}}>
                     <div className='messagesent'>
                        <div className='username'>Customer name: {payload.username}</div>
                        <div className='usermessage'>{payload.message}</div>
                     </div>
                   </div>
                   :

                   (payload.room===roomName)?
                    <div style={{display:'flex',justifyContent:'flex-start',width:'100%'}}>
                      <div className='messagerecieve'>
                        <div className='useragent'>Agent name: {payload.username}</div>
                        <div className='agentmessage '>{payload.message}</div>
                      </div>
                    </div>
                   :
                   <></>
                  }
                  

                </div>
              )
            })
          }
        </div>
        <div className="typemessage">
          <input type="text" name="chat" placeholder='How can we assist you today?' className='messageinput' value={message}  onChange={(e)=>{setmessage(e.target.value)}}/>
          <button type="submit" className='sendbtn'><img src={send} alt="none" width={"25px"}/></button>
        </div>
      </form>
    </div>
  )
}

export default CustomerPanel