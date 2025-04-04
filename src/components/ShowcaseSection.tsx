import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ShowcaseItem {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

interface ShowcaseSectionProps {
  title: string;
  items: ShowcaseItem[];
  className?: string;
}

export default function ShowcaseSection({ title, items, className = '' }: ShowcaseSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // 检测是否为移动设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 更新按钮显示状态
  useEffect(() => {
    const visibleItems = isMobile ? 2 : 3;
    if (currentIndex === 0) {
      setShowLeftButton(false);
    } else {
      setShowLeftButton(true);
    }

    const maxIndex = items.length - visibleItems;
    if (currentIndex >= maxIndex) {
      setShowRightButton(false);
    } else {
      setShowRightButton(true);
    }
  }, [currentIndex, isMobile, items.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating) return;
      
      const delta = e.deltaX || e.deltaY;
      if (delta > 0) {
        scrollItems('right');
      } else if (delta < 0) {
        scrollItems('left');
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      if (isAnimating) return;
      setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (isAnimating) return;
      setTouchEnd(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
      if (isAnimating) return;
      if (touchStart && touchEnd) {
        const diff = touchStart - touchEnd;
        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            scrollItems('right');
          } else {
            scrollItems('left');
          }
        }
      }
      setTouchStart(null);
      setTouchEnd(null);
    };

    // 使用非被动事件监听器
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isAnimating, touchStart, touchEnd]);

  const scrollItems = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    
    const visibleItems = isMobile ? 2 : 3;
    const itemWidth = containerRef.current.offsetWidth / visibleItems;
    const gap = 20;
    const scrollAmount = (itemWidth + gap) * visibleItems;
    
    const newIndex = direction === 'left' 
      ? Math.max(0, currentIndex - visibleItems)
      : Math.min(items.length - visibleItems, currentIndex + visibleItems);
    
    containerRef.current.scrollTo({
      left: newIndex * (itemWidth + gap),
      behavior: 'smooth'
    });
    
    setCurrentIndex(newIndex);
  };

  return (
    <div className={`py-8 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
        </div>
        
        <div className="relative">
          <div 
            ref={containerRef}
            className="flex gap-5 px-[8%] overflow-hidden"
            style={{ 
              width: isMobile ? 'calc(100vw - 16%)' : 'calc(100vw - 16%)'
            }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="flex-none bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                style={{
                  width: isMobile ? 'calc(50% - 10px)' : 'calc(33.33% - 13.33px)'
                }}
              >
                <a href={item.link} className="block">
                  <div className="aspect-[3/4] relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">{item.title}</h3>
                    <p className="text-base sm:text-lg text-gray-600">{item.description}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
          
          {showLeftButton && (
            <button
              onClick={() => scrollItems('left')}
              className={`absolute left-[3%] top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-alfblue transition-colors ${
                showLeftButton ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          
          {showRightButton && (
            <button
              onClick={() => scrollItems('right')}
              className={`absolute right-[3%] top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-alfblue transition-colors ${
                showRightButton ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 