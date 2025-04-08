import React from 'react';
import ResponsiveLayout from '../components/ResponsiveLayout';

export default function ExamplePage() {
  return (
    <ResponsiveLayout className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 内容区域 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">标题 1</h2>
          <p>内容 1</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">标题 2</h2>
          <p>内容 2</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">标题 3</h2>
          <p>内容 3</p>
        </div>
      </div>
    </ResponsiveLayout>
  );
} 