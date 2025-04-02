import React from 'react';
import { Link } from 'react-router-dom';

interface AboutPreviewProps {
  isVisible: boolean;
  onMouseLeave: () => void;
}

export default function AboutPreview({ isVisible, onMouseLeave }: AboutPreviewProps) {
  return (
    <div 
      className={`fixed top-16 left-0 w-full bg-white shadow-lg transform transition-all duration-300 ease-in-out pointer-events-none opacity-0 z-30 ${
        isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0'
      }`}
      onMouseLeave={onMouseLeave}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-6">
            <h2 className="text-1xl font-bold text-gray-800">Talk with an Alfplay Expert</h2>
            <h2 className="text-1xl font-bold text-gray-800">Catalogs</h2>
            <h2 className="text-1xl font-bold text-gray-800">Warranty</h2>
          </div>
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800">Alfplay History</h2>
            <p className="text-gray-600">
              Get to know the history of Alfplay.
            </p>
            <Link 
              to="/about" 
              className="inline-block bg-alfyellow text-white px-6 py-3 rounded-md hover:bg-white hover:text-alfyellow transition-colors"
            >
              View Products
            </Link>
          </div>
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
            <p className="text-gray-600">
              Learn about our mission and vision.
            </p>
            <Link 
              to="/about" 
              className="inline-block bg-alfyellow text-white px-6 py-3 rounded-md hover:bg-white hover:text-alfyellow transition-colors"
            >
              View Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 