import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// 导入联系表单组件
import ContactSection from '../components/ContactSection';

const NotFound: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col items-center px-4 py-16">
      {/* 404错误部分 */}
      <div className="w-full max-w-6xl mx-auto text-center mb-16">
        <div className="relative inline-block">
          <h1 className="text-9xl font-bold text-gray-200 opacity-50">404</h1>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
            <div className="h-1 bg-[#7cc4c4] w-24 mx-auto mb-4"></div>
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-6 mb-2">
          {t('notFound.title', 'The Page is Not Found')}
        </h2>
        <h3 className="text-xl sm:text-2xl font-medium text-gray-600 mb-8">
          {t('notFound.subtitle', 'But You may Contact with One of the Alfplay Expert')}
        </h3>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link
            to="/"
            className="px-6 py-3 bg-[#7cc4c4] text-white font-medium rounded-md hover:bg-[#6ab3b3] transition-colors duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            {t('notFound.backHome', 'Back to Homepage')}
          </Link>

          <Link
            to="/products"
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-md hover:border-[#7cc4c4] hover:text-[#7cc4c4] transition-colors duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            {t('notFound.viewProducts', 'View Our Products')}
          </Link>
        </div>
      </div>

      {/* 分隔线 */}
      <div className="w-full max-w-4xl mx-auto mb-16">
        <div className="flex items-center justify-center">
          <div className="flex-grow h-px bg-gray-200"></div>
          <div className="px-4 text-lg text-gray-500 font-medium">{t('notFound.contactUs', 'Contact Us')}</div>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>
      </div>

      {/* 联系部分 */}
      <div className="w-full">
        <ContactSection />
      </div>
    </div>
  );
};

export default NotFound;
