'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioConfig } from '../config/portfolio';

const { skills } = portfolioConfig;

const categories = [
  { key: 'frontend' as const, label: 'Frontend', emoji: '🎨' },
  { key: 'backend' as const, label: 'Backend', emoji: '⚙️' },
  { key: 'tools' as const, label: 'Tools & Others', emoji: '🛠️' },
];

function SkillBar({
  name,
  level,
  delay,
  isInView,
}: {
  name: string;
  level: number;
  delay: number;
  isInView: boolean;
}) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">{name}</span>
        <span
          className="text-xs font-semibold"
          style={{ color: 'var(--accent)' }}
        >
          {level}%
        </span>
      </div>
      <div
        className="w-full h-2 rounded-full overflow-hidden"
        style={{ background: 'rgba(180,180,239,0.15)' }}
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} proficiency: ${level}%`}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background:
              'linear-gradient(90deg, var(--accent-dark), var(--accent))',
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="skills"
      className="py-24 lg:py-32"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
      ref={ref}
    >
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            My <span style={{ color: 'var(--accent)' }}>Skills</span>
          </h2>
          <p className="section-subtitle">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, catIndex) => (
            <motion.div
              key={cat.key}
              className="card"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.15 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl" aria-hidden="true">
                  {cat.emoji}
                </span>
                <h3
                  className="text-lg font-bold"
                  style={{ color: 'var(--accent)' }}
                >
                  {cat.label}
                </h3>
              </div>

              {/* Skill Bars */}
              <div>
                {skills[cat.key].map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={catIndex * 0.15 + skillIndex * 0.08}
                    isInView={isInView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            { value: '3+', label: 'Years Experience' },
            { value: '20+', label: 'Projects Completed' },
            { value: '15+', label: 'Happy Clients' },
            { value: '10+', label: 'Technologies' },
          ].map((stat) => (
            <div key={stat.label} className="text-center card py-6">
              <p
                className="text-3xl sm:text-4xl font-extrabold mb-1"
                style={{ color: 'var(--accent)' }}
              >
                {stat.value}
              </p>
              <p
                className="text-sm font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
