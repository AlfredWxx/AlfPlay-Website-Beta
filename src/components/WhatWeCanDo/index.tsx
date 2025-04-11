import React from 'react';
import { useTranslation } from 'react-i18next';
import { Activity, Users, Award, Zap } from 'lucide-react';
import './WhatWeCanDo.css';

const WhatWeCanDo: React.FC = () => {
  const { t } = useTranslation('common');

  const services = [
    {
      icon: <Activity size={48} />,
      title: t('whatWeCanDo.service1.title'),
      description: t('whatWeCanDo.service1.description')
    },
    {
      icon: <Users size={48} />,
      title: t('whatWeCanDo.service2.title'),
      description: t('whatWeCanDo.service2.description')
    },
    {
      icon: <Award size={48} />,
      title: t('whatWeCanDo.service3.title'),
      description: t('whatWeCanDo.service3.description')
    },
    {
      icon: <Zap size={48} />,
      title: t('whatWeCanDo.service4.title'),
      description: t('whatWeCanDo.service4.description')
    }
  ];

  return (
    <section className="what-we-can-do">
      <div className="services-container">
        <h2 className="services-title">{t('whatWeCanDo.title')}</h2>
        <p className="services-subtitle">{t('whatWeCanDo.subtitle')}</p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeCanDo;
