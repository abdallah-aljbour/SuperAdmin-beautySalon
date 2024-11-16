import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

function SalonOwners() {
  const [salonOwners, setSalonOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ownersPerPage] = useState(2);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOwner, setSelectedOwner] = useState(null);

  useEffect(() => {
    const fetchSalonOwners = async () => {
      try {
        const response = await api.get('/salon-owners');
        setSalonOwners(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching salon owners:', err);
      }
    };

    fetchSalonOwners();
  }, []);

  // Filter salon owners based on search term
  const filteredOwners = salonOwners.filter(owner =>
    owner.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.salonName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current salon owners
  const indexOfLastOwner = currentPage * ownersPerPage;
  const indexOfFirstOwner = indexOfLastOwner - ownersPerPage;
  const currentOwners = filteredOwners.slice(indexOfFirstOwner, indexOfLastOwner);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center p-6 bg-red-50 rounded-lg">
      <div className="text-red-500 text-xl">Error: {error}</div>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Salon Owner Management</h2>
        <p className="text-gray-600">View and manage all salon owners in the system</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-2xl font-bold text-blue-600">{salonOwners.length}</div>
          <div className="text-gray-600">Total Salon Owners</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-2xl font-bold text-green-600">
            {salonOwners.filter(owner => owner.role === 'admin').length}
          </div>
          <div className="text-gray-600">Active Owners</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-2xl font-bold text-purple-600">
            {new Set(salonOwners.map(owner => owner.salonName)).size}
          </div>
          <div className="text-gray-600">Unique Salons</div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by owner or salon name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg 
              className="h-5 w-5 text-gray-400" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Salon Owners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentOwners.map((owner) => (
          <div 
            key={owner._id}
            className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            onClick={() => setSelectedOwner(owner)}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600">
                    {owner.username[0].toUpperCase()}
                  </span>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-800">{owner.username}</h3>
                  <p className="text-gray-600">{owner.email}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>{owner.salonName}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Joined {new Date(owner.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span>
                <button 
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add view details functionality
                  }}
                >
                  View Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredOwners.length === 0 && (
        <div className="text-center bg-gray-50 rounded-lg p-8">
          <div className="text-gray-500 text-lg">No salon owners found matching "{searchTerm}"</div>
        </div>
      )}

      {/* Pagination */}
      {filteredOwners.length > 0 && (
        <div className="mt-8 flex justify-center">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-3 py-2 rounded-l-md border text-sm font-medium ${
                currentPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            
            {[...Array(Math.ceil(filteredOwners.length / ownersPerPage))].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === index + 1
                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredOwners.length / ownersPerPage)}
              className={`relative inline-flex items-center px-3 py-2 rounded-r-md border text-sm font-medium ${
                currentPage === Math.ceil(filteredOwners.length / ownersPerPage)
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}

      {/* Owner Details Modal */}
      {selectedOwner && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
          onClick={() => setSelectedOwner(null)}
        >
          <div 
            className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-blue-600">
                  {selectedOwner.username[0].toUpperCase()}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedOwner.username}</h3>
              <p className="text-gray-500 mb-4">{selectedOwner.email}</p>
              <div className="bg-blue-50 px-3 py-1 rounded-full text-sm font-semibold text-blue-700 mb-4">
                {selectedOwner.salonName}
              </div>
              <div className="text-sm text-gray-500">
                Member since {new Date(selectedOwner.createdAt).toLocaleDateString()}
              </div>
              <button
                onClick={() => setSelectedOwner(null)}
                className="mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SalonOwners; 