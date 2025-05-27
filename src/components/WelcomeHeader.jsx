// src/components/WelcomeHeader.jsx

import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeHeader = () => {

  const [userInfo, setUserInfo] = useState(null)
  const navigate = useNavigate();

  useEffect(()=> {
    fetch("https://whogohelp.free.nf/backend/user_session.php", {
      credentials: "include",
    })
    .then(res => res.json().catch(()=> ({})))
    .then(data => {
      if(data.loggedIn){
        setUserInfo(data.userInfo);
      } else{
        navigate("/login")
      }
    })
    .catch(err => {
      console.error("Session check failed", err)
    });
  }, []);
  
  return (
    <div className="text-left py-15">
      <h2 className="text-4xl text-orange-400 font-semibold">
        {userInfo ? `Hey, ${userInfo.username}` : "Loading session..."}
      </h2>
      <p className="text-sm text-gray-300">Ready to run or get help with an errand?</p>
    </div>
  );
};

export default WelcomeHeader;