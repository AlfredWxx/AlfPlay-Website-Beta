import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu } from 'lucide-react';

interface HeaderProps {
  onOpenContact: () => void;
  onOpenLanguage: () => void;
  onOpenMobileMenu: () => void;
}

export default function Header({ onOpenContact, onOpenLanguage, onOpenMobileMenu }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (currentScrollY / (documentHeight - windowHeight)) * 100;
      
      // 检查是否在顶部5%范围内
      if (scrollPercentage <= 5) {
        setIsScrolled(false);
        setIsVisible(true);
      } else {
        setIsScrolled(true);
        // 控制header的显示/隐藏
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white' : 'bg-transparent'
      } ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-28">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/images/AlfPlayLogo-removebg.png" alt="AlfPlay Logo" className="h-20 w-auto" />
            <span className={`text-2xl font-bold drop-shadow-lg ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
              AlfPlay
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/planning"
              className={`${isActive('/planning') ? 'text-alfyellow' : isScrolled ? 'text-gray-800' : 'text-white'} hover:text-alfyellow transition-colors text-lg drop-shadow-lg`}
            >
              Planning
            </Link>
            <Link
              to="/products"
              className={`${isActive('/products') ? 'text-alfyellow' : isScrolled ? 'text-gray-800' : 'text-white'} hover:text-alfyellow transition-colors text-lg drop-shadow-lg`}
            >
              Products
            </Link>
            <Link
              to="/about"
              className={`${isActive('/about') ? 'text-alfyellow' : isScrolled ? 'text-gray-800' : 'text-white'} hover:text-alfyellow transition-colors text-lg drop-shadow-lg`}
            >
              About
            </Link>
            <button
              onClick={onOpenLanguage}
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              <Globe className="h-6 w-6" />
            </button>
            <button
              onClick={onOpenContact}
              className="bg-alfyellow text-white px-6 py-3 rounded-md hover:bg-alfblue transition-colors text-lg shadow-lg z-50"
            >
              Get in touch
            </button>
          </nav>

          {/* 移动端按钮 */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={onOpenLanguage}
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              <Globe className="h-6 w-6" />
            </button>
            <button
              onClick={onOpenMobileMenu}
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}