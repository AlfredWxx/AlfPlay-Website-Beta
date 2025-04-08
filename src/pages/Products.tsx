import React from 'react';
import { Link } from 'react-router-dom';
import ContactSection from '../components/ContactSection';

export default function Products() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <div 
        className="h-[85vh] bg-gray-500 flex items-center relative"
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
            Page Developing 🏋️‍♀️🏋️‍♀️
          </h1>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
            Our Products
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white drop-shadow-lg">
            Discover our collection of innovative educational toys and games
          </p>
        </div>
      </div>

      {/* Navigation Breadcrumb */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-left space-x-2">
          <Link 
            to="/" 
            className="text-gray-600 hover:text-alfblue hover:underline transition-colors duration-300"
          >
            Home
          </Link>
          <span className="text-alfblue">-</span>
          <span className="text-gray-600">Products</span>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Educational Excellence
            </h2>
            <p className="text-gray-600 mb-8">
              Explore our carefully designed products that combine fun and learning for children of all ages.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Add your products content here */}
        </div>
      </div>
      <ContactSection />
    </div>
  );
}