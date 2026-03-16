'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
} from 'react-icons/fa';
import { HiDownload } from 'react-icons/hi';
import { portfolioConfig } from '../config/portfolio';

const { personal } = portfolioConfig;

const socialLinks = [
  { href: personal.facebook, icon: FaFacebook, label: 'Facebook' },
  { href: personal.twitter, icon: FaTwitter, label: 'Twitter' },
  { href: personal.github, icon: FaGithub, label: 'GitHub' },
  { href: personal.linkedin, icon: FaLinkedin, label: 'LinkedIn' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut', delay: 0.4 },
  },
};

export default function Hero() {
  const hasImage = false; // Set to true once image assets are added

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center pt-20"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at 60% 50%, rgba(180,180,239,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="section-container w-full py-16">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left max-w-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              className="text-xl sm:text-2xl font-semibold mb-2"
              variants={itemVariants}
            >
              {personal.tagline}
            </motion.p>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold accent-text mb-3"
              variants={itemVariants}
            >
              {personal.shortName}
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl font-semibold mb-6"
              variants={itemVariants}
            >
              {personal.intro}{' '}
              <span className="accent-text">{personal.title}</span>
            </motion.p>

            <motion.p
              className="text-base sm:text-lg leading-relaxed mb-8 opacity-80 max-w-xl mx-auto lg:mx-0"
              variants={itemVariants}
            >
              {personal.description}
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="flex justify-center lg:justify-start gap-4 mb-8"
              variants={itemVariants}
            >
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-4"
              variants={itemVariants}
            >
              <a
                href={personal.cvLink}
                className="btn-primary flex items-center gap-2"
                download
              >
                <HiDownload className="w-5 h-5" />
                Download CV
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-outline"
              >
                Hire Me
              </a>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="flex-shrink-0"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <div
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden"
              style={{
                border: '3px solid var(--accent)',
                boxShadow: '0 0 40px rgba(180,180,239,0.25)',
              }}
            >
              {hasImage ? (
                <Image
                  src={personal.profileImage}
                  alt={`${personal.name} profile photo`}
                  fill
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-6xl lg:text-8xl font-extrabold"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--bg-secondary), var(--bg-deep))',
                    color: 'var(--accent)',
                  }}
                  aria-label={`${personal.name} initials`}
                >
                  TM
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById('about')
              ?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Scroll to about section"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            className="w-0.5 h-8"
            style={{ background: 'var(--accent)' }}
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </a>
      </motion.div>
    </section>
  );
}
