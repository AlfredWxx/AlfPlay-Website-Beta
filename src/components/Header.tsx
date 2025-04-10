import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ProductPreview from './ProductPreview';
import AboutPreview from './AboutPreview';
import PlanningPreview from './PlanningPreview';
// 导入自定义Hook
import { useResponsive } from '../hooks/useResponsive';
import { useHeaderScroll } from '../hooks/useHeaderScroll';

interface HeaderProps {
  onOpenContact: () => void;
  onOpenLanguage: () => void;
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
}

export default function Header({ onOpenContact, onOpenLanguage, onOpenMobileMenu, onOpenSearch }: HeaderProps) {
  const { t } = useTranslation('common');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 使用自定义Hook替代直接的状态管理
  const { isMobile, isTablet } = useResponsive();
  const { isScrolled, isVisible } = useHeaderScroll();
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

  // 滚动处理逻辑已移至useHeaderScroll Hook

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

  // 根据设备类型渲染不同的Header内容
  const renderHeaderContent = () => {
    // 移动端和平板端的Header内容
    if (isMobile || isTablet) {
      return (
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
            <img
              src="/images/AlfPlayLogo-removebg.png"
              alt="AlfPlay Logo"
              className="h-12 sm:h-16 w-auto"
            />
            <span className={`text-xl sm:text-2xl font-bold drop-shadow-lg font-roboto ${
              isScrolled || activePreview ? 'text-gray-800' : 'text-white'
            }`}>
              Alfplay
            </span>
          </Link>

          {/* 移动端按钮 */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={onOpenSearch}
              className={`p-2 rounded-full focus:outline-none transition-colors duration-200 ${
                isScrolled || activePreview ? 'text-gray-800' : 'text-white'
              }`}
              aria-label="Search"
            >
              <Search className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <button
              onClick={onOpenLanguage}
              className={`p-2 rounded-full focus:outline-none transition-colors duration-200 ${
                isScrolled || activePreview ? 'text-gray-800' : 'text-white'
              }`}
              aria-label="Change language"
            >
              <Globe className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <button
              onClick={onOpenMobileMenu}
              className={`p-2 rounded-full focus:outline-none transition-colors duration-200 ${
                isScrolled || activePreview ? 'text-gray-800' : 'text-white'
              }`}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>
      );
    }

    // 桌面端的Header内容
    return (
      <div className="flex items-center justify-between h-20">
        <Link to="/" className="flex items-center space-x-3">
          <img src="/images/AlfPlayLogo-removebg.png" alt="AlfPlay Logo" className="h-20 w-auto" />
          <span className={`text-2xl md:text-3xl lg:text-5xl font-bold drop-shadow-lg font-roboto ${
            isScrolled || activePreview ? 'text-gray-800' : 'text-white'
          }`}>
            Alfplay
          </span>
        </Link>

        <nav className="flex items-center space-x-8">
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('products')}
          >
            <Link
              to="/products"
              className={`${isActive('/products') ? 'text-alfblue' : isScrolled || activePreview ? 'text-gray-800' : 'text-white'} hover:text-alfblue transition-colors text-lg drop-shadow-lg`}
            >
              {t('header.nav.products')}
            </Link>
          </div>
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('planning')}
          >
            <Link
              to="/planning"
              className={`${isActive('/planning') ? 'text-alfblue' : isScrolled || activePreview ? 'text-gray-800' : 'text-white'} hover:text-alfblue transition-colors text-lg drop-shadow-lg`}
            >
              {t('header.nav.planning')}
            </Link>
          </div>
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('about')}
          >
            <Link
              to="/about"
              className={`${isActive('/about') ? 'text-alfblue' : isScrolled || activePreview ? 'text-gray-800' : 'text-white'} hover:text-alfblue transition-colors text-lg drop-shadow-lg`}
            >
              {t('header.nav.about')}
            </Link>
          </div>
          <button
            onClick={onOpenSearch}
            className={`p-2 rounded-full hover:bg-alfblue transition-colors duration-200 ${
              isScrolled || activePreview ? 'text-gray-800' : 'text-white'
            }`}
          >
            <Search className="h-6 w-6" />
          </button>
          <button
            onClick={onOpenLanguage}
            className={`p-2 rounded-full hover:bg-alfblue transition-colors duration-200 ${
              isScrolled || activePreview ? 'text-gray-800' : 'text-white'
            }`}
          >
            <Globe className="h-6 w-6" />
          </button>
          <button
            onClick={onOpenContact}
            className={`bg-alfblue px-6 py-3 rounded-md hover:bg-white transition-colors text-lg shadow-lg z-50 ${
              isScrolled || activePreview ? 'text-gray-800 hover:text-gray-800' : 'text-white hover:text-alfblue'
            }`}
          >
            {t('header.buttons.contact')}
          </button>
        </nav>
      </div>
    );
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
            {renderHeaderContent()}
          </div>
        </header>

        {/* 只在桌面版显示预览内容 */}
        {!isMobile && !isTablet && (
          <div className="relative">
            {renderPreviewContent()}
          </div>
        )}
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">{t('header.nav.menu')}</h2>
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
                  {t('header.nav.products')}
                </Link>
                <Link
                  to="/about"
                  className="block text-base text-gray-800 hover:text-alfblue"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('header.nav.about')}
                </Link>
                <Link
                  to="/planning"
                  className="block text-base text-gray-800 hover:text-alfblue"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('header.nav.planning')}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}