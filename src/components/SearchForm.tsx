import React from 'react';
import { Link } from 'react-router-dom';
import { X, Search, ArrowRight } from 'lucide-react';

interface SearchFormProps {
  onClose: () => void;
}

export default function SearchForm({ onClose }: SearchFormProps) {
  return (
    <div className="relative h-full overflow-y-auto bg-white">
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-[80] transition-colors duration-200"
      >
        <X className="h-5 w-5" />
      </button>
      
      <div className="p-4">
        <div className="w-4/5 mx-auto">
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for something fun!"
                className="w-full p-2 pl-8 text-lg border-b-2 border-gray-200 focus:border-alfblue focus:outline-none transition-colors duration-200"
              />
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Quick Links</h3>
            <div className="space-y-2">
              <Link
                to="/products"
                onClick={onClose}
                className="flex items-center text-sm text-gray-800 hover:text-alfblue transition-colors"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Products
              </Link>
              
              <Link
                to="/about"
                onClick={onClose}
                className="flex items-center text-sm text-gray-800 hover:text-alfblue transition-colors"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                About Us
              </Link>
              
              <Link
                to="/planning"
                onClick={onClose}
                className="flex items-center text-sm text-gray-800 hover:text-alfblue transition-colors"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Planning Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 