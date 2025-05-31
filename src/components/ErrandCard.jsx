import React, { useState } from 'react';
import ErrandDetailModal from './ErrandDetailModal.jsx';
import axios from 'axios';

const ErrandCard = ({
  errand_Id,
  title,
  pick_up_location,
  drop_off_location,
  description,
  reward,
  status,
  refreshList
}) => {
  const [selectedErrands, setSelectedErrands] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://whogohelp.free.nf/backend/errand_history.php', {
        params: {
          action: 'status_progress',
          errand_Id: errand_Id
        }
      });
      if (response.data && response.data.success) {
        setCurrentStatus('progress');
        refreshList();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setSelectedErrands(null);
    }
  };

  return (
    <div className="errand-card bg-gray-900 border border-orange-500 rounded-lg p-4 shadow-md hover:scale-[1.02] transition">
      <h3 className="text-xl font-semibold text-orange-400">{title}</h3>
      <p className="text-sm text-gray-300 mt-1">
        Location: <span className="font-medium">{pick_up_location} → {drop_off_location}</span>
      </p>
      <div className="mt-3 text-sm text-gray-400 flex justify-between">
        <span className="font-semibold">{reward}</span>
        <span className="italic">#ID: {errand_Id}</span>
      </div>
      <p className='bg-amber-500 w-32 font-medium rounded p-1 text-sm text-black mt-1'>Status: {currentStatus}</p>
      <button
        className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold py-2 rounded cursor-pointer"
        onClick={() => setSelectedErrands({
          errand_Id,
          title,
          pick_up_location,
          drop_off_location,
          description,
          reward,
          status: currentStatus
        })}
      >
        View Details
      </button>
      <ErrandDetailModal 
        errand={selectedErrands} 
        onClose={() => setSelectedErrands(null)} 
        onAccept={handleAccept}
        loading={loading}
      />
    </div>
  );
};

export default ErrandCard;