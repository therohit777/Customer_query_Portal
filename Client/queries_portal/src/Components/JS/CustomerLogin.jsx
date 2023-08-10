import React, { useRef } from 'react';
import { useNavigate }from 'react-router-dom';




const CustomerLogin = () => {
  const navigate = useNavigate();
  const Cid = useRef("");
  const Cname = useRef("");

  const CustomerLogin = (a,b) =>{
    if(b.current.value!=="" && a.current.value!==""){
      console.log("Customers panel");
      navigate(`/customerPanel?data=${a.current.value} &room=${b.current.value}`);
    }
    else{
      console.log("Bad credentials");
    }
  }

  return (
    <div className='loginsubbox'>
        <h2 className='loginHeader'>Customers Login</h2>
        <input type="text" className='logintxt' placeholder='customers name' ref={Cname}/>
        <input type="text"className='logintxt' placeholder='room id' ref={Cid}/>
        <button className='loginbtn' onClick={()=>{CustomerLogin(Cname,Cid)}}>Login</button>
    </div>
  )
}

export default CustomerLogin