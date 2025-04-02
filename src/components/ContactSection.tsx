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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* 标题部分 - 在小屏幕上占据全宽 */}
          <div className="w-full lg:w-1/3">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t('contactform.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('contactform.subtitle.titles1')}
            </p>
          </div>

          {/* 表单部分 - 在小屏幕上占据全宽 */}
          <div className="w-full lg:w-2/3">
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
                className="inline-flex items-center bg-alfblue text-white px-6 py-3 rounded-md hover:bg-alfgreen transition-all duration-200 disabled:bg-gray-400"
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