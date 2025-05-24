// src/components/ErrandHistory.jsx

import React from 'react';

const ErrandHistory = () => {
  return (
    <div className="mt-4">
      <h3 className="text-md font-semibold text-orange-400 mb-2">Recent Errands</h3>
      <div className="space-y-2">
        <div className="bg-gray-900 p-3 rounded-lg text-sm">
          <p className="text-white">🧺 Bought groceries - ₦2,000</p>
          <p className="text-gray-400 text-xs">Completed • Yesterday</p>
        </div>
        <div className="bg-gray-900 p-3 rounded-lg text-sm">
          <p className="text-white">💊 Picked up drugs - ₦1,500</p>
          <p className="text-gray-400 text-xs">Completed • 2 days ago</p>
        </div>
        <div className="bg-gray-900 p-3 rounded-lg text-sm">
          <p className="text-white">🍘 Picked up Garri - ₦1,500</p>
          <p className="text-gray-400 text-xs">Completed • 5 days ago</p>
        </div>
      </div>
    </div>
  );
};

export default ErrandHistory;