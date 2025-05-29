import React from 'react';

const ErrandDetailModal = ({ errand, onClose, onAccept, loading }) => {
  if (!errand) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-orange-400 p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl text-orange-500 font-bold mb-2">{errand?.title}</h2>
        <p className="text-sm text-white mb-2">Description: {errand?.description || "No description provided."}</p>
        <p className="text-sm text-gray-400">Location: {errand?.location}</p>
        <p className="text-sm text-gray-400">Reward: {errand?.reward }</p>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="text-white border border-gray-500 px-3 py-1 rounded hover:bg-gray-700">
            Cancel
          </button>
          <button
            onClick={onAccept}
            disabled={loading}
            className={`bg-orange-500 text-black px-4 py-1 rounded hover:bg-orange-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? "Accepting..." : "Accept"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrandDetailModal;