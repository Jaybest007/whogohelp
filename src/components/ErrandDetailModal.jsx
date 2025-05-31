import React from 'react';
import { Link } from 'react-router-dom';

const ErrandDetailModal = ({ errand, onClose, onAccept, onCompleted, loading }) => {
  if (!errand) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-orange-400 p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl text-orange-500 font-bold mb-2">{errand.title}</h2>
        <p className="text-sm text-white mb-2">Description: {errand.description}</p>
        <p className="text-sm text-gray-400">Pick-up: {errand.pick_up_location}</p>
        <p className="text-sm text-gray-400">Drop-off: {errand.drop_off_location}</p>
        <p className="text-sm text-gray-400">Reward: {errand.reward}</p>
        {errand.created_by && (
          <Link to="/profile">
            <p className="text-sm text-gray-400">Created by: {errand.created_by}</p>
          </Link>
        )}
        {errand.posted_by && (
          <Link to="/profile">
            <p className="text-sm text-gray-400">Posted by: {errand.posted_by}</p>
          </Link>
        )}
        <div className="mt-4 flex justify-end gap-2">
          
          {errand.status === "pending" && (
            <button
              onClick={onAccept}
              disabled={loading}
              className={`bg-orange-500 text-black px-4 py-1 rounded hover:bg-orange-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? "Accepting..." : "Accept"}
            </button>
          )}
          {errand.status === "progress" && (
            <button
              onClick={onCompleted}
              disabled={loading}
              className={`text-white border border-lime-400 px-3 py-1 rounded hover:bg-lime-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? "Completing..." : "Complete Errand"}
            </button>
          )}
          <button
            onClick={onClose}
            className="text-white border border-gray-500 px-3 py-1 rounded hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrandDetailModal;