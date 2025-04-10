import React, { useRef, useState, useEffect } from 'react';
import '../server/ProductCarousel.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCardProps {
  imageUrl: string;
  title: string;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, title, description}) => {
  return (
    <div className="product-card">
        <img src={imageUrl} alt={description} />
        <h3 className="product-card-title">{title}</h3>
        <p className="product-card-description">{description}</p>
    </div>
  );
};

const ProductCarousel: React.FC = () => {
    const products = [
        { imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', title: 'Product 1', description: 'Product 1 description'},
        { imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', title: 'Product 2', description: 'Product 2 description '},
        { imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', title: 'Product 3', description: 'Product 3 description '},
        { imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', title: 'Product 4', description: 'Product 4 description '},
        { imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', title: 'Product 5', description: 'Product 5 description '},
        { imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', title: 'Product 6', description: 'Product 6 description '},
        { imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', title: 'Product 7', description: 'Product 7 description '},
        { imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', title: 'Product 8', description: 'Product 8 description '},
        { imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', title: 'Product 9', description: 'Product 9 description '},
      ];

      const [currentIndex, setCurrentIndex] = useState(0);
      const [isMobile, setIsMobile] = useState(false);
      const [isTablet, setIsTablet] = useState(false);
      const touchStartX = useRef(0);
      const touchEndX = useRef(0);
      const touchStartTime = useRef(0);
      const touchEndTime = useRef(0);

      // 检测设备类型
      useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 480);
          setIsTablet(window.innerWidth > 480 && window.innerWidth <= 768);
        };

        handleResize(); // 初始检测
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      const handleNext = () => {
        const itemsPerView = isMobile ? 1 : isTablet ? 2 : 3;
        if (currentIndex + itemsPerView < products.length) {
          setCurrentIndex(Math.min(currentIndex + itemsPerView, products.length - itemsPerView));
        }
      };

      const handlePrev = () => {
        const itemsPerView = isMobile ? 1 : isTablet ? 2 : 3;
        if (currentIndex - itemsPerView >= 0) {
          setCurrentIndex(Math.max(currentIndex - itemsPerView, 0));
        }
      };

      const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartTime.current = Date.now();
      };

      const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
        e.preventDefault(); // 防止页面滚动
      };

      const handleTouchEnd = () => {
        touchEndTime.current = Date.now();
        const distance = touchStartX.current - touchEndX.current;
        const time = touchEndTime.current - touchStartTime.current;

        // 计算滑动速度和距离，优化滑动体验
        const velocity = Math.abs(distance) / time;

        // 如果滑动速度快或距离大，则触发翻页
        if (Math.abs(distance) > 50 || (Math.abs(distance) > 20 && velocity > 0.5)) {
          if (distance > 0) {
            handleNext(); // 向左滑动，显示下一组
          } else {
            handlePrev(); // 向右滑动，显示上一组
          }
        }
      };

      const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault(); // 禁止产品展示框的滚动
      };

      // 计算每个卡片的宽度百分比
      const getCardWidth = () => {
        if (isMobile) return 100; // 手机上一个卡片占100%
        if (isTablet) return 50;  // 平板上一个卡片占50%
        return 33.33;            // 桌面上一个卡片占33.33%
      };

      // 计算当前应该隐藏哪些按钮
      const shouldHideLeftButton = currentIndex === 0;
      const shouldHideRightButton = () => {
        const itemsPerView = isMobile ? 1 : isTablet ? 2 : 3;
        return currentIndex + itemsPerView >= products.length;
      };

      return (
        <div
          className="product-carousel"
          onWheel={handleWheel} // 禁用鼠标滚轮在展示框内部的滚动
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          aria-label="Product Carousel"
          role="region"
        >
          <button
            className={`carousel-button left ${shouldHideLeftButton ? 'hidden' : ''}`}
            onClick={handlePrev}
            aria-label="Previous products"
            disabled={shouldHideLeftButton}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="product-cards-wrapper">
            <div
              className="product-cards"
              style={{ transform: `translateX(-${currentIndex * getCardWidth()}%)` }}
              aria-live="polite"
            >
              {products.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
            </div>
          </div>

          <button
            className={`carousel-button right ${shouldHideRightButton() ? 'hidden' : ''}`}
            onClick={handleNext}
            aria-label="Next products"
            disabled={shouldHideRightButton()}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      );
    };

    export default ProductCarousel;