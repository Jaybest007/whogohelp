import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OngoingErrands from './OngoingErrands';


const ErrandHistory = () => {
    
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect (() => {
    axios.get('https://whogohelp.free.nf/backend/errand_history.php?action=completed',{
      withCredentials: true
    })
    .then (response => {
      setData(response.data);
    })
    .catch(error => {
      setError("Could not load errand history.");
      console.error('Error:', error);
    });

  }, [])

  return (
    <div className="mt-4">
      <h3 className="text-md font-semibold text-orange-400 mb-2">Completed Errands</h3>
      <div className="space-y-2">
        {error && <div className="text-red-500">{error}</div>}
        {data.length === 0 && !error && (
          <div className="text-gray-400">No errands found.</div>
        )}
        {data.map((errand, idx) => (
          <div key={errand.errand_Id || idx} className="bg-gray-900 p-3 rounded-lg text-sm">
            <p className="text-white">📦 {errand.title} - {errand.reward}</p>
            <p className="text-gray-400 text-xs">{errand.status} • {errand.date}</p>
          </div>
        ))}
      </div>
    </div>


        

  );
};

export default ErrandHistory;