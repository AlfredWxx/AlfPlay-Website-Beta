import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Users, Award, ChevronLeft, ChevronRight, X } from 'lucide-react';
import ContactSection from '../components/ContactSection';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const productsRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(1);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  // 检查是否显示欢迎弹窗
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setShowWelcomeModal(true);
      localStorage.setItem('hasSeenWelcome', 'true');
    }
  }, []);

  // 计算可见产品数量
  useEffect(() => {
    const calculateVisibleProducts = () => {
      if (!productsRef.current) return;
      const containerWidth = productsRef.current.offsetWidth;
      const productWidth = Math.min(544, containerWidth * 0.9); // 产品卡片宽度，最大544px，最小90%容器宽度
      const gap = 20; // 产品之间的间距
      const padding = containerWidth * 0.16; // 8% 的左右边距
      const availableWidth = containerWidth - padding;
      const maxProducts = Math.floor(availableWidth / (productWidth + gap));
      setVisibleProducts(Math.min(Math.max(1, maxProducts), 3));
    };

    calculateVisibleProducts();
    window.addEventListener('resize', calculateVisibleProducts);
    return () => window.removeEventListener('resize', calculateVisibleProducts);
  }, []);

  // 更新按钮显示状态
  useEffect(() => {
    if (currentIndex === 0) {
      setShowLeftButton(false);
    } else {
      setShowLeftButton(true);
    }

    const maxIndex = 10 - visibleProducts;
    if (currentIndex >= maxIndex) {
      setShowRightButton(false);
    } else {
      setShowRightButton(true);
    }
  }, [currentIndex, visibleProducts]);

  const scrollProducts = (direction: 'left' | 'right') => {
    if (productsRef.current) {
      const containerWidth = productsRef.current.offsetWidth;
      const productWidth = Math.min(544, containerWidth * 0.9);
      const scrollAmount = productWidth + 20; // 产品宽度 + 间距
      const newScrollLeft = productsRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      productsRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      setCurrentIndex(prev => direction === 'left' ? prev - 1 : prev + 1);
    }
  };

  return (
    <div className="relative">
      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-2xl relative">
            <button
              onClick={() => setShowWelcomeModal(false)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4">
                欢迎未来新股东查看Alfplay官方网站🙇！
              </h2>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div 
        className="h-[78vh] bg-cover bg-center flex items-center relative"
        style={{
          backgroundImage: 'url(/images/project-jurong-lake-gardens-playground-main.jpg)',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10" />
        <div className="container mx-auto px-4 text-left relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
            {t('home.title')} <br />
            <span className="text-white">{t('home.title2')}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-white drop-shadow-lg">
            {t('home.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-start">
            <button
              onClick={() => navigate('/products')}
              className="bg-alfblue text-white px-8 py-3 rounded-md text-lg hover:bg-white hover:text-alfblue transition-colors inline-flex items-center justify-center"
            >
              {t('home.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>


      {/* Products Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('home.products.title')}</h2>
          </div>
          
          <div className="relative">
            <div 
              ref={productsRef}
              className="flex overflow-x-auto scrollbar-hide gap-5 px-[8%]"
              style={{ scrollBehavior: 'smooth' }}
            >
              {[
                {
                  id: 1,
                  title: t('home.products.p1title'),
                  description: t('home.products.p1description'),
                  image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                },
                {
                  id: 2,
                  title: t('home.products.p2title'),
                  description: t('home.products.p2description'),
                  image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                },
                {
                  id: 3,
                  title: t('home.products.p3title'),
                  description: t('home.products.p3description'),
                  image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                },
                {
                  id: 4,
                  title: t('home.products.p4title'),
                  description: t('home.products.p4description'),
                  image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                },
                {
                  id: 5,
                  title: t('home.products.p5title'),
                  description: t('home.products.p5description'),
                  image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                },
                {
                  id: 6,
                  title: t('home.products.p6title'),
                  description: t('home.products.p6description'),
                  image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                },
                {
                  id: 7,
                  title: t('home.products.p7title'),
                  description: t('home.products.p7description'),
                  image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                },
                {
                  id: 8,
                  title: t('home.products.p8title'),
                  description: t('home.products.p8description'),
                  image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                },
                {
                  id: 9,
                  title: t('home.products.p9title'),
                  description: t('home.products.p9description'),
                  image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                },
                {
                  id: 10,
                  title: "Product 10",
                  description: "Product 10 description",
                  image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                }
              ].map((product) => (
                <div
                  key={product.id}
                  className="flex-none w-[90vw] sm:w-[80vw] md:w-[60vw] lg:w-[544px] bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-[60vw] sm:h-[50vw] md:h-[40vw] lg:h-96 object-cover"
                  />
                  <div className="p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">{product.title}</h3>
                    <p className="text-base sm:text-lg text-gray-600">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>
            {showLeftButton && (
              <button
                onClick={() => scrollProducts('left')}
                className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-alfblue transition-colors ${
                  showLeftButton ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}
            {showRightButton && (
              <button
                onClick={() => scrollProducts('right')}
                className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-alfblue transition-colors ${
                  showRightButton ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}