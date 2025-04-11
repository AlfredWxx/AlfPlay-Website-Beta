import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';
import './CustomerCase.css';

const CustomerCase: React.FC = () => {
  const { t } = useTranslation('common');

  const cases = [
    {
      id: 1,
      customer: t('customerCase.case1.customer'),
      title: t('customerCase.case1.title'),
      description: t('customerCase.case1.description'),
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 5
    },
    {
      id: 2,
      customer: t('customerCase.case2.customer'),
      title: t('customerCase.case2.title'),
      description: t('customerCase.case2.description'),
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 5
    },
    {
      id: 3,
      customer: t('customerCase.case3.customer'),
      title: t('customerCase.case3.title'),
      description: t('customerCase.case3.description'),
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4
    }
  ];

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        size={18} 
        fill={index < rating ? "#FFD700" : "none"} 
        stroke={index < rating ? "#FFD700" : "#ccc"} 
        className="case-star"
      />
    ));
  };

  return (
    <section className="customer-case-section">
      <div className="case-container">
        <h2 className="case-title">{t('customerCase.title')}</h2>
        <p className="case-subtitle">{t('customerCase.subtitle')}</p>
        
        <div className="case-grid">
          {cases.map((caseItem) => (
            <div className="case-card" key={caseItem.id}>
              <div className="case-image-container">
                <img 
                  src={caseItem.imageUrl} 
                  alt={caseItem.title} 
                  className="case-image"
                  loading="lazy"
                />
              </div>
              <div className="case-content">
                <div className="case-rating">
                  {renderStars(caseItem.rating)}
                </div>
                <h3 className="case-item-title">{caseItem.title}</h3>
                <p className="case-description">{caseItem.description}</p>
                <p className="case-customer">{caseItem.customer}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="case-cta">
          <a href="/cases" className="case-button">
            {t('customerCase.viewAllCases')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default CustomerCase;
