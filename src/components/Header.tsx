import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Play } from 'lucide-react';
import ContactForm from './ContactForm';

export default function Header() {
  const [showContact, setShowContact] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Play className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">AlfPlay</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/planning"
              className={`${isActive('/planning') ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-500 transition-colors`}
            >
              Planning
            </Link>
            <Link
              to="/products"
              className={`${isActive('/products') ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-500 transition-colors`}
            >
              Products
            </Link>
            <Link
              to="/about"
              className={`${isActive('/about') ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-500 transition-colors`}
            >
              About
            </Link>
            <button
              onClick={() => setShowContact(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
            >
              Get in touch
            </button>
          </nav>
        </div>
      </div>
      
      {showContact && (
        <>
          {/* 遮罩层 */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowContact(false)}
          />
          {/* ContactForm 容器 */}
          <div className="fixed top-0 right-0 h-full w-full sm:w-[80%] md:w-[60%] lg:w-[40%] bg-white shadow-lg transform transition-transform z-50">
            <ContactForm onClose={() => setShowContact(false)} />
          </div>
        </>
      )}
    </header>
  );
}