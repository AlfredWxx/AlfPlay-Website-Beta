import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <div 
        className="h-[78vh] bg-gray-500 flex items-center relative"
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
            Page Developing 🏋️‍♀️🏋️‍♀️
          </h1>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
            About Alfplay
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white drop-shadow-lg">
            Learn about our mission to make learning fun and exciting
          </p>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 mb-8">
              Discover how we started and what drives us to create innovative educational toys and games.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Add your about content here */}
        </div>
      </div>
    </div>
  );
}