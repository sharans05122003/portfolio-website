import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, X, Folder, Eye, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project } from '../types';

export default function Projects() {
  const [filter, setFilter] = useState<'all' | Project['category']>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: { id: 'all' | Project['category']; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend Systems' },
    { id: 'creative', label: 'Creative Tech' },
  ];

  const filteredProjects = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(project => project.category === filter);

  return (
    <section
      id="projects"
      className="py-24 bg-[#F8FAFC] dark:bg-[#0A0A0B] border-t border-slate-100 dark:border-zinc-900/40 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-indigo-600 dark:text-indigo-400 font-mono text-sm uppercase tracking-widest italic font-medium block mb-2">My Catalog</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-zinc-50 tracking-tight">
              Project Grid Showcase
            </h2>
            <div className="h-1.5 w-16 bg-indigo-600 dark:bg-indigo-400 rounded-full mt-4 mb-6 mx-auto md:mx-0" />
            <p className="font-sans text-slate-600 dark:text-zinc-300">
              Projects built from the same LaTeX, XML, and web pipeline expertise described in my portfolio details.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`project-filter-${cat.id}`}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  filter === cat.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                    : 'bg-white dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700/80 hover:bg-slate-100 dark:hover:bg-zinc-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Grid layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative flex flex-col rounded-[2rem] bg-white dark:bg-zinc-900/40 border border-slate-200/60 dark:border-zinc-800/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Card Cover Banner */}
                <div className="relative h-48 overflow-hidden bg-slate-150 dark:bg-zinc-950">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category Pill Tag */}
                  <span className="absolute top-4 left-4 z-20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/95 dark:bg-zinc-800/95 text-indigo-600 dark:text-indigo-400 rounded-full shadow-sm">
                    {project.category}
                  </span>

                  {/* Open Details Hover Overlay Icon */}
                  <button
                    id={`open-project-overlay-${project.id}`}
                    onClick={() => setSelectedProject(project)}
                    className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  >
                    <div className="p-3.5 rounded-full bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Eye className="w-5 h-5" />
                    </div>
                  </button>
                </div>

                {/* Card Content Area */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div className="space-y-3">
                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Badges and bottom row action links */}
                  <div className="pt-6 mt-4 border-t border-slate-150 dark:border-zinc-800/80 space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-slate-50 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-md bg-slate-50 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 font-semibold">
                          +{project.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        id={`project-details-btn-${project.id}`}
                        onClick={() => setSelectedProject(project)}
                        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        Technical Spec
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-3">
                        <a
                          id={`project-github-${project.id}`}
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 dark:text-zinc-500 dark:hover:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
                          aria-label="GitHub Repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                        <a
                          id={`project-demo-${project.id}`}
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:text-zinc-500 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
                          aria-label="Live Demo link"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Detailed Technical Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-zinc-950/85 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="relative w-full max-w-2xl bg-white dark:bg-[#0A0A0B] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200/60 dark:border-zinc-800/50 max-h-[90vh] flex flex-col z-10"
              >
                {/* Hero header in modal */}
                <div className="relative h-60 w-full overflow-hidden shrink-0">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                  
                  {/* Close button */}
                  <button
                    id="close-project-modal-btn"
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/60 hover:bg-slate-950 text-white backdrop-blur-sm cursor-pointer transition-colors"
                    aria-label="Close modal dialog"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>

                  {/* Header Title inside banner */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-mono text-[9px] uppercase tracking-wider font-bold">
                      {selectedProject.category}
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white mt-2">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                {/* Body Content area scrollable */}
                <div className="p-6 overflow-y-auto space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-display font-semibold text-sm uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                      Executive Overview
                    </h4>
                    <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-zinc-300 leading-relaxed">
                      {selectedProject.description}
                    </p>
                    <p className="font-sans text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                      This project was initiated to deliver resilient operational capacity, optimized loading sequences, and scalable caching layers. The implementation enforces strict security scopes and follows professional Clean Architecture coding models.
                    </p>
                  </div>

                  {/* Architecture Badges list */}
                  <div className="space-y-3 pt-4 border-t border-slate-150 dark:border-zinc-800">
                    <h4 className="font-display font-semibold text-sm uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                      Core Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-xs px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Simulated Metrics segment */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-150 dark:border-zinc-800">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950/50 border border-slate-100 dark:border-zinc-800 flex flex-col">
                      <span className="font-sans text-[10px] uppercase font-semibold text-slate-400 dark:text-zinc-500 tracking-wider">
                        Operational Status
                      </span>
                      <span className="font-display font-bold text-sm text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        Active Deployment
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950/50 border border-slate-100 dark:border-zinc-800 flex flex-col">
                      <span className="font-sans text-[10px] uppercase font-semibold text-slate-400 dark:text-zinc-500 tracking-wider">
                        Response Latency
                      </span>
                      <span className="font-mono font-bold text-sm text-slate-800 dark:text-zinc-200 mt-1">
                        &lt; 140ms (Edge)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer buttons row */}
                <div className="p-6 bg-slate-50 dark:bg-zinc-950/70 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-end gap-3 shrink-0">
                  <a
                    id="modal-github-action"
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 font-medium text-xs sm:text-sm flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                  <a
                    id="modal-demo-action"
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-xs sm:text-sm flex items-center gap-2 hover:bg-indigo-500 transition-colors shadow-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Launch Live Site
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
