// src/components/OngoingErrands.jsx

import React from 'react';

const OngoingErrands = () => {
  return (
    <div>
      <h3 className="text-md font-semibold text-orange-400 mb-2">Ongoing Errands</h3>
      <div className="bg-gray-800 p-3 rounded-lg text-sm">
        <p className="font-semibold text-white">🛵 Deliver package to Mike</p>
        <p className="text-gray-400">Ajah → Lekki • In Progress</p>
      </div>
    </div>
  );
};

export default OngoingErrands;