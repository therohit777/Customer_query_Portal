import React, { useEffect, useState } from 'react';
import "../Css/agentspanel.css";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Rooms from './Rooms';



const AgentsPanel = () => {
  const location = useLocation();
  const [rooms, setrooms] = useState([]);
  const [chatroomname, setchatroomname] = useState('');
  const agentname = new URLSearchParams(location.search).get('data');

  const fetchdata = ()=>{
    axios.get('/usermessages')
    .then(response => {
      // console.log(response.data);
      const a =[...new Set(response.data.map(item => item.customer_id))];
      setrooms(a);
      chatroomname(rooms[0]);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  useEffect(() => {
   fetchdata();
  }, [])
  

  return (
    <div className='AgentPanel'>
      <div className="agentmessagebox">
        <div className="customersPanel">
          <h2 className='List'>Customer List</h2>
          <div className="customerlist">
          {
            rooms.map((item,index)=>{
              return(
                <div key={index} className='customer_id' 
                   onClick={()=>{setchatroomname(item)}}
                > 
                  {item}
                </div>
              )
            })
          }
          </div>
        </div>
        
        <div className="messagePanel">
          <Rooms agents={agentname} room={chatroomname}/>
        </div>

      </div>
    </div>
  )
}

export default AgentsPanel