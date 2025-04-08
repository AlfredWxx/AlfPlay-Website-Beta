import React, { useRef, useState } from 'react';
import '../server/ProductCarousel.css';

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
      const touchStartX = useRef(0);
      const touchEndX = useRef(0);
    
      const handleNext = () => {
        if (currentIndex + 3 < products.length) {
          setCurrentIndex(currentIndex + 3);
        }
      };
    
      const handlePrev = () => {
        if (currentIndex - 3 >= 0) {
          setCurrentIndex(currentIndex - 3);
        }
      };
    
      const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
      };
    
      const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
      };
    
      const handleTouchEnd = () => {
        const distance = touchStartX.current - touchEndX.current;
        
        if (Math.abs(distance) > 5) {  // 滑动距离超过50px认为是有效滑动
          if (distance > 0) {
            handleNext(); // 向右滑动
          } else {
            handlePrev(); // 向左滑动
          }
        }
      };
    
      const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault(); // 禁止产品展示框的滚动
      };
    
      return (
        <div
          className="product-carousel"
          onWheel={handleWheel} // 禁用鼠标滚轮在展示框内部的滚动
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className={`carousel-button left ${currentIndex === 0 ? 'hidden' : ''}`}
            onClick={handlePrev}
          >
            &#8249;
          </button>
    
          <div className="product-cards-wrapper">
            <div className="product-cards" style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}>
              {products.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
            </div>
          </div>
    
          <button
            className={`carousel-button right ${currentIndex + 3 >= products.length ? 'hidden' : ''}`}
            onClick={handleNext}
          >
            &#8250;
          </button>
        </div>
      );
    };
    
    export default ProductCarousel;