import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ProductPreviewProps {
  isVisible: boolean;
  onMouseLeave: () => void;
}

export default function ProductPreview({ isVisible, onMouseLeave }: ProductPreviewProps) {
  const { t } = useTranslation('common');

  useEffect(() => {
    const handleScroll = () => {
      if (isVisible) {
        onMouseLeave();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, onMouseLeave]);

  return (
    <div 
      className={`fixed top-[72px] left-0 w-full bg-white shadow-lg transform transition-all duration-300 ease-out pointer-events-none opacity-0 z-30 ${
        isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-1 opacity-0'
      }`}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'fixed',
        top: '72px',
        left: 0,
        right: 0,
        zIndex: 30,
        transformOrigin: 'top',
        transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <Link to="/contact" className="block text-1xl font-bold text-gray-800 hover:underline">{t('header.preview.left-button1')}</Link> 
              <Link to="/catalog" className="block text-1xl font-bold text-gray-800 hover:underline">{t('header.preview.left-button2')}</Link> 
              <Link to="/example" className="block text-1xl font-bold text-gray-800 hover:underline">{t('header.preview.left-button3')}</Link> 
            </div>
          </div>
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800">{t('header.product-preview.title1')}</h2>
            <p className="text-gray-600">
              {t('header.product-preview.subtitle1')}
            </p>
            <Link 
              to="/products" 
              className="inline-block bg-alfblue text-white px-6 py-3 rounded-md hover:bg-white hover:text-alfblue transition-colors"
            >
              {t('header.product-preview.button1')}
            </Link>
          </div>
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800">{t('header.product-preview.title2')}</h2>
            <p className="text-gray-600">
              {t('header.product-preview.subtitle2')}
            </p>
            <Link 
              to="/products" 
              className="inline-block bg-alfblue text-white px-6 py-3 rounded-md hover:bg-white hover:text-alfblue transition-colors"
            >
              {t('header.product-preview.button2')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 