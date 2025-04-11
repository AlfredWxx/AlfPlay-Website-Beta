import React from 'react';
import { useTranslation } from 'react-i18next';
import './HomeSlogan.css';

const HomeSlogan: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <section className="home-slogan">
      <div className="slogan-container">
        <h1 className="slogan-title">{t('homeSlogan.title')}</h1>
      </div>
    </section>
  );
};

export default HomeSlogan;
