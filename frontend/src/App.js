import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Users from "./components/Users";
import SalonOwners from "./components/SalonOwners";
import Salons from "./components/Salons";
import Messages from "./components/Messages";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Custom NavLink component with active state
  const NavLink = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
      <Link
        to={to}
        className={`${
          isActive 
            ? 'bg-blue-500 text-white' 
            : 'text-gray-600 hover:bg-blue-50'
        } transition-all duration-200 px-4 py-2 rounded-lg font-medium flex items-center space-x-2`}
      >
        {children}
      </Link>
    );
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-lg border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex justify-between h-16">
              {/* Logo and Brand */}
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    SuperAdmin
                  </span>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden sm:flex sm:items-center sm:space-x-4">
                <NavLink to="/users">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>Users</span>
                </NavLink>
                <NavLink to="/salon-owners">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>Salon Owners</span>
                </NavLink>
                <NavLink to="/salons">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Salons</span>
                </NavLink>
                <NavLink to="/messages">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Messages</span>
                </NavLink>
              </div>

              {/* Mobile menu button */}
              <div className="sm:hidden flex items-center">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <svg
                    className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden bg-white border-t border-gray-200`}>
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/users"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Users
              </Link>
              <Link
                to="/salon-owners"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Salon Owners
              </Link>
              <Link
                to="/salons"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Salons
              </Link>
              <Link
                to="/messages"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Messages
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/salon-owners" element={<SalonOwners />} />
            <Route path="/salons" element={<Salons />} />
            <Route path="/messages" element={<Messages />} />
            <Route
              path="/"
              element={
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8">
                      <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
                        Welcome, Super Admin!
                      </h1>
                      <p className="text-lg text-center text-gray-600 mb-8">
                        Manage your beauty salon platform with ease.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Stats</h3>
                          <p className="text-gray-600">View and manage your platform statistics.</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Activity</h3>
                          <p className="text-gray-600">Monitor the latest activities on your platform.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
