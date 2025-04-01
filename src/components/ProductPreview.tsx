import React from 'react';
import { Link } from 'react-router-dom';

interface ProductPreviewProps {
  isVisible: boolean;
  onMouseLeave: () => void;
}

export default function ProductPreview({ isVisible, onMouseLeave }: ProductPreviewProps) {
  return (
    <div 
      className={`fixed top-16 left-0 w-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out pointer-events-none opacity-0 z-30 ${
        isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full'
      }`}
      onMouseLeave={onMouseLeave}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">我们的产品</h2>
            <p className="text-gray-600">
              探索 AlfPlay 的游戏世界，体验独特的游戏乐趣。
            </p>
            <Link 
              to="/products" 
              className="inline-block bg-alfyellow text-white px-6 py-3 rounded-md hover:bg-white hover:text-alfyellow transition-colors"
            >
              浏览产品
            </Link>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">特色功能</h2>
            <p className="text-gray-600">
              创新的游戏机制，精美的视觉效果，让您的游戏体验更加精彩。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 