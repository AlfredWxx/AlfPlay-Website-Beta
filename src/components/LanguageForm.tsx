import React from 'react';
import { X } from 'lucide-react';

interface LanguageFormProps {
  onClose: () => void;
}

export default function LanguageForm({ onClose }: LanguageFormProps) {
  return (
    <div className="relative h-full overflow-y-auto">
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 z-[80] transition-colors duration-200"
      >
        <X className="h-6 w-6" />
      </button>
      <div className="p-6 pt-16">
        <div className="w-4/5 mx-auto">
          <div className="mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Select your location</h2>
            </div>
          </div>
          
          <div className="space-y-4">
            <button className="w-full flex items-center space-x-4 p-4 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <span className="text-2xl">🇺🇸</span>
              <span className="text-lg">English</span>
            </button>
            
            <button className="w-full flex items-center space-x-4 p-4 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <span className="text-2xl">🇨🇳</span>
              <span className="text-lg">中文</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 