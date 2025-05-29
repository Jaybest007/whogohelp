import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ErrandCard from '../components/ErrandCard';
import BottomNav from '../components/BottomNav';

const BrowseErrandsPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const fetchErrands = () => {
    axios.get("https://whogohelp.free.nf/backend/errand_history.php?action=global_pending",{
      withCredentials: true
    })
    .then(response => {
      setData(response.data);
    })
    .catch(error =>{
      setError("Could not load errand history.");
      console.error('Error:', error);
    });
  }

  useEffect(() => {
    fetchErrands();
  }, []);

  return (
    <div className="browse-page bg-black text-white min-h-screen p-4 pb-14">
      <h2 className="text-2xl font-bold text-orange-500 my-6 py-10">Available Errands</h2>
      <div className="filter mb-3">
        <span className='mr-2'>Filter Errand by:</span>
        <select name="Filter Option" id="" className='bg-black text-white rounded border-1 border-orange-400 focus:bg-orange-200'>
            <option value="Location">Location</option>
            <option value="Community">Community-based filtering</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.length === 0 && !error && (
          <div className="text-gray-400">No errands found.</div>
        )}
        {data.map(errand => (
          <ErrandCard 
            key={errand.errand_Id}
            errand_Id={errand.errand_Id}
            title={errand.title}
            location={errand.location}
            reward={errand.reward}
            status={errand.status}
            description={errand.description}
          />
        ))}
      </div>
      <BottomNav/>
    </div>
  );
};

export default BrowseErrandsPage;