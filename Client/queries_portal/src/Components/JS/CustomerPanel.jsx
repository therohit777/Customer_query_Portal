import React, { useEffect, useState } from 'react';
import "../Css/customerpanel.css";
import send from "../images/send.png";
import  io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import axios from 'axios'


const socket = io("http://localhost:8000");



const CustomerPanel = () => {
  const [chats, setchats] = useState([]);
  const [message, setmessage] = useState('');
  const location = useLocation();
  const username = new URLSearchParams(location.search).get('data');
  const roomName = new URLSearchParams(location.search).get('room');
  

  const fetchdata = ()=>{
    axios.get('/usermessages')
    .then(response => {
      setchats(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  const messagesent = async(e)=>{
    e.preventDefault();
    socket.emit("chat",{room: roomName,message,username})
    setmessage('');
  }

  useEffect(() => {
    fetchdata();
  });


  return (
    <div className='CustomerPanel'>      
      <form className="querybox" onSubmit={messagesent}>
        <div className="messagebox">
          {
            chats.map((payload,index)=>{
              return(
                <div key={index} style={{width:'100%'}}>
                  { (payload.sender===username)?
                   <div style={{display:'flex',justifyContent:'flex-end',width:'100%'}}>
                     <div className='messagesent'>
                        <div className='username'>Customer name: {payload.sender}</div>
                        <div className='usermessage'>{payload.message}</div>
                     </div>
                   </div>
                   :

                   (payload.customer_id===roomName)?
                    <div style={{display:'flex',justifyContent:'flex-start',width:'100%'}}>
                      <div className='messagerecieve'>
                        <div className='useragent'>Agent name: {payload.sender}</div>
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