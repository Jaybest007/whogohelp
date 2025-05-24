import React from 'react';
import ErrandCard from '../components/ErrandCard';
import BottomNav from '../components/BottomNav';


const errands = [
  { id: 1, title: "Buy groceries", location: "Ikeja", reward: "₦500", status: "Pending" },
  { id: 2, title: "Pick up laundry", location: "Yaba", reward: "₦300" , status: "Pending" },
  { id: 3, title: "Pick up food", location: "Ikota", reward: "₦1,200", status: "Pending" },
];

const BrowseErrandsPage = () => {
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
        {errands.map(errand => (
          <ErrandCard key={errand.id} {...errand} />
        ))}
      </div>

      <BottomNav/>
    </div>
  );
};

export default BrowseErrandsPage;