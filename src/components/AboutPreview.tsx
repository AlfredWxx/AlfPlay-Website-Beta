import React from 'react';
import { Link } from 'react-router-dom';

interface AboutPreviewProps {
  isVisible: boolean;
  onMouseLeave: () => void;
}

export default function AboutPreview({ isVisible, onMouseLeave }: AboutPreviewProps) {
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
            <h2 className="text-2xl font-bold text-gray-800">关于我们</h2>
            <p className="text-gray-600">
              AlfPlay 致力于为用户提供最优质的游戏体验。我们相信，游戏不仅仅是娱乐，更是一种艺术形式。
            </p>
            <Link 
              to="/about" 
              className="inline-block bg-alfyellow text-white px-6 py-3 rounded-md hover:bg-white hover:text-alfyellow transition-colors"
            >
              了解更多
            </Link>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">我们的使命</h2>
            <p className="text-gray-600">
              通过创新和技术，为全球玩家带来独特的游戏体验，让每个人都能在游戏中找到属于自己的快乐。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 