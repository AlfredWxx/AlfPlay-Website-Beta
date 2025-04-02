import React from 'react';
import { Link } from 'react-router-dom';

interface PlanningPreviewProps {
  isVisible: boolean;
  onMouseLeave: () => void;
}

export default function PlanningPreview({ isVisible, onMouseLeave }: PlanningPreviewProps) {
  return (
    <div 
      className={`fixed top-18 left-0 w-full bg-white shadow-lg transform transition-all duration-300 ease-in-out pointer-events-none opacity-0 z-30 ${
        isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0'
      }`}
      onMouseLeave={onMouseLeave}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-6">
            <div className="space-y-4">
              <Link to="/contact" className="block text-1xl font-bold text-gray-800 hover:underline">Talk with an Alfplay Expert</Link> 
              <Link to="/catalog" className="block text-1xl font-bold text-gray-800 hover:underline">Catalogs</Link> 
              <Link to="/catalog" className="block text-1xl font-bold text-gray-800 hover:underline">Warranty</Link> 
            </div>
          </div>
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800">Plan your next project</h2>
            <p className="text-gray-600">
              Explore everything you need to plan your next project.
            </p>
            <Link 
              to="/planning" 
              className="inline-block bg-alfyellow text-white px-6 py-3 rounded-md hover:bg-white hover:text-alfyellow transition-colors"
            >
              View Products
            </Link>
          </div>
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800">How we support your project</h2>
            <p className="text-gray-600">
              Explore everything we offer to support your project.
            </p>
            <Link 
              to="/planning" 
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