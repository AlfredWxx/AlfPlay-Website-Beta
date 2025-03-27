import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

interface ContactFormProps {
  onClose: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps) {
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
      const apiUrl = import.meta.env.DEV ? '' : 'https://alfplay.com';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      const responseData = await response.json();
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
    <div className="relative">
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 z-50 transition-colors duration-200"
      >
        <X className="h-6 w-6" />
      </button>
      <div className="p-6 pt-16">
        <div className="w-4/5 mx-auto">
          <div className="mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-600 text-lg">Looking for support or a quote? We are here for you! Please fill out the form below and we will get back to you as soon as possible!</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="organization"
                placeholder="Organization"
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-alfblue focus:ring-alfblue p-2 placeholder-gray-400 transition-colors duration-200"
              />
            </div>

            <div>
              <input
                type="text"
                name="fullName"
                required
                placeholder="Full Name *"
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-alfblue focus:ring-alfblue p-2 placeholder-gray-400 transition-colors duration-200"
              />
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone *"
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-alfblue focus:ring-alfblue p-2 placeholder-gray-400 transition-colors duration-200"
              />
            </div>
            
            <div>
              <input
                type="email"
                name="email"
                required
                placeholder="Email *"
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-alfblue focus:ring-alfblue p-2 placeholder-gray-400 transition-colors duration-200"
              />
            </div>

            <div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-alfblue focus:ring-alfblue p-2 placeholder-gray-400 transition-colors duration-200"
              />
            </div>
            
            <div>
              <textarea
                name="message"
                rows={4}
                required
                placeholder="Message *"
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-alfblue focus:ring-alfblue p-2 placeholder-gray-400 transition-colors duration-200"
              ></textarea>
            </div>

            {submitStatus === 'success' && (
              <div className="text-green-600 text-sm opacity-100 transition-opacity duration-200">
                Thank you for your message! We will get back to you soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="text-red-600 text-sm opacity-100 transition-opacity duration-200">
                Sorry, there was an error sending your message. Please try again.
                <br />
                <span className="text-xs">Error details: {errorMessage}</span>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center bg-alfblue text-white px-4 py-2 rounded-md hover:bg-alfgreen transition-all duration-200 disabled:bg-gray-400"
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}