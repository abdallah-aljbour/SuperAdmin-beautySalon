import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

function Salons() {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [salonsPerPage] = useState(2);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSalon, setSelectedSalon] = useState(null);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const response = await api.get('/salons');
        setSalons(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching salons:', err);
      }
    };

    fetchSalons();
  }, []);

  // Filter salons based on search term
  const filteredSalons = salons.filter(salon =>
    salon.salonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    salon.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current salons
  const indexOfLastSalon = currentPage * salonsPerPage;
  const indexOfFirstSalon = indexOfLastSalon - salonsPerPage;
  const currentSalons = filteredSalons.slice(indexOfFirstSalon, indexOfLastSalon);

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
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Salon Management</h2>
        <p className="text-gray-600">View and manage all registered salons</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-2xl font-bold text-blue-600">{salons.length}</div>
          <div className="text-gray-600">Total Salons</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-2xl font-bold text-green-600">
            {salons.reduce((acc, salon) => acc + salon.services.length, 0)}
          </div>
          <div className="text-gray-600">Total Services</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-2xl font-bold text-purple-600">
            {salons.filter(salon => salon.workingHours.sunday.open !== "Closed").length}
          </div>
          <div className="text-gray-600">Open on Sundays</div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by salon or owner name..."
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

      {/* Salons Grid */}
      {filteredSalons.length === 0 ? (
        <div className="text-center bg-gray-50 rounded-lg p-8">
          <div className="text-gray-500 text-lg">No salons found matching "{searchTerm}"</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentSalons.map((salon) => (
            <div 
              key={salon._id} 
              className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              onClick={() => setSelectedSalon(salon)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{salon.salonName}</h3>
                    <p className="text-gray-600 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {salon.ownerName}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span>
                </div>

                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {salon.email}
                  </p>
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {salon.phone}
                  </p>
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {salon.address}
                  </p>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Services ({salon.services.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {salon.services.map((service, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {service.serviceName}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4">
                <h4 className="font-semibold text-gray-800 mb-2">Today's Hours</h4>
                <p className="text-gray-600">
                  {salon.workingHours[Object.keys(salon.workingHours)[new Date().getDay()]].open} - 
                  {salon.workingHours[Object.keys(salon.workingHours)[new Date().getDay()]].close}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredSalons.length > 0 && (
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
            
            {[...Array(Math.ceil(filteredSalons.length / salonsPerPage))].map((_, index) => (
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
              disabled={currentPage === Math.ceil(filteredSalons.length / salonsPerPage)}
              className={`relative inline-flex items-center px-3 py-2 rounded-r-md border text-sm font-medium ${
                currentPage === Math.ceil(filteredSalons.length / salonsPerPage)
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}

      {/* Salon Details Modal */}
      {selectedSalon && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
          onClick={() => setSelectedSalon(null)}
        >
          <div 
            className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{selectedSalon.salonName}</h3>
                <button
                  onClick={() => setSelectedSalon(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Contact Information</h4>
                  <p className="text-gray-600">{selectedSalon.ownerName}</p>
                  <p className="text-gray-600">{selectedSalon.email}</p>
                  <p className="text-gray-600">{selectedSalon.phone}</p>
                  <p className="text-gray-600">{selectedSalon.address}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Working Hours</h4>
                  {Object.entries(selectedSalon.workingHours).map(([day, hours]) => (
                    <p key={day} className="text-gray-600 capitalize">
                      {day}: {hours.open} - {hours.close}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Services</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedSalon.services.map((service, index) => (
                    <div 
                      key={index}
                      className="bg-gray-50 p-3 rounded-lg"
                    >
                      <p className="font-medium text-gray-800">{service.serviceName}</p>
                      <p className="text-gray-600">${service.price} • {service.duration}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-gray-500 text-sm">
                  Salon added on {new Date(selectedSalon.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Salons; 