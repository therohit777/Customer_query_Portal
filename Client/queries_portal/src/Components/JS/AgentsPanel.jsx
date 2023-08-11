import React, { useEffect, useState } from 'react';
import "../Css/agentspanel.css";
import  io from 'socket.io-client';
import { useLocation } from 'react-router-dom';




const AgentsPanel = () => {
  const location = useLocation();
  const agentname = new URLSearchParams(location.search).get('data');



  return (
    <div className='AgentPanel'>
      <div className="agentmessagebox">
        <div className="customersPanel"></div>
        <div className="messagePanel"></div>
      </div>
    </div>
  )
}

export default AgentsPanel