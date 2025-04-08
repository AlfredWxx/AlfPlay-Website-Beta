import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
interface PlanningPreviewProps {
  isVisible: boolean;
  onMouseLeave: () => void;
}

export default function PlanningPreview({ isVisible, onMouseLeave }: PlanningPreviewProps) {
  const { t } = useTranslation('common');
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
              <Link to="/contact" className="block text-1xl font-bold text-gray-800 hover:underline">{t('header.preview.left-button1')}</Link> 
              <Link to="/catalog" className="block text-1xl font-bold text-gray-800 hover:underline">{t('header.preview.left-button2')}</Link> 
              <Link to="/warranty" className="block text-1xl font-bold text-gray-800 hover:underline">{t('header.preview.left-button3')}</Link> 
            </div>
          </div>
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800">{t('header.planning-preview.title1')}</h2>
            <p className="text-gray-600">
              {t('header.planning-preview.subtitle1')}
            </p>
            <Link 
              to="/planning" 
              className="inline-block bg-alfblue text-white px-6 py-3 rounded-md hover:bg-white hover:text-alfblue transition-colors"
            >
              {t('header.planning-preview.button1')}
            </Link>
          </div>
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800">{t('header.planning-preview.title2')}</h2>
            <p className="text-gray-600">
              {t('header.planning-preview.subtitle2')}
            </p>
            <Link 
              to="/planning" 
              className="inline-block bg-alfblue text-white px-6 py-3 rounded-md hover:bg-white hover:text-alfblue transition-colors"
            >
              {t('header.planning-preview.button2')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 