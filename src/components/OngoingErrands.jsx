// src/components/OngoingErrands.jsx

import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const OngoingErrands = () => {

  const [data, setData] = useState([])
  const [error, setError] = useState("");

  
  useEffect (() => {
      axios.get('https://whogohelp.free.nf/backend/errand_history.php?action=progress',{
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
    <div>
      <h3 className="text-md font-semibold text-orange-400 mb-2">Ongoing Errands</h3>
      {data.length === 0 && !error && (
          <div className="text-gray-400">No errands found.</div>
        )}
      {data.map((errand, index) => (
        <div key={errand.errand_Id || index} className="bg-gray-800 p-3 rounded-lg text-sm pb-2">
          <p className="font-semibold text-white">📦 {errand.title}</p>
          <p className="text-gray-400">{errand.location} → Lekki • {errand.status}</p>
        </div>
      ))}
    </div>
  );
};

export default OngoingErrands;