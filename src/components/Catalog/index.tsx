import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import './Catalog.css';

const Catalog: React.FC = () => {
  const { t } = useTranslation('common');

  const categories = [
    {
      id: 1,
      title: t('catalog.category1.title'),
      description: t('catalog.category1.description'),
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      link: '/catalog/category1'
    },
    {
      id: 2,
      title: t('catalog.category2.title'),
      description: t('catalog.category2.description'),
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      link: '/catalog/category2'
    },
    {
      id: 3,
      title: t('catalog.category3.title'),
      description: t('catalog.category3.description'),
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      link: '/catalog/category3'
    }
  ];

  return (
    <section className="catalog-section">
      <div className="catalog-container">
        <h2 className="catalog-title">{t('catalog.title')}</h2>
        <p className="catalog-subtitle">{t('catalog.subtitle')}</p>
        
        <div className="catalog-grid">
          {categories.map((category) => (
            <div className="catalog-card" key={category.id}>
              <div className="catalog-image-container">
                <img 
                  src={category.imageUrl} 
                  alt={category.title} 
                  className="catalog-image"
                  loading="lazy"
                />
              </div>
              <div className="catalog-content">
                <h3 className="catalog-category-title">{category.title}</h3>
                <p className="catalog-description">{category.description}</p>
                <a href={category.link} className="catalog-link">
                  {t('catalog.viewMore')} <ArrowRight size={16} className="catalog-arrow" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="catalog-cta">
          <a href="/catalog" className="catalog-button">
            {t('catalog.browseAll')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
