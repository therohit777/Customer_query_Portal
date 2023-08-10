import React, { useRef } from 'react';
import { useNavigate }from 'react-router-dom';

const AgentsLogin = () => {
  const navigate = useNavigate();

  const Aid = useRef("");
  const Aname = useRef("");

  const AgentLogin = (a,b) =>{
    if(b.current.value!=="" && a.current.value!==""){
      console.log("Agents panel");
      navigate('/agentPanel');
    }
    else{
      console.log("Bad credentials");
    }
  }

  return (
    <div className='loginsubbox'> 
        <h2 className='loginHeader'>Agents Login</h2>
        <input type="text" className='logintxt' placeholder='agents name' ref={Aname}/>
        <button className='loginbtn' onClick={()=>{AgentLogin(Aname,Aid)}}>Login</button>
    </div>
  )
}

export default AgentsLogin