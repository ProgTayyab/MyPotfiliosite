'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { portfolioConfig } from '../config/portfolio';

const { personal, about, education, experience, pastRoles } = portfolioConfig;

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function TimelineList({
  title,
  items,
}: {
  title: string;
  items: { institution?: string; company?: string; degree?: string; role?: string; period: string }[];
}) {
  return (
    <div>
      <h3
        className="text-xl font-bold mb-6"
        style={{ color: 'var(--accent)' }}
      >
        {title}
      </h3>
      <ul className="space-y-0">
        {items.map((item, i) => (
          <li key={i} className="timeline-item">
            <h4 className="font-semibold text-base">
              {item.institution ?? item.company}
            </h4>
            <p className="text-sm mt-0.5" style={{ color: 'var(--accent)' }}>
              {item.degree ?? item.role}
            </p>
            <span
              className="text-xs mt-1 block"
              style={{ color: 'var(--text-muted)' }}
            >
              {item.period}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const hasImage = false;

  return (
    <section
      id="about"
      className="py-24 lg:py-32"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
      ref={ref}
    >
      <div className="section-container">
        {/* About Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          {/* Image */}
          <motion.div
            className="flex justify-center"
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div
              className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden"
              style={{
                border: '2px solid var(--accent)',
                boxShadow: '0 0 30px rgba(180,180,239,0.15)',
              }}
            >
              {hasImage ? (
                <Image
                  src={personal.aboutImage}
                  alt={`${personal.name} about photo`}
                  fill
                  sizes="(max-width: 640px) 256px, 320px"
                  className="object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-5xl font-extrabold"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--bg-primary), var(--bg-deep))',
                    color: 'var(--accent)',
                  }}
                >
                  TM
                </div>
              )}
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <h2 className="section-title text-left mb-2">
              About <span style={{ color: 'var(--accent)' }}>Me</span>
            </h2>
            <h3
              className="text-2xl font-semibold mb-6"
              style={{ color: 'var(--accent)' }}
            >
              {about.subtitle}
            </h3>
            <p className="text-base leading-relaxed mb-8 opacity-80">
              {about.description}
            </p>
            <a href={personal.cvLink} className="btn-primary" download>
              More About Me
            </a>
          </motion.div>
        </div>

        {/* Education & Experience */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.3 }}
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
            style={{ color: 'var(--accent)' }}
          >
            Education &amp; Work Experience
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <TimelineList title="Education" items={education} />
            <TimelineList title="Experience" items={experience} />
            <TimelineList title="Past Roles" items={pastRoles} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
