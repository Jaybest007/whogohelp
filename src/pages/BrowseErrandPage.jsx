import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ErrandCard from '../components/ErrandCard';
import BottomNav from '../components/BottomNav';


const errands = [];

const BrowseErrandsPage = () => {

  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect( () => {
    axios.get("https://whogohelp.free.nf/backend/errand_history.php",{
      withCredentials: true
    })
    .then(response => {
      setData(response.data);
    })
    .catch(error =>{
      setError("Could not load errand history.");
      console.error('Error:', error);
    });
  },[]);

  const availableErrands = data.filter(errand => errand.status === "up for grabs");

  if (error){
    return <div className ="text-red-500">{error}</div>;
  }

  if (availableErrands.length > 0){
    return <div className ="text-red-500">No available order right now</div>;
  }


 
  return (
    <div className="browse-page bg-black text-white min-h-screen p-4 pb-14">
      <h2 className="text-2xl font-bold text-orange-500 my-6 py-10">Available Errands</h2>
      <div className="filter mb-3">
        <span className='mr-2'>Filter Errand by:</span>
        <select name="Filter Option" id="" className='bg-black text-white rounded border-1 border-orange-400 focus:bg-orange-200'>
            <option value="Location">Location</option>
            <option value="Community">Community-based filterin</option>
        </select>
      </div>
 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableErrands.map(errand => (
          <ErrandCard key={errand.errand_Id} {...errand} />
        ))}
      </div>

      <BottomNav/>
    </div>
  );
};

export default BrowseErrandsPage;