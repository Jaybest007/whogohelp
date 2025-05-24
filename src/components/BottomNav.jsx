// src/components/BottomNav.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPlusCircle, FaUser, FaGlobe } from 'react-icons/fa';

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white flex justify-around items-center h-16 border-t border-gray-700">
      <Link to="/dashboard"><FaHome className="text-orange-400 text-xl" /></Link>
      <Link to="/errands"><FaGlobe className="text-orange-400 text-xl" /></Link>
      <FaPlusCircle className="text-orange-400 text-2xl" />
      <Link to="/profile"><FaUser className="text-orange-400 text-xl" /></Link>
    </div>
  );
};

export default BottomNav;