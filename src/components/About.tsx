import React, { useState } from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { PERSONAL_INFO, SKILLS } from '../data';
import { Skill } from '../types';

// Helper to resolve icon by name safely from lucide-react
function getSkillIcon(name: string): React.ReactNode {
  switch (name) {
    case 'Code2':
      return <Icons.Code2 className="w-4 h-4" />;
    case 'Flame':
      return <Icons.Flame className="w-4 h-4" />;
    case 'Cpu':
      return <Icons.Cpu className="w-4 h-4" />;
    case 'FileHtml':
      return <Icons.FileText className="w-4 h-4" />;
    case 'Atom':
      return <Icons.Atom className="w-4 h-4" />;
    case 'Sparkles':
      return <Icons.Sparkles className="w-4 h-4" />;
    case 'Motion':
      return <Icons.Activity className="w-4 h-4" />;
    case 'BarChart3':
      return <Icons.BarChart3 className="w-4 h-4" />;
    case 'Server':
      return <Icons.Server className="w-4 h-4" />;
    case 'Network':
      return <Icons.Network className="w-4 h-4" />;
    case 'Database':
      return <Icons.Database className="w-4 h-4" />;
    case 'Zap':
      return <Icons.Zap className="w-4 h-4" />;
    case 'Container':
      return <Icons.Box className="w-4 h-4" />;
    case 'GitBranch':
      return <Icons.GitBranch className="w-4 h-4" />;
    case 'Palette':
      return <Icons.Palette className="w-4 h-4" />;
    case 'LayoutGrid':
      return <Icons.LayoutGrid className="w-4 h-4" />;
    default:
      return <Icons.Terminal className="w-4 h-4" />;
  }
}

export default function About() {
  const [activeTab, setActiveTab] = useState<'all' | Skill['category']>('all');

  const categories: { id: 'all' | Skill['category']; label: string }[] = [
    { id: 'all', label: 'All Technologies' },
    { id: 'languages', label: 'Languages' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'tools', label: 'DevOps & Tools' },
    { id: 'design', label: 'Design' },
  ];

  const filteredSkills = activeTab === 'all' 
    ? SKILLS 
    : SKILLS.filter(skill => skill.category === activeTab);

  return (
    <section
      id="about"
      className="py-24 bg-[#F8FAFC] dark:bg-[#0A0A0B] border-t border-slate-100 dark:border-zinc-900/40 relative transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center md:text-left mb-16 max-w-3xl">
          <span className="text-indigo-600 dark:text-indigo-400 font-mono text-sm uppercase tracking-widest italic font-medium block mb-2">About Me</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-zinc-50 tracking-tight">
            Who is {PERSONAL_INFO.name}?
          </h2>
          <div className="h-1.5 w-16 bg-indigo-600 dark:bg-indigo-400 rounded-full mt-4 mb-6 mx-auto md:mx-0" />
          <p className="font-sans text-slate-600 dark:text-zinc-300 leading-relaxed text-lg">
            {PERSONAL_INFO.tagline}
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Biography Profile Card (Col Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="p-8 rounded-[2rem] bg-white dark:bg-zinc-900/40 border border-slate-200/60 dark:border-zinc-800/50 shadow-sm flex flex-col justify-between h-full relative overflow-hidden group">
              {/* Soft ambient inner glare on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100/50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <Icons.User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-slate-900 dark:text-zinc-50">Background</h3>
                    <p className="font-sans text-xs text-slate-400 dark:text-zinc-500">Curiosity-driven creator</p>
                  </div>
                </div>

                <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-zinc-300 leading-relaxed">
                  {PERSONAL_INFO.bio}
                </p>

                <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-zinc-300 leading-relaxed">
                  My work blends structured data workflows, web presentation, and performance-focused front-end delivery to create polished publishing and web application experiences.
                </p>
              </div>

              {/* Geographic and contact badging */}
              <div className="pt-8 border-t border-slate-150 dark:border-zinc-800/80 mt-6 relative z-10 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400">
                  <Icons.MapPin className="w-4 h-4 text-indigo-550" />
                  <span className="font-sans text-xs font-medium">{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400">
                  <Icons.GraduationCap className="w-4 h-4 text-violet-550" />
                  <span className="font-sans text-xs font-medium">{PERSONAL_INFO.education.degree}</span>
                </div>
              </div>
            </div>

            {/* Micro stats banner */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-[2rem] bg-white dark:bg-zinc-900/40 border border-slate-200/60 dark:border-zinc-800/50 shadow-sm flex flex-col gap-1">
                <span className="font-display font-bold text-2xl sm:text-3xl text-indigo-600 dark:text-indigo-400">45+</span>
                <span className="font-sans text-xs text-slate-500 dark:text-zinc-400 font-medium">Production Sites Launched</span>
              </div>
              <div className="p-6 rounded-[2rem] bg-white dark:bg-zinc-900/40 border border-slate-200/60 dark:border-zinc-800/50 shadow-sm flex flex-col gap-1">
                <span className="font-display font-bold text-2xl sm:text-3xl text-violet-600 dark:text-violet-400">99.8%</span>
                <span className="font-sans text-xs text-slate-500 dark:text-zinc-400 font-medium">Core Web Vitals Pass Rate</span>
              </div>
            </div>
          </div>

          {/* Technical Deck (Col Span 7) */}
          <div className="lg:col-span-7 p-8 rounded-[2rem] bg-white dark:bg-zinc-900/40 border border-slate-200/60 dark:border-zinc-800/50 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-violet-100/50 dark:bg-violet-950/40 flex items-center justify-center text-violet-600 dark:text-violet-400">
                <Icons.Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-zinc-50">Technical Arsenal</h3>
                <p className="font-sans text-xs text-slate-400 dark:text-zinc-500">Primary technologies & tools</p>
              </div>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  id={`skill-filter-${cat.id}`}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-4 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                    activeTab === cat.id
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                      : 'bg-slate-50 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-750'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Skills Progress Bars with dynamic motion */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5"
            >
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4) }}
                  className="flex flex-col gap-2 p-3 rounded-xl bg-white/50 dark:bg-zinc-950/30 border border-slate-100/40 dark:border-zinc-850/40 hover:bg-white dark:hover:bg-zinc-950 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-500 dark:text-indigo-400">
                        {getSkillIcon(skill.iconName)}
                      </span>
                      <span className="font-sans font-semibold text-xs sm:text-sm text-slate-800 dark:text-zinc-200">
                        {skill.name}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-slate-400 dark:text-zinc-500 font-medium">
                      {skill.level}%
                    </span>
                  </div>
                  
                  {/* Outer track */}
                  <div className="w-full h-2 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    {/* Active bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
