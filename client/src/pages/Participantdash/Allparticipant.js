import React, { useState } from 'react';
import { Info, Pencil, Trash2 } from 'lucide-react'; 
import useParticipantsAuth from '../../hooks/useParticipantsAuth ';
// import useParticipantsAuth from '../../hooks/useParticipantsAuth';

const PageSizeOptions = [5, 10, 15,25,30,35,40];

const Allparticipant = () => {
  const { participants, loading } = useParticipantsAuth();

  const [pageSize, setPageSize] = useState(PageSizeOptions[0]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedParticipants = participants.slice(start, end);

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setPage(1);
  };

  const handlePageChange = (e) => {
    setPage(parseInt(e.target.value));
  };

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">All Participants</h2>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verified</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {paginatedParticipants.map((participant) => (
                <tr key={participant._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{participant.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{participant.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{participant.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {participant.isVerified ? 'Yes' : 'No'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex space-x-2">
                      <button className="p-1 hover:bg-blue-100 rounded-full">
                        <Info className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-1 hover:bg-green-100 rounded-full">
                        <Pencil className="w-4 h-4 text-green-600" />
                      </button>
                      <button className="p-1 hover:bg-red-100 rounded-full">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 flex items-center justify-between">
          <div className="flex space-x-2">
            <span className="text-sm text-gray-700">Show</span>
            <select className="p-1 bg-white border border-gray-300 rounded-md" value={pageSize} onChange={handlePageSizeChange}>
              {PageSizeOptions.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            <span className="text-sm text-gray-700">entries</span>
          </div>
          <div className="flex space-x-2">
            <button className="p-1 hover:bg-gray-100 rounded-full" onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous
            </button>
            <button className="p-1 hover:bg-gray-100 rounded-full" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allparticipant;

