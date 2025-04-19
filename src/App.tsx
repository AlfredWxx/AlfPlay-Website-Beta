import './i18n';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';
import LanguageForm from './components/LanguageForm';
import MobileMenu from './components/MobileMenu';
import SearchForm from './components/SearchForm';
import Home from './pages/Home';
import Planning from './pages/Planning';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Catalog from './pages/Catalog';
import Warranty from './pages/Warranty';
import ExamplePage from './pages/ExamplePage';
import NotFound from './pages/NotFound';
import { LanguageProvider } from './contexts/LanguageContext';

// 创建一个新的组件来处理滚动行为
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [showContact, setShowContact] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isLanguageClosing, setIsLanguageClosing] = useState(false);
  const [isMobileMenuClosing, setIsMobileMenuClosing] = useState(false);
  const [isSearchClosing, setIsSearchClosing] = useState(false);

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
    if (showContact || showLanguage || showMobileMenu || showSearch) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showContact, showLanguage, showMobileMenu, showSearch]);

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

  const handleOpenSearch = () => {
    setShowSearch(true);
    setIsSearchClosing(false);
  };

  const handleCloseSearch = () => {
    setIsSearchClosing(true);
    setTimeout(() => {
      setShowSearch(false);
      setIsSearchClosing(false);
    }, 300);
  };

  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Header
            onOpenContact={handleOpenContact}
            onOpenLanguage={handleOpenLanguage}
            onOpenMobileMenu={handleOpenMobileMenu}
            onOpenSearch={handleOpenSearch}
          />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/warranty" element={<Warranty />} />
              <Route path="/example" element={<ExamplePage />} />
              {/* 通配符路由，处理所有未匹配的路径 */}
              <Route path="*" element={<NotFound />} />
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

          {showSearch && (
            <>
              <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${
                  isSearchClosing ? 'bg-opacity-0' : 'bg-opacity-50'
                } z-[60]`}
                onClick={handleCloseSearch}
              />
              <div
                className={`fixed top-0 left-0 w-full h-[35vh] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
                  isSearchClosing ? '-translate-y-full' : 'translate-y-0'
                } z-[70]`}
              >
                <SearchForm onClose={handleCloseSearch} />
              </div>
            </>
          )}
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;