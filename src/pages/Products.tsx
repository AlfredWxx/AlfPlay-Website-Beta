import React from 'react';
import ContactSection from '../components/ContactSection';

export default function Products() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Products</h1>
        <p className="text-gray-600">Products page content will go here.</p>
      </div>
      <ContactSection />
    </div>
  );
}