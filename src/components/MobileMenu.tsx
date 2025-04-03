import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
interface MobileMenuProps {
  onClose: () => void;
  onOpenContact: () => void;
  onOpenLanguage: () => void;
  isActive: (path: string) => boolean;
  isScrolled: boolean;
}

export default function MobileMenu({ 
  onClose, 
  onOpenContact, 
  onOpenLanguage,
  isActive,
  isScrolled 
}: MobileMenuProps) {
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
            <div className="flex items-center space-x-3">
              <img src="/images/AlfPlayLogo-removebg.png" alt="AlfPlay Logo" className="h-16 w-auto" />
              <span className="text-2xl font-bold drop-shadow-lg text-gray-800">
                AlfPlay
              </span>
            </div>
          </div>
          
          <div className="space-y-6">
            <Link
              to="/planning"
              onClick={onClose}
              className="block text-xl text-gray-800 hover:text-alfblue transition-colors"
            >
              Planning
            </Link>
            
            <Link
              to="/products"
              onClick={onClose}
              className="block text-xl text-gray-800 hover:text-alfblue transition-colors"
            >
              Products
            </Link>
            
            <Link
              to="/about"
              onClick={onClose}
              className="block text-xl text-gray-800 hover:text-alfblue transition-colors"
            >
              About
            </Link>

            <div className="pt-4">
              <button
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="w-full bg-alfblue text-white px-6 py-3 rounded-md hover:bg-alfblue transition-colors text-xl shadow-lg"
              >
                Get in touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 