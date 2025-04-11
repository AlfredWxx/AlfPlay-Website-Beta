import React from 'react';
import { useTranslation } from 'react-i18next';
import './HomeSlogan.css';

const HomeSlogan: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <section className="home-slogan">
      <div className="slogan-container">
        <h1 className="slogan-title">{t('homeSlogan.title')}</h1>
        <p className="slogan-subtitle">{t('homeSlogan.subtitle')}</p>
        <div className="slogan-cta">
          <button className="slogan-button primary">{t('homeSlogan.primaryButton')}</button>
          <button className="slogan-button secondary">{t('homeSlogan.secondaryButton')}</button>
        </div>
      </div>
    </section>
  );
};

export default HomeSlogan;
