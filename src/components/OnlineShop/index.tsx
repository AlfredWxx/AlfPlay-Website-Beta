import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import './OnlineShop.css';

const OnlineShop: React.FC = () => {
  const { t } = useTranslation('common');

  const products = [
    {
      id: 1,
      name: t('onlineShop.product1.name'),
      price: t('onlineShop.product1.price'),
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: t('onlineShop.product1.category'),
      isNew: true
    },
    {
      id: 2,
      name: t('onlineShop.product2.name'),
      price: t('onlineShop.product2.price'),
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: t('onlineShop.product2.category'),
      isNew: false
    },
    {
      id: 3,
      name: t('onlineShop.product3.name'),
      price: t('onlineShop.product3.price'),
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: t('onlineShop.product3.category'),
      isNew: false
    },
    {
      id: 4,
      name: t('onlineShop.product4.name'),
      price: t('onlineShop.product4.price'),
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: t('onlineShop.product4.category'),
      isNew: true
    }
  ];

  return (
    <section className="online-shop-section">
      <div className="shop-container">
        <h2 className="shop-title">{t('onlineShop.title')}</h2>
        <p className="shop-subtitle">{t('onlineShop.subtitle')}</p>
        
        <div className="shop-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image-container">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="product-image"
                  loading="lazy"
                />
                {product.isNew && (
                  <span className="product-badge">{t('onlineShop.newLabel')}</span>
                )}
                <div className="product-actions">
                  <button className="product-action-btn" aria-label="Add to cart">
                    <ShoppingCart size={20} />
                  </button>
                  <button className="product-action-btn" aria-label="Add to wishlist">
                    <Heart size={20} />
                  </button>
                  <button className="product-action-btn" aria-label="Quick view">
                    <Eye size={20} />
                  </button>
                </div>
              </div>
              <div className="product-content">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <span className="product-price">{product.price}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="shop-cta">
          <a href="/shop" className="shop-button">
            {t('onlineShop.visitShop')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default OnlineShop;
