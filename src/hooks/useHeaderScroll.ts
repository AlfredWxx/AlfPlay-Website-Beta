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
    // 智能检测何时收缩header
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 尝试获取hero heading元素
      // 根据Home.tsx的结构，h1元素位于.max-w-4xl div内
      const heroHeading = document.querySelector('.max-w-4xl h1');

      // 如果找到hero heading，基于它的位置决定header状态
      if (heroHeading) {
        const heroRect = heroHeading.getBoundingClientRect();
        // 当hero heading的顶部接近或超出视口顶部时收缩header
        // 80是header的高度，根据实际调整
        if (heroRect.top <= 80) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      } else {
        // 如果找不到hero heading元素，回退到简单逻辑
        setIsScrolled(currentScrollY > 20);
      }

      // 判断是否到达底部
      if (currentScrollY + windowHeight >= documentHeight - 10) {
        setIsVisible(true);
      } else {
        // 根据滚动方向决定是否显示header
        if (currentScrollY > lastScrollY && isScrolled) {
          // 向下滚动且已经收缩
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          // 向上滚动
          setIsVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    // 添加滚动事件监听器
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 初始运行一次以设置初始状态
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isScrolled]);

  return { isScrolled, isVisible };
}
