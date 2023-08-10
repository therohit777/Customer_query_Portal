import React, { useState } from "react";
import "../Css/loginportal.css";
import CustomerLogin from "./CustomerLogin";
import AgentsLogin from "./AgentsLogin";

const LoginPortal = () => {
  const [customer, setcustomer] = useState(true);
  return (
    <div className="Login">
      <div className="loginBox">
        {customer ? <CustomerLogin /> : <AgentsLogin />}
        <div className="panelchanger">
          <button
            className="loginbtn"
            onClick={() => {
              setcustomer(true);
            }}
          >
            customer Login
          </button>

          <button
            className="loginbtn"
            onClick={() => {
              setcustomer(false);
            }}
          >
            Agents Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPortal;
