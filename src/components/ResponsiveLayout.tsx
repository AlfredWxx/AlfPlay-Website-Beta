import React from 'react';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
  breakpoints?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    '2xl'?: string;
  };
}

export default function ResponsiveLayout({ 
  children, 
  className = '',
  breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
}: ResponsiveLayoutProps) {
  return (
    <div 
      className={`
        w-full mx-auto 
        px-4 sm:px-6 lg:px-8
        max-w-[1536px] min-w-[640px]
        ${className}
      `}
    >
      {children}
    </div>
  );
} 