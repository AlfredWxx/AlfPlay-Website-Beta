import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';
import LanguageForm from './components/LanguageForm';
import MobileMenu from './components/MobileMenu';
import Home from './pages/Home';
import Planning from './pages/Planning';
import Products from './pages/Products';
import About from './pages/About';

function App() {
  const [showContact, setShowContact] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isLanguageClosing, setIsLanguageClosing] = useState(false);
  const [isMobileMenuClosing, setIsMobileMenuClosing] = useState(false);

  // 添加全局样式
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      html {
        overflow-y: scroll;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // 控制页面滚动
  useEffect(() => {
    if (showContact || showLanguage || showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showContact, showLanguage, showMobileMenu]);

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

  const handleOpenLanguage = () => {
    setShowLanguage(true);
    setIsLanguageClosing(false);
  };

  const handleCloseLanguage = () => {
    setIsLanguageClosing(true);
    setTimeout(() => {
      setShowLanguage(false);
      setIsLanguageClosing(false);
    }, 300);
  };

  const handleOpenMobileMenu = () => {
    setShowMobileMenu(true);
    setIsMobileMenuClosing(false);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuClosing(true);
    setTimeout(() => {
      setShowMobileMenu(false);
      setIsMobileMenuClosing(false);
    }, 300);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header 
          onOpenContact={handleOpenContact} 
          onOpenLanguage={handleOpenLanguage}
          onOpenMobileMenu={handleOpenMobileMenu}
        />
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

        {showLanguage && (
          <>
            <div 
              className={`fixed inset-0 bg-black transition-opacity duration-300 ${
                isLanguageClosing ? 'bg-opacity-0' : 'bg-opacity-50'
              } z-[60]`}
              onClick={handleCloseLanguage}
            />
            <div 
              className={`fixed top-0 right-0 h-full w-full sm:w-[60%] md:w-[45%] lg:w-[30%] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
                isLanguageClosing ? 'translate-x-full' : 'translate-x-0'
              } z-[70]`}
            >
              <LanguageForm onClose={handleCloseLanguage} />
            </div>
          </>
        )}

        {showMobileMenu && (
          <>
            <div 
              className={`fixed inset-0 bg-black transition-opacity duration-300 ${
                isMobileMenuClosing ? 'bg-opacity-0' : 'bg-opacity-50'
              } z-[60]`}
              onClick={handleCloseMobileMenu}
            />
            <div 
              className={`fixed top-0 right-0 h-full w-full sm:w-[80%] md:w-[60%] lg:w-[40%] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
                isMobileMenuClosing ? 'translate-x-full' : 'translate-x-0'
              } z-[70]`}
            >
              <MobileMenu 
                onClose={handleCloseMobileMenu}
                onOpenContact={handleOpenContact}
                onOpenLanguage={handleOpenLanguage}
                isActive={(path) => location.pathname === path}
                isScrolled={window.scrollY > 0}
              />
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;