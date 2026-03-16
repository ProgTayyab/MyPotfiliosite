'use client';

import { motion } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
} from 'react-icons/fa';
import { portfolioConfig } from '../config/portfolio';

const { personal } = portfolioConfig;

const socialLinks = [
  { href: personal.facebook, icon: FaFacebook, label: 'Facebook' },
  { href: personal.twitter, icon: FaTwitter, label: 'Twitter' },
  { href: personal.github, icon: FaGithub, label: 'GitHub' },
  { href: personal.linkedin, icon: FaLinkedin, label: 'LinkedIn' },
];

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="py-12 lg:py-16"
      style={{ backgroundColor: '#000000' }}
    >
      <div className="section-container">
        <motion.div
          className="flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="text-3xl font-extrabold"
            style={{ color: 'var(--accent)' }}
          >
            ProgTayyab
          </a>

          {/* Tagline */}
          <p
            className="text-center max-w-md leading-relaxed text-sm sm:text-base"
            style={{ color: 'var(--text-muted)' }}
          >
            A passionate Full Stack Developer with 3+ years of experience.
            <br />I specialize in crafting seamless web experiences.
          </p>

          {/* Nav Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-sm transition-colors hover:opacity-100 opacity-70"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links */}
          <div className="flex gap-4" role="list" aria-label="Social media links">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label={label}
                role="listitem"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Divider */}
          <div
            className="w-full h-px"
            style={{ background: 'rgba(255,255,255,0.1)' }}
            aria-hidden="true"
          />

          {/* Copyright */}
          <p
            className="text-sm font-light"
            style={{ color: 'var(--text-muted)' }}
          >
            &copy; 2023&ndash;{currentYear} ProgTayyab. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
