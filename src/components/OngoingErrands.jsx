// src/components/OngoingErrands.jsx

import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const OngoingErrands = () => {

  const [data, setData] = useState([])
  const [error, setError] = useState("");

  
  useEffect (() => {
      axios.get('https://whogohelp.free.nf/backend/errand_history.php',{
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

    //filter errands with status "on the move"
    const ongoingErrands = data.filter(errand => errand.status === "on the move");

    if (error){
      return <div className ="text-red-500">{error}</div>;
    }
    if(ongoingErrands.length === 0){
      return <div className ="text-red-500">You have no ongoing order</div>;
    }
  
  return (
    <div>
      <h3 className="text-md font-semibold text-orange-400 mb-2">Ongoing Errands</h3>
      {ongoingErrands.map((errand, index) => (
        <div key={errand.errand_Id || index} className="bg-gray-800 p-3 rounded-lg text-sm">
          <p className="font-semibold text-white">🛵 {errand.title}</p>
          <p className="text-gray-400">{errand.location} → Lekki • {errand.status}</p>
        </div>
      ))}
    </div>
  );
};

export default OngoingErrands;