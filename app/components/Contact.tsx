'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
} from 'react-icons/fi';
import { portfolioConfig } from '../config/portfolio';

const { personal } = portfolioConfig;

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }
  return errors;
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus('loading');
    // Simulate API call — replace with actual form handler (e.g. Formspree)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
  };

  const contactDetails = [
    {
      icon: FiMail,
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: personal.phone,
      href: `tel:${personal.phone.replace(/\s/g, '')}`,
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: personal.address,
      href: null,
    },
  ];

  return (
    <section id="contact" className="py-24 lg:py-32" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Get In <span style={{ color: 'var(--accent)' }}>Touch</span>
          </h2>
          <p className="section-subtitle">
            Have a question or want to work together? Reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-bold mb-6">Let&apos;s talk!</h3>
            <p className="mb-8 opacity-80 leading-relaxed">
              I&apos;m always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision. Feel free to reach out!
            </p>

            <div className="space-y-6">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(180,180,239,0.15)',
                      color: 'var(--accent)',
                    }}
                    aria-hidden="true"
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-1"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="font-medium hover:underline transition-colors"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {status === 'success' ? (
              <div
                className="card flex flex-col items-center justify-center text-center py-16 gap-4"
                role="alert"
                aria-live="polite"
              >
                <FiCheckCircle
                  className="w-16 h-16"
                  style={{ color: 'var(--accent)' }}
                />
                <h3 className="text-xl font-bold">Message Sent!</h3>
                <p style={{ color: 'var(--text-muted)' }}>
                  Thank you for reaching out. I&apos;ll get back to you soon!
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-outline mt-4"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="card space-y-6"
                noValidate
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Tayyab Marwat"
                    className={`w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors ${
                      errors.name ? 'ring-2 ring-red-500' : ''
                    }`}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(180,180,239,0.2)',
                      color: 'var(--text-primary)',
                    }}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      className="mt-1 text-xs flex items-center gap-1 text-red-400"
                      role="alert"
                    >
                      <FiAlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Email <span aria-hidden="true">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="tayyab@example.com"
                    className={`w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors ${
                      errors.email ? 'ring-2 ring-red-500' : ''
                    }`}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(180,180,239,0.2)',
                      color: 'var(--text-primary)',
                    }}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-1 text-xs flex items-center gap-1 text-red-400"
                      role="alert"
                    >
                      <FiAlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    className={`w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors resize-none ${
                      errors.message ? 'ring-2 ring-red-500' : ''
                    }`}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(180,180,239,0.2)',
                      color: 'var(--text-primary)',
                    }}
                    aria-describedby={
                      errors.message ? 'message-error' : undefined
                    }
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="mt-1 text-xs flex items-center gap-1 text-red-400"
                      role="alert"
                    >
                      <FiAlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <span
                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
                        aria-hidden="true"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>

                {status === 'error' && (
                  <p className="text-center text-sm text-red-400" role="alert">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
