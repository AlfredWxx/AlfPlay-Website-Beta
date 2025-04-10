import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ContactSection() {
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
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(responseData?.message || `HTTP error! status: ${response.status}`);
      }

      setSubmitStatus('success');
      form.reset();
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
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* 标题部分 - 在小屏幕上占据全宽 */}
          <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              {t('contactform.title')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              {t('contactform.subtitle.titles1')}
            </p>
          </div>

          {/* 表单部分 - 在小屏幕上占据全宽 */}
          <div className="w-full lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="sr-only">{t('contactform.form.name')}</label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    required
                    placeholder={t('contactform.form.name')}
                    className="mt-1 block w-full h-12 sm:h-14 rounded-md shadow-sm focus:border-alfblue focus:ring-alfblue p-2 placeholder-gray-400 transition-colors duration-200 bg-gray-100"
                  />
                </div>

                <div>
                  <label htmlFor="organization" className="sr-only">{t('contactform.form.organization')}</label>
                  <input
                    id="organization"
                    type="text"
                    name="organization"
                    placeholder={t('contactform.form.organization')}
                    className="mt-1 block w-full h-12 sm:h-14 rounded-lg shadow-sm focus:border-alfblue focus:ring-alfblue p-2 placeholder-gray-400 transition-colors duration-200 bg-gray-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="sr-only">{t('contactform.form.email')}</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder={t('contactform.form.email')}
                    className="mt-1 block w-full h-12 sm:h-14 rounded-md shadow-sm focus:border-alfblue focus:ring-alfblue p-2 placeholder-gray-400 transition-colors duration-200 bg-gray-100"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="sr-only">{t('contactform.form.phone')}</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    required
                    placeholder={t('contactform.form.phone')}
                    className="mt-1 block w-full h-12 sm:h-14 rounded-md shadow-sm focus:border-alfblue focus:ring-alfblue p-2 placeholder-gray-400 transition-colors duration-200 bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="sr-only">{t('contactform.form.address')}</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  placeholder={t('contactform.form.address')}
                  className="mt-1 block w-full h-12 sm:h-14 rounded-md shadow-sm focus:border-alfblue focus:ring-alfblue p-2 placeholder-gray-400 transition-colors duration-200 bg-gray-100"
                />
              </div>

              <div>
                <label htmlFor="message" className="sr-only">{t('contactform.form.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder={t('contactform.form.message')}
                  className="mt-1 block w-full rounded-md shadow-sm focus:border-alfblue focus:ring-alfblue p-3 placeholder-gray-400 transition-colors duration-200 bg-gray-100"
                ></textarea>
              </div>

              {submitStatus === 'success' && (
                <div className="text-green-600 text-sm opacity-100 transition-opacity duration-200 p-3 bg-green-50 rounded-md">
                  {t('contactform.success')}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="text-red-600 text-sm opacity-100 transition-opacity duration-200 p-3 bg-red-50 rounded-md">
                  {t('contactform.error')}
                  <br />
                  <span className="text-xs">{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center bg-alfblue text-white px-6 py-3 rounded-md hover:bg-white hover:text-alfblue hover:border-alfblue border-2 border-alfblue transition-all duration-200 disabled:bg-gray-400 shadow-md"
              >
                {isSubmitting ? t('contactform.form.submitting') : t('contactform.form.submit')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}