import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ContactForm from './ContactForm';

export default function Header() {
  const [showContact, setShowContact] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 bg-transparent z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/images/AlfPlayLogo-removebg.png" alt="AlfPlay Logo" className="h-20 w-auto" />
            <span className="text-2xl font-bold text-white drop-shadow-lg">AlfPlay</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/planning"
              className={`${isActive('/planning') ? 'text-alfyellow' : 'text-white'} hover:text-alfyellow transition-colors text-lg drop-shadow-lg`}
            >
              Planning
            </Link>
            <Link
              to="/products"
              className={`${isActive('/products') ? 'text-alfyellow' : 'text-white'} hover:text-alfyellow transition-colors text-lg drop-shadow-lg`}
            >
              Products
            </Link>
            <Link
              to="/about"
              className={`${isActive('/about') ? 'text-alfyellow' : 'text-white'} hover:text-alfyellow transition-colors text-lg drop-shadow-lg`}
            >
              About
            </Link>
            <button
              onClick={() => setShowContact(true)}
              className="bg-alfyellow text-white px-6 py-3 rounded-md hover:bg-alfblue transition-colors text-lg shadow-lg"
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