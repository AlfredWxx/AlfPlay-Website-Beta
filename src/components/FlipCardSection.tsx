import React, { useState, useEffect, useRef } from 'react';

// 颜色和时间常量
const COLORS = {
  black: '#000000',
  darkGray: '#333333'
};

const TIMING = {
  switchInterval: 5000,    // 整体切换间隔
  animationDuration: 800,  // 动画时长
  wheelSteps: 8           // 滚动步数
};

// 字符轮
const CHAR_WHEEL = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!? ';


interface SplitFlapProps {
  value: string;
  isAnimating: boolean;
  delay: number; // 新增：翻动延迟
}

const DISPLAY_TEXTS = [
  'WELCOME',
  'TO',
  "ALFPLAY",
  'PLAYGROUND!',
  'WELCOME',
  'TO',
  "ALFPLAY",
  'PLAYGROUND!',
  'INNOVATIVE',
  'SAFE',
  'FUN',
  'FOR',
  'KIDS'
];

const TOTAL_CARDS = 11;  // 固定卡片数量

// 计算文字应该从哪个位置开始显示
const getStartPosition = (text: string) => {
  return Math.floor((TOTAL_CARDS - text.length) / 2);
};

// 获取随机过渡字符
const getRandomChar = () => {
  return CHAR_WHEEL[Math.floor(Math.random() * CHAR_WHEEL.length)];
};

// 单个翻片组件
const SplitFlap: React.FC<SplitFlapProps> = ({ value, isAnimating, delay }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [isWheeling, setIsWheeling] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      setTimeout(() => {
        setIsWheeling(true);
  
        const chars = Array(TIMING.wheelSteps).fill(null).map(() => getRandomChar());
        chars.push(value);
  
        chars.forEach((char, index) => {
          setTimeout(() => {
            setDisplayValue(char);
            if (index === chars.length - 1) {
              setIsWheeling(false);
            }
          }, (TIMING.animationDuration / chars.length) * index);
        });
  
      }, delay); // 👈 加入延迟
    }
  }, [value, isAnimating, delay]);
  

  return (
    <div className="split-flap-digit">
      <div className={`split-flap-card ${isWheeling ? 'wheeling' : ''}`}>
        <div className="split-flap-top">
          <div className="char-display">{displayValue || ' '}</div>
        </div>
        <div className="split-flap-bottom">
          <div className="char-display">{displayValue || ' '}</div>
        </div>
      </div>
    </div>
  );
};

// 翻片显示器组件
const FlipCardSection: React.FC = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let intervalId: NodeJS.Timeout;

    // 首次进入视口时，直接显示第一个文本
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);

      // 设置后续的定时切换
      intervalId = setInterval(() => {
        setCurrentTextIndex((prev) => {
          const nextIndex = (prev + 1) % DISPLAY_TEXTS.length;
          return nextIndex;
        });
        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
        }, TIMING.animationDuration);
      }, TIMING.switchInterval);
    }, TIMING.animationDuration);


    return () => {
      clearInterval(intervalId);
    };
  }, [hasStarted]);

  const currentText = DISPLAY_TEXTS[currentTextIndex];
  const startPos = getStartPosition(currentText);

  return (
    <div className="split-flap-display" ref={containerRef}>
      <div className="split-flap-container">
      {Array(TOTAL_CARDS).fill(null).map((_, index) => {
        const charIndex = index - startPos;
        const value = charIndex >= 0 && charIndex < currentText.length 
          ? currentText[charIndex] 
          : '';
        return (
          <SplitFlap 
            key={index} 
            value={value} 
            isAnimating={isAnimating} 
            delay={Math.random() * 800}
          />
        );
      })}
      </div>
    </div>
  );
};

export default FlipCardSection; 