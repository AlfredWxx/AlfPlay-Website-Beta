import { useState, useEffect } from 'react';

interface HeaderScrollState {
  isScrolled: boolean;
  isVisible: boolean;
}

export function useHeaderScroll(): HeaderScrollState {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (currentScrollY / (documentHeight - windowHeight)) * 100;
      
      // 判断是否在顶部5%范围内
      if (scrollPercentage <= 5) {
        setIsScrolled(false);
        setIsVisible(true);
      } else {
        setIsScrolled(true);
        
        // 判断是否到达底部
        if (currentScrollY + windowHeight >= documentHeight - 10) {
          setIsVisible(true);
        } else {
          // 根据滚动方向决定是否显示header
          if (currentScrollY > lastScrollY) {
            // 向下滚动
            setIsVisible(false);
          } else {
            // 向上滚动
            setIsVisible(true);
          }
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return { isScrolled, isVisible };
}
