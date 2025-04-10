import React from 'react';
import { Link } from 'react-router-dom';
import { X, Globe, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MobileMenuProps {
  onClose: () => void;
  onOpenContact: () => void;
  onOpenLanguage: () => void;
  isActive: (path: string) => boolean;
  isScrolled: boolean;
}

export default function MobileMenu({
  onClose,
  onOpenContact,
  onOpenLanguage,
  isActive,
  isScrolled
}: MobileMenuProps) {
  const { t } = useTranslation('common');

  return (
    <div className="relative h-full overflow-y-auto bg-white">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 z-[80] transition-colors duration-200 p-2"
        aria-label="Close menu"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="p-6 pt-16 pb-24"> {/* 增加底部padding，确保内容不被遮挡 */}
        <div className="w-full px-4 mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-3">
              <img src="/images/AlfPlayLogo-removebg.png" alt="AlfPlay Logo" className="h-16 w-auto" />
              <span className="text-2xl font-bold drop-shadow-lg text-gray-800">
                AlfPlay
              </span>
            </div>
          </div>

          {/* 主导航链接 - 增大点击区域 */}
          <nav className="mb-8">
            <ul className="space-y-1">
              <li>
                <Link
                  to="/"
                  onClick={onClose}
                  className={`flex items-center justify-between w-full p-4 rounded-lg ${isActive('/') ? 'bg-alfgrey text-alfblue' : 'text-gray-800'} hover:bg-alfgrey hover:text-alfblue transition-colors`}
                >
                  <span className="text-lg font-medium">{t('header.nav.home')}</span>
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  onClick={onClose}
                  className={`flex items-center justify-between w-full p-4 rounded-lg ${isActive('/products') ? 'bg-alfgrey text-alfblue' : 'text-gray-800'} hover:bg-alfgrey hover:text-alfblue transition-colors`}
                >
                  <span className="text-lg font-medium">{t('header.nav.products')}</span>
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </li>
              <li>
                <Link
                  to="/planning"
                  onClick={onClose}
                  className={`flex items-center justify-between w-full p-4 rounded-lg ${isActive('/planning') ? 'bg-alfgrey text-alfblue' : 'text-gray-800'} hover:bg-alfgrey hover:text-alfblue transition-colors`}
                >
                  <span className="text-lg font-medium">{t('header.nav.planning')}</span>
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={onClose}
                  className={`flex items-center justify-between w-full p-4 rounded-lg ${isActive('/about') ? 'bg-alfgrey text-alfblue' : 'text-gray-800'} hover:bg-alfgrey hover:text-alfblue transition-colors`}
                >
                  <span className="text-lg font-medium">{t('header.nav.about')}</span>
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog"
                  onClick={onClose}
                  className={`flex items-center justify-between w-full p-4 rounded-lg ${isActive('/catalog') ? 'bg-alfgrey text-alfblue' : 'text-gray-800'} hover:bg-alfgrey hover:text-alfblue transition-colors`}
                >
                  <span className="text-lg font-medium">{t('header.nav.catalog')}</span>
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </li>
            </ul>
          </nav>

          {/* 快速操作按钮 */}
          <div className="space-y-4 mb-8">
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="w-full bg-alfblue text-white px-6 py-4 rounded-lg hover:bg-white hover:text-alfblue hover:border-alfblue border-2 border-alfblue transition-all duration-300 text-lg font-medium flex items-center justify-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              {t('header.buttons.contact')}
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenLanguage();
              }}
              className="w-full bg-white text-gray-800 px-6 py-4 rounded-lg border-2 border-gray-300 hover:border-alfblue hover:text-alfblue transition-all duration-300 text-lg font-medium flex items-center justify-center"
            >
              <Globe className="h-5 w-5 mr-2" />
              {t('header.buttons.language')}
            </button>
          </div>

          {/* 联系信息 */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">{t('footer.contact.title')}</h3>
            <div className="space-y-3">
              <a href="mailto:AlfPlay.Main@outlook.com" className="flex items-center text-gray-600 hover:text-alfblue transition-colors">
                <Mail className="h-5 w-5 mr-2" />
                <span>{t('footer.contact.email')}</span>
              </a>
              <a href="tel:+12496883003" className="flex items-center text-gray-600 hover:text-alfblue transition-colors">
                <Phone className="h-5 w-5 mr-2" />
                <span>{t('footer.contact.phone')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}