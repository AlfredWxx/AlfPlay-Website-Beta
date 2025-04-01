import React from 'react';
import { Link } from 'react-router-dom';

interface PlanningPreviewProps {
  isVisible: boolean;
  onMouseLeave: () => void;
}

export default function PlanningPreview({ isVisible, onMouseLeave }: PlanningPreviewProps) {
  return (
    <div 
      className={`fixed top-16 left-0 w-full bg-white shadow-lg transform transition-all duration-300 ease-in-out pointer-events-none opacity-0 z-30 ${
        isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0'
      }`}
      onMouseLeave={onMouseLeave}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">游戏规划</h2>
            <p className="text-gray-600">
              我们正在开发多个令人兴奋的游戏项目，包括角色扮演、策略和休闲游戏等多种类型。
            </p>
            <Link 
              to="/planning" 
              className="inline-block bg-alfyellow text-white px-6 py-3 rounded-md hover:bg-white hover:text-alfyellow transition-colors"
            >
              查看详情
            </Link>
          </div>
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800">开发路线图</h2>
            <p className="text-gray-600">
              了解我们未来的游戏开发计划，包括即将推出的新游戏和现有游戏的更新计划。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 