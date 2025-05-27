// src/pages/Dashboard.jsx

import React from 'react';
import WelcomeHeader from '../components/WelcomeHeader';
import ActionCards from '../components/ActionCards';
import OngoingErrands from '../components/OngoingErrands';
import ErrandHistory from '../components/ErrandHistory';
import PostErrand from '../components/PostErrand';
import BottomNav from '../components/BottomNav';
import { useState, useEffect } from 'react';

const Dashboard = () => {
    const [post, setPost] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between pb-20">
      <div className="p-4 space-y-6">
        
        <WelcomeHeader />
        <ActionCards post={post} setPost={setPost} />
        {post ? (<PostErrand/>) : (
            <>
            <OngoingErrands />
            <ErrandHistory />
            </>
        ) }
        
        
      </div>
      <BottomNav />
    </div>
  );
};

export default Dashboard;