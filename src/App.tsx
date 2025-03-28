import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';
import Home from './pages/Home';
import Planning from './pages/Planning';
import Products from './pages/Products';
import About from './pages/About';

function App() {
  const [showContact, setShowContact] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // 控制页面滚动
  useEffect(() => {
    if (showContact) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showContact]);

  const handleOpenContact = () => {
    setShowContact(true);
    setIsClosing(false);
  };

  const handleCloseContact = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowContact(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header onOpenContact={handleOpenContact} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planning" element={<Planning />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
        
        {showContact && (
          <>
            <div 
              className={`fixed inset-0 bg-black transition-opacity duration-300 ${
                isClosing ? 'bg-opacity-0' : 'bg-opacity-50'
              } z-[60]`}
              onClick={handleCloseContact}
            />
            <div 
              className={`fixed top-0 right-0 h-full w-full sm:w-[80%] md:w-[60%] lg:w-[40%] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
                isClosing ? 'translate-x-full' : 'translate-x-0'
              } z-[70]`}
            >
              <ContactForm onClose={handleCloseContact} />
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;