import React, { useRef } from 'react';
import { useNavigate }from 'react-router-dom';

const AgentsLogin = () => {
  const navigate = useNavigate();

  const Aname = useRef("");

  const AgentLogin = (a) =>{
    if( a.current.value!==""){
      console.log("Agents panel");
      navigate(`/agentPanel?data=${a.current.value}`);
    }
    else{
      console.log("Bad credentials");
    }
  }

  return (
    <div className='loginsubbox'> 
        <h2 className='loginHeader'>Agents Login</h2>
        <input type="text" className='logintxt' placeholder='agents name' ref={Aname}/>
        <button className='loginbtn' onClick={()=>{AgentLogin(Aname)}}>Login</button>
    </div>
  )
}

export default AgentsLogin