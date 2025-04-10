import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Users, Award, ChevronLeft, ChevronRight, X } from 'lucide-react';
import ContactSection from '../components/ContactSection';
import ShowcaseSection from '../components/ShowcaseSection';
import FlipCardSection from '../components/FlipCardSection';
import { useTranslation } from 'react-i18next';
import ProductCarousel from '../components/ProductCarousel';
export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  // 检查是否显示欢迎弹窗
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setShowWelcomeModal(true);
      localStorage.setItem('hasSeenWelcome', 'true');
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <div
        className="min-h-[500px] h-[83vh] bg-cover bg-center flex items-center relative"
        style={{
          backgroundImage: 'url(/images/project-jurong-lake-gardens-playground-main.jpg)',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          backgroundPosition: 'center 30%' // 调整背景图片位置，使关键元素在移动端可见
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20" />
        <div className="container mx-auto px-4 sm:px-6 md:px-8 text-left relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-white drop-shadow-lg">
              {t('home.title')}{' '}
              <span className="text-white block sm:inline">{t('home.title2')}</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl text-white drop-shadow-lg">
              {t('home.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <button
                onClick={() => navigate('/products')}
                className="bg-alfblue text-white px-6 sm:px-8 py-3 rounded-md text-base sm:text-lg hover:bg-white hover:text-alfblue transition-colors inline-flex items-center justify-center shadow-lg"
              >
                {t('home.button')}
                <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 产品轮播部分 */}
      <div className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10">
            {t('home.products.title')}
          </h2>
          <ProductCarousel />
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}