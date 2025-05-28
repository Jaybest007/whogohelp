import React from 'react';


const ErrandCard = ({ errand_Id, title, location, reward, status }) => {

  
  return (
    <div className="errand-card bg-gray-900 border border-orange-500 rounded-lg p-4 shadow-md hover:scale-[1.02] transition">
      <h3 className="text-xl font-semibold text-orange-400">{title}</h3>
      <p className="text-sm text-gray-300 mt-1">Location: <span className="font-medium">{location}</span></p>
      <div className="mt-3 text-sm text-gray-400 flex justify-between">
        <span className="font-semibold">{reward}</span>
        <span className="italic">#ID: {errand_Id}</span>
      </div>
      <p className='bg-amber-500 w-30 font-medium rounded p-1 text-sm text-black mt-1'>Status: {status}</p>
      <button
        className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold py-2 rounded cursor-pointer"
        onClick={() => console.log('Open detail modal or page')}
      >
        View Details
      </button>
    </div>
  );
};

export default ErrandCard;