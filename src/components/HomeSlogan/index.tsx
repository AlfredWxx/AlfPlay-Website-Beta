import React from 'react';
import { useTranslation } from 'react-i18next';
import './HomeSlogan.css';

const HomeSlogan: React.FC = () => {
  const { t, i18n } = useTranslation('common');

  // 为每种语言定义关键词
  const getKeywordsByLanguage = (language: string) => {
    // 默认英语关键词
    const keywordMap: Record<string, string[]> = {
      // 英语关键词
      en: ['home', 'business', 'alfplay', 'full-service', 'playground', 'equipment', 'quality'],

      // 中文关键词
      zh: ['家', '业务', 'alfplay', '全方位服务', '游乐场', '设备', '品质'],

      // 丹麦语关键词
      da: ['hjem', 'forretning', 'alfplay', 'fuld-service', 'legeplads', 'udstyr', 'kvalitet'],

      // 德语关键词
      de: ['heim', 'geschäft', 'alfplay', 'komplettservice', 'spielplatz', 'ausrüstung', 'qualität'],

      // 西班牙语关键词
      es: ['hogar', 'negocio', 'alfplay', 'servicio completo', 'parque infantil', 'equipamiento', 'calidad'],

      // 法语关键词
      fr: ['maison', 'entreprise', 'alfplay', 'service complet', 'aire de jeux', 'équipement', 'qualité'],

      // 可以根据需要添加更多语言
    };

    // 返回当前语言的关键词，如果没有定义则返回英语关键词
    return keywordMap[language] || keywordMap['en'];
  };

  // 获取当前语言的关键词
  const getCurrentKeywords = () => {
    const currentLang = i18n.language.split('-')[0]; // 处理语言代码如 'en-US'
    const keywords = getKeywordsByLanguage(currentLang);

    // 添加调试日志，帮助排查多语言问题
    console.log(`Current language: ${currentLang}`);
    console.log(`Keywords for ${currentLang}:`, keywords);

    return keywords;
  };

  // 将标题文本中的关键词用span包裹并添加类
  const renderTitleWithHighlights = () => {
    // 获取原始标题文本
    const titleText = t('homeSlogan.title');

    // 获取当前语言的关键词
    const keywords = getCurrentKeywords();

    // 如果没有关键词，直接返回原文本
    if (!keywords.length) {
      return titleText;
    }

    // 创建正则表达式来匹配关键词（大小写不敏感）
    // 对于中文等不使用空格分隔的语言，不使用单词边界
    const escapedKeywords = keywords.map(keyword =>
      keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    );

    // 检测当前语言，对于中文等不使用单词边界
    const currentLang = i18n.language.split('-')[0];
    const useWordBoundary = !['zh', 'ja', 'ko'].includes(currentLang);

    // 根据语言类型使用不同的正则表达式
    const regex = useWordBoundary
      ? new RegExp(`\\b(${escapedKeywords.join('|')})\\b`, 'gi') // 使用单词边界
      : new RegExp(`(${escapedKeywords.join('|')})`, 'gi'); // 不使用单词边界

    // 将标题文本分割成段落，并对关键词应用高亮样式
    const parts = titleText.split(regex);

    return (
      <>
        {parts.map((part, index) => {
          // 检查当前部分是否是关键词（忽略大小写）
          const isKeyword = keywords.some(keyword =>
            part.toLowerCase() === keyword.toLowerCase()
          );

          return isKeyword ?
            <span key={index} className="slogan-keyword">{part}</span> :
            <span key={index}>{part}</span>;
        })}
      </>
    );
  };

  return (
    <section className="home-slogan">
      <div className="slogan-background">
        <div className="slogan-gradient"></div>
      </div>
      <div className="slogan-container">
        <div className="slogan-content">
          <h1 className="slogan-title">{renderTitleWithHighlights()}</h1>
          <h2 className="slogan-subtitle">{t('homeSlogan.subtitle')}</h2>
        </div>
      </div>
    </section>
  );
};

export default HomeSlogan;
