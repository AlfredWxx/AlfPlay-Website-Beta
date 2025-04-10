import { useState, useEffect } from 'react';

// 设备类型定义
export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'largeDesktop';

interface ResponsiveState {
  isMobile: boolean;      // < 640px
  isTablet: boolean;      // >= 640px && < 1024px
  isDesktop: boolean;     // >= 1024px && < 1280px
  isLargeDesktop: boolean; // >= 1280px
  deviceType: DeviceType;
  width: number;
  height: number;
}

export function useResponsive(): ResponsiveState {
  // 初始状态设置为默认值
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
    deviceType: 'mobile',
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // 初始检测
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // 与Tailwind断点保持一致
      const isMobile = width < 640;
      const isTablet = width >= 640 && width < 1024;
      const isDesktop = width >= 1024 && width < 1280;
      const isLargeDesktop = width >= 1280;
      
      let deviceType: DeviceType = 'mobile';
      if (isLargeDesktop) deviceType = 'largeDesktop';
      else if (isDesktop) deviceType = 'desktop';
      else if (isTablet) deviceType = 'tablet';
      
      setState({
        isMobile,
        isTablet,
        isDesktop,
        isLargeDesktop,
        deviceType,
        width,
        height,
      });
    };
    
    // 初始检测
    checkDevice();
    
    // 添加窗口大小变化监听
    window.addEventListener('resize', checkDevice);
    
    // 清理函数
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);
  
  return state;
}
