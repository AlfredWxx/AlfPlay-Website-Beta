import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ContactFormProps {
  onClose: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const { t } = useTranslation('common');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      organization: formData.get('organization')?.toString() || '',
      fullName: formData.get('fullName')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      address: formData.get('address')?.toString() || '',
      message: formData.get('message')?.toString() || '',
    };

    try {
      const baseUrl = window.location.origin;
      console.log('Sending request to:', `${baseUrl}/api/contact`);
      console.log('Request data:', data);
      
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status);
      const responseData = await response.json().catch(() => null);
      console.log('Response data:', responseData);

      if (!response.ok) {
        throw new Error(responseData?.message || `HTTP error! status: ${response.status}`);
      }

      setSubmitStatus('success');
      form.reset();
      setTimeout(onClose, 2000);
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Network error. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative h-full overflow-y-auto">
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 z-[80] transition-colors duration-200"
      >
        <X className="h-6 w-6" />
      </button>
      <div className="p-6 pt-16">
        <div className="w-4/5 mx-auto">
          <div className="mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">{t('contactform.title')}</h2>
              <p className="text-gray-600 text-lg">{t('contactform.subtitle.titlel1')}</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
          <div>
                <input
                  type="text"
                  name="organization"
                  placeholder={t('contactform.form.organization')}
                  className="mt-1 block w-full h-14 rounded-lg shadow-sm focus:border-alfblue focus:ring-alfblue p-2 placeholder-gray-400 transition-colors duration-200 bg-gray-100"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder={t('contactform.form.name')}
                  className="mt-1 block w-full h-14 rounded-md shadow-sm focus:border-alfblue focus:ring-alfblue p-2 placeholder-gray-400 transition-colors duration-200 bg-gray-100"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder={t('contactform.form.phone')}
                  className="mt-1 block w-full h-14 rounded-md shadow-sm focus:border-alfblue focus:ring-alfblue p-2 placeholder-gray-400 transition-colors duration-200 bg-gray-100"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={t('contactform.form.email')}
                  className="mt-1 block w-full h-14 rounded-md shadow-sm focus:border-alfblue focus:ring-alfblue p-2 placeholder-gray-400 transition-colors duration-200 bg-gray-100"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="address"
                  placeholder={t('contactform.form.address')}
                  className="mt-1 block w-full h-14 rounded-md shadow-sm focus:border-alfblue focus:ring-alfblue p-2 placeholder-gray-400 transition-colors duration-200 bg-gray-100"
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder={t('contactform.form.message')}
                  className="mt-1 block w-full h-14 rounded-md shadow-sm focus:border-alfblue focus:ring-alfblue p-2 placeholder-gray-400 transition-colors duration-200 bg-gray-100"
                ></textarea>
              </div>

            {submitStatus === 'success' && (
              <div className="text-green-600 text-sm opacity-100 transition-opacity duration-200">
                {t('contactform.success')}
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="text-red-600 text-sm opacity-100 transition-opacity duration-200">
                {t('contactform.error')}
                <br />
                <span className="text-xs">{errorMessage}</span>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center bg-alfblue text-white px-4 py-2 rounded-md hover:bg-alfgreen transition-all duration-200 disabled:bg-gray-400"
            >
              {isSubmitting ? t('contactform.form.submitting') : t('contactform.form.submit')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}