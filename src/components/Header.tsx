import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, Search, X } from 'lucide-react';
import ProductPreview from './ProductPreview';
import AboutPreview from './AboutPreview';
import PlanningPreview from './PlanningPreview';

interface HeaderProps {
  onOpenContact: () => void;
  onOpenLanguage: () => void;
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
}

export default function Header({ onOpenContact, onOpenLanguage, onOpenMobileMenu, onOpenSearch }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activePreview, setActivePreview] = useState<'products' | 'planning' | 'about' | null>(null);
  const closeTimeoutRef = useRef<number>();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleMouseEnter = (preview: 'products' | 'planning' | 'about') => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    setActivePreview(preview);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      setActivePreview(null);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (currentScrollY / (documentHeight - windowHeight)) * 100;
      
      // 判断是否在顶部5%范围内
      if (scrollPercentage <= 5) {
        setIsScrolled(false);
        setIsVisible(true);
      } else {
        setIsScrolled(true);
        
        // 判断是否到达底部
        if (currentScrollY + windowHeight >= documentHeight - 10) {
          setIsVisible(true);
        } else {
          // 根据滚动方向决定是否显示header
          if (currentScrollY > lastScrollY) {
            // 向下滚动
            setIsVisible(false);
          } else {
            // 向上滚动
            setIsVisible(true);
          }
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsMenuOpen(false);
    setActivePreview(null);
  }, [location]);

  const renderPreviewContent = () => {
    if (!activePreview) return null;

    const commonProps = {
      isVisible: true,
      onMouseLeave: handleMouseLeave
    };

    switch (activePreview) {
      case 'products':
        return <ProductPreview {...commonProps} />;
      case 'planning':
        return <PlanningPreview {...commonProps} />;
      case 'about':
        return <AboutPreview {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div 
        className="fixed top-0 left-0 right-0 z-50"
        onMouseLeave={handleMouseLeave}
      >
        <header 
          className={`relative transition-all duration-300 transform ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
          } ${
            isScrolled || activePreview ? 'bg-white' : 'bg-transparent'
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              <Link to="/" className="flex items-center space-x-3">
                <img src="/images/AlfPlayLogo-removebg.png" alt="AlfPlay Logo" className="h-20 w-auto" />
                <span className={`text-2xl md: text-3xl lg:text-5xl font-bold drop-shadow-lg font-roboto ${isScrolled || activePreview ? 'text-gray-800' : 'text-white'}`}>
                  Alfplay
                </span>
              </Link>
              
              <nav className="hidden md:flex items-center space-x-8">
                <div 
                  className="relative"
                  onMouseEnter={() => handleMouseEnter('products')}
                >
                  <Link 
                    to="/products" 
                    className={`${isActive('/products') ? 'text-alfyellow' : isScrolled || activePreview ? 'text-gray-800' : 'text-white'} hover:text-alfyellow transition-colors text-lg drop-shadow-lg`}
                  >
                    Products
                  </Link>
                </div>
                <div 
                  className="relative"
                  onMouseEnter={() => handleMouseEnter('planning')}
                >
                  <Link
                    to="/planning"
                    className={`${isActive('/planning') ? 'text-alfyellow' : isScrolled || activePreview ? 'text-gray-800' : 'text-white'} hover:text-alfyellow transition-colors text-lg drop-shadow-lg`}
                  >
                    Planning
                  </Link>
                </div>
                <div 
                  className="relative"
                  onMouseEnter={() => handleMouseEnter('about')}
                >
                  <Link
                    to="/about"
                    className={`${isActive('/about') ? 'text-alfyellow' : isScrolled || activePreview ? 'text-gray-800' : 'text-white'} hover:text-alfyellow transition-colors text-lg drop-shadow-lg`}
                  >
                    About
                  </Link>
                </div>
                <button
                  onClick={onOpenSearch}
                  className={`p-2 rounded-full hover:bg-alfyellow transition-colors duration-200 ${
                    isScrolled || activePreview ? 'text-gray-800' : 'text-white'
                  }`}
                >
                  <Search className="h-6 w-6" />
                </button>
                <button
                  onClick={onOpenLanguage}
                  className={`p-2 rounded-full hover:bg-alfyellow transition-colors duration-200 ${
                    isScrolled || activePreview ? 'text-gray-800' : 'text-white'
                  }`}
                >
                  <Globe className="h-6 w-6" />
                </button>
                <button
                  onClick={onOpenContact}
                  className={`bg-alfyellow px-6 py-3 rounded-md hover:bg-white transition-colors text-lg shadow-lg z-50 ${
                    isScrolled || activePreview ? 'text-gray-800 hover:text-gray-800' : 'text-white hover:text-alfyellow'
                  }`}
                >
                  Let's Talk
                </button>
              </nav>

              {/* 移动端按钮 */}
              <div className="flex items-center space-x-4 md:hidden">
                <button
                  onClick={onOpenSearch}
                  className="p-2 rounded-full active:bg-gray-100 focus:outline-none transition-colors duration-200 text-gray-800"
                >
                  <Search className="h-6 w-6" />
                </button>

                <button
                  onClick={onOpenLanguage}
                  className="p-2 rounded-full active:bg-gray-100 focus:outline-none transition-colors duration-200 text-gray-800"
                >
                  <Globe className="h-6 w-6" />
                </button>

                <button
                  onClick={onOpenMobileMenu}
                  className="p-2 rounded-full active:bg-gray-100 focus:outline-none transition-colors duration-200 text-gray-800"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="relative">
          {renderPreviewContent()}
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <nav className="p-4">
              <div className="space-y-4">
                <Link 
                  to="/products" 
                  className="block text-base text-gray-800 hover:text-alfblue"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link 
                  to="/about" 
                  className="block text-base text-gray-800 hover:text-alfblue"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/planning" 
                  className="block text-base text-gray-800 hover:text-alfblue"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Planning
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}