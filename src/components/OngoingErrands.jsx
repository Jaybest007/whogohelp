// src/components/OngoingErrands.jsx

import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ErrandDetailModal from './ErrandDetailModal';

const OngoingErrands = () => {

  const [data, setData] = useState([])
  const [error, setError] = useState("");
  const [selectedErrand, setSelectedErrand] = useState(null);
  const [loading, setLoading] = useState(false);

  
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

  const handleCompleted = async (errand_Id) => {
    setLoading(true);
    try {
      const response = await axios.get('https://whogohelp.free.nf/backend/errand_history.php?action=status_completed', {
        withCredentials: true,
        params: {
          errand_Id: errand_Id
        }
      });
      if (response.data && response.data.success) {
        // Optionally, refetch or filter out the completed errand
        setData(prevData => prevData.filter(e => e.errand_Id !== errand_Id));
        setSelectedErrand(null);
      }
    } catch (err) {
      setError("Could not complete the order");
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }

  
  return (
    <div>
      <h3 className="text-md font-semibold text-orange-400 mb-2">Ongoing Errands</h3>
      {data.length === 0 && !error && (
          <div className="text-gray-400">No errands found.</div>
        )}
      {data.map((errand, index) => (
        <div 
        key={errand.errand_Id || index} 
        className="bg-gray-800 p-3 rounded-lg text-sm mb-2"
        onClick={() => setSelectedErrand(errand)}
        >
          <p className="font-semibold text-white">📦 {errand.title}</p>
          <p className="text-gray-400">{errand.location} → Lekki • {errand.status}</p>
        </div>
      ))}
      <ErrandDetailModal 
        errand={selectedErrand}
        onClose={() => setSelectedErrand(null)}
        onCompleted={handleCompleted}
      />
    </div>
  );
};

export default OngoingErrands;