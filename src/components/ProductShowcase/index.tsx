import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useResponsive } from '../../hooks/useResponsive';
import { useTranslation } from 'react-i18next';
import './ProductShowcase.css';

// Product type definition
export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  ageRange?: string;
  slug: string;
}

interface ProductShowcaseProps {
  title?: string;
  products?: Product[];
}

// Default placeholder products
const defaultProducts: Product[] = [
  {
    id: '1',
    title: 'Outdoor Climbing Frame',
    description: 'Multi-functional climbing frame for children aged 3-12, safe and durable',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Outdoor',
    ageRange: '3-12 Years',
    slug: 'outdoor-climbing-frame'
  },
  {
    id: '2',
    title: 'Combination Slides',
    description: 'Diverse slide combinations providing rich play experiences',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Outdoor',
    ageRange: '2-10 Years',
    slug: 'combination-slides'
  },
  {
    id: '3',
    title: 'Balance Training Equipment',
    description: 'Professional equipment to help children develop balance and coordination',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Outdoor',
    ageRange: '4-14 Years',
    slug: 'balance-training-equipment'
  },
  {
    id: '4',
    title: 'Swing Combinations',
    description: 'Multi-person swing combinations, safe and fun',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Outdoor',
    ageRange: '3-12 Years',
    slug: 'swing-combinations'
  },
  {
    id: '5',
    title: 'Sand & Water Play Table',
    description: 'Interactive play table combining sand and water elements',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Outdoor',
    ageRange: '2-8 Years',
    slug: 'sand-water-play-table'
  },
  {
    id: '6',
    title: 'Rotating Play Equipment',
    description: 'Exciting rotating equipment to train balance and coordination',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Outdoor',
    ageRange: '5-15 Years',
    slug: 'rotating-play-equipment'
  },
  {
    id: '7',
    title: 'Interactive Panels',
    description: 'Educational interactive panels for cognitive development',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Educational',
    ageRange: '1-6 Years',
    slug: 'interactive-panels'
  },
  {
    id: '8',
    title: 'Inclusive Play Equipment',
    description: 'Accessible play equipment designed for children of all abilities',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Inclusive',
    ageRange: '2-12 Years',
    slug: 'inclusive-play-equipment'
  },
  {
    id: '9',
    title: 'Outdoor Fitness Station',
    description: 'Multi-functional fitness station for teenagers and adults',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Fitness',
    ageRange: '12+ Years',
    slug: 'outdoor-fitness-station'
  }
];

const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  title,
  products = defaultProducts
}) => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // 计算每个视图中显示的卡片数量
  const itemsPerView = useMemo(() => {
    return isMobile ? 1 : 3; // 移动端显示1个，桌面端显示3个
  }, [isMobile]);

  // 卡片宽度和间距设置
  const cardSettings = useMemo(() => {
    if (isMobile) {
      return {
        width: 100, // 移动端一个卡片占100%宽度
        step: 1,    // 移动端每次滚动一个卡片
        gap: 0      // 移动端没有额外的间距
      };
    }
    return {
      width: 30,    // 桌面端一个卡片占30%宽度
      step: 3,      // 桌面端每次滚动三个卡片
      gap: 0        // 间距已经包含在CSS中
    };
  }, [isMobile]);

  // 处理向右滚动
  const handleNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    // 每次滚动指定数量的卡片，但需要确保不超过最大索引
    const maxIndex = Math.max(0, products.length - itemsPerView);
    setCurrentIndex(prev => Math.min(prev + cardSettings.step, maxIndex));

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // 处理向左滚动
  const handlePrev = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    // 每次向左滚动指定数量的卡片
    setCurrentIndex(prev => Math.max(0, prev - cardSettings.step));

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // 检查是否到达边界
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= products.length - itemsPerView;

  // 处理产品点击
  const handleProductClick = (productSlug: string) => {
    navigate(`/products/${productSlug}`);
  };

  // Handle touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // 响应窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      // 重置当前索引，确保在视图模式变化时不会出现空白
      setCurrentIndex(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="product-showcase">
      {title && (
        <h2 className="showcase-title">{title}</h2>
      )}

      <div className="showcase-container">
        <div
          ref={showcaseRef}
          className="showcase-track"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="showcase-slides"
            style={{
              transform: `translateX(-${currentIndex * cardSettings.width}%)`,
              transition: isTransitioning ? 'transform 0.5s ease' : 'none'
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => handleProductClick(product.slug)}
                style={{ width: `${cardSettings.width}%` }}
              >
                <div className="product-card-inner polaroid">
                  <div className="product-image-container">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="product-image"
                      loading="lazy"
                    />
                    {product.ageRange && (
                      <div className="product-age-range">
                        {product.ageRange}
                      </div>
                    )}
                  </div>
                  <div className="product-content">
                    <div className="product-category">{product.category}</div>
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-description">{product.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 导航按钮 - 只在需要时显示 */}
        {!isAtStart && (
          <button
            className="showcase-nav showcase-prev"
            onClick={handlePrev}
            disabled={isTransitioning}
            aria-label={t('productShowcase.prevButton')}
          >
            <ChevronLeft className="nav-icon" />
          </button>
        )}

        {!isAtEnd && (
          <button
            className="showcase-nav showcase-next"
            onClick={handleNext}
            disabled={isTransitioning}
            aria-label={t('productShowcase.nextButton')}
          >
            <ChevronRight className="nav-icon" />
          </button>
        )}
      </div>
    </section>
  );
};

export default ProductShowcase;
