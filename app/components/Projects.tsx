'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { portfolioConfig } from '../config/portfolio';

const { projects } = portfolioConfig;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? projects : projects.filter((p) => p.featured);

  return (
    <section id="projects" className="py-24 lg:py-32" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            My <span style={{ color: 'var(--accent)' }}>Projects</span>
          </h2>
          <p className="section-subtitle">
            A showcase of my recent work and personal projects
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {displayed.map((project, index) => (
            <motion.article
              key={index}
              className="card flex flex-col"
              variants={cardVariants}
            >
              {/* Project Header */}
              <div className="flex justify-between items-start mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
                  style={{
                    background: 'rgba(180,180,239,0.15)',
                    color: 'var(--accent)',
                  }}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-60 hover:opacity-100 transition-opacity"
                    style={{ color: 'var(--text-primary)' }}
                    aria-label={`${project.title} GitHub repository`}
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-60 hover:opacity-100 transition-opacity"
                    style={{ color: 'var(--text-primary)' }}
                    aria-label={`${project.title} live demo`}
                  >
                    <FaExternalLinkAlt className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold mb-2">{project.title}</h3>
              <p
                className="text-sm leading-relaxed flex-1 mb-4"
                style={{ color: 'var(--text-muted)' }}
              >
                {project.description}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{
                      background: 'rgba(180,180,239,0.12)',
                      color: 'var(--accent)',
                      border: '1px solid rgba(180,180,239,0.2)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Show More Button */}
        {projects.length > 3 && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-outline"
            >
              {showAll ? 'Show Less' : 'Show More Projects'}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
