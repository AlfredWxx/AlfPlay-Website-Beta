import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Users, Award, ChevronLeft, ChevronRight, X } from 'lucide-react';
import ContactSection from '../components/ContactSection';
import ShowcaseSection from '../components/ShowcaseSection';
import FlipCardSection from '../components/FlipCardSection';
import { useTranslation } from 'react-i18next';

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

  const showcaseItems = [
    {
      id: 1,
      title: t('home.products.p1title'),
      description: t('home.products.p1description'),
      image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      link: "/products"
    },
    {
      id: 2,
      title: t('home.products.p2title'),
      description: t('home.products.p2description'),
      image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      link: "/products"
    },
    {
      id: 3,
      title: t('home.products.p3title'),
      description: t('home.products.p3description'),
      image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      link: "/products"
    },
    {
      id: 4,
      title: t('home.products.p4title'),
      description: t('home.products.p4description'),
      image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      link: "/products"
    },
    {
      id: 5,
      title: t('home.products.p5title'),
      description: t('home.products.p5description'),
      image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      link: "/products"
    },
    {
      id: 6,
      title: t('home.products.p6title'),
      description: t('home.products.p6description'),
      image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      link: "/products"
    },
    {
      id: 7,
      title: t('home.products.p7title'),
      description: t('home.products.p7description'),
      image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      link: "/products"
    },
    {
      id: 8,
      title: t('home.products.p8title'),
      description: t('home.products.p8description'),
      image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      link: "/products"
    },
    {
      id: 9,
      title: t('home.products.p9title'),
      description: t('home.products.p9description'),
      image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      link: "/products"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <div 
        className="h-[83vh] bg-cover bg-center flex items-center relative"
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
      <ShowcaseSection 
        title={t('home.products.title')}
        items={showcaseItems}
      />


      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}