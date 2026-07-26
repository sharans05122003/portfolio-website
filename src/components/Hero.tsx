import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Github, Linkedin, Twitter, Mail, FileText, Sparkles, MapPin, GitCommit } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Hero() {
  const [greeting, setGreeting] = useState('Hello');

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting('Good morning');
    else if (hours < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  // Frame Motion Stagger configs
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 110, damping: 15 },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 bg-[#F8FAFC] dark:bg-[#0A0A0B] text-slate-900 dark:text-[#EDEDED] overflow-hidden transition-colors duration-300"
    >
      {/* Decorative ambient background blur vectors */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[30rem] h-[30rem] rounded-full bg-violet-500/10 dark:bg-violet-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        
        {/* Bento Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-auto"
        >
          
          {/* Bento Card 1: Main Introduction (col-span-12 lg:col-span-8) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-12 lg:col-span-8 bg-white dark:bg-zinc-900/40 rounded-[2rem] border border-slate-200/60 dark:border-zinc-800/50 p-8 sm:p-10 lg:p-12 flex flex-col justify-between shadow-sm relative group overflow-hidden"
          >
            {/* Ambient hover gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              {/* Status Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-mono text-xs tracking-wider uppercase border border-indigo-150/30 dark:border-indigo-900/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{greeting}, I'm {PERSONAL_INFO.name}</span>
              </div>

              {/* Bento Styled Heading */}
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none text-slate-900 dark:text-white">
                Crafting digital <br />
                <span className="text-slate-400 dark:text-zinc-500 italic font-light">interfaces</span> that feel <span className="text-indigo-600 dark:text-indigo-400">natural.</span>
              </h1>

              {/* Tagline */}
              <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-zinc-300 max-w-xl leading-relaxed">
                {PERSONAL_INFO.tagline}
              </p>
            </div>

            {/* CTAs and social footer inside grid card */}
            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
              <div className="flex flex-wrap items-center gap-3">
                <motion.a
                  id="hero-view-projects"
                  href="#projects"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 font-medium transition-colors shadow-lg shadow-indigo-600/10 dark:shadow-none flex items-center gap-2 group cursor-pointer text-sm"
                >
                  Explore Work
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.a>
                
                <motion.a
                  id="hero-connect"
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-3 rounded-xl bg-slate-50 dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 hover:bg-slate-150 dark:hover:bg-zinc-700 font-medium transition-all border border-slate-200 dark:border-zinc-750 cursor-pointer text-sm shadow-sm"
                >
                  Let's Connect
                </motion.a>

                <motion.a
                  id="hero-resume"
                  href={PERSONAL_INFO.resumeUrl}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-3 rounded-xl bg-transparent text-slate-500 hover:text-slate-850 dark:text-zinc-400 dark:hover:text-zinc-200 font-medium transition-colors flex items-center gap-1.5 cursor-pointer text-sm"
                >
                  <FileText className="w-4 h-4" />
                  CV
                </motion.a>
              </div>

              {/* Social Icons row */}
              <div className="flex items-center gap-2.5">
                {[
                  { icon: <Github className="w-4 h-4" />, url: PERSONAL_INFO.socials.github, id: 'github' },
                  { icon: <Linkedin className="w-4 h-4" />, url: PERSONAL_INFO.socials.linkedin, id: 'linkedin' },
                  { icon: <Twitter className="w-4 h-4" />, url: PERSONAL_INFO.socials.twitter, id: 'twitter' },
                  { icon: <Mail className="w-4 h-4" />, url: `mailto:${PERSONAL_INFO.socials.email}`, id: 'email' },
                ].map((social) => (
                  <motion.a
                    key={social.id}
                    id={`social-${social.id}`}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -3, scale: 1.05 }}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-indigo-600 dark:bg-zinc-800/60 dark:hover:bg-zinc-800 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors border border-slate-150 dark:border-zinc-800"
                    aria-label={`Visit my ${social.id}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bento Card 2: Interactive Avatar Portrait (col-span-12 sm:col-span-6 lg:col-span-4) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-6 lg:col-span-4 bg-white dark:bg-zinc-900/40 rounded-[2rem] border border-slate-200/60 dark:border-zinc-800/50 p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group min-h-[340px]"
          >
            {/* Visual background element */}
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden bg-slate-50 dark:bg-zinc-950 flex items-center justify-center">
              <img
                src={PERSONAL_INFO.avatar}
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Gradient bottom overlay */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent pointer-events-none z-10" />

            {/* Top Floating Badge */}
            <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-zinc-900/90 shadow-md backdrop-blur-sm border border-slate-100 dark:border-zinc-800 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-sans font-bold text-[10px] uppercase tracking-wider text-slate-800 dark:text-zinc-200">
                Live available
              </span>
            </div>

            {/* Bottom Floating Identity details */}
            <div className="relative z-20 mt-auto p-2 text-white">
              <p className="font-display font-bold text-lg leading-tight text-white drop-shadow-sm">
                {PERSONAL_INFO.name}
              </p>
              <p className="font-sans text-xs text-zinc-300 drop-shadow-sm mt-0.5">
                {PERSONAL_INFO.title}
              </p>
            </div>
          </motion.div>

          {/* Bento Card 3: Location (col-span-12 sm:col-span-6 lg:col-span-4) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-6 lg:col-span-4 bg-white dark:bg-zinc-900/40 rounded-[2rem] border border-slate-200/60 dark:border-zinc-800/50 p-6 flex items-center justify-between shadow-sm group"
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase text-slate-400 dark:text-zinc-500 tracking-widest font-bold">Location Bound</span>
              <span className="font-display font-bold text-xl text-slate-800 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {PERSONAL_INFO.location}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-zinc-550 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Indian Standard Time</span>
              </div>
            </div>
            <div className="text-3xl p-3 bg-slate-50 dark:bg-zinc-950 rounded-2xl border border-slate-100 dark:border-zinc-800 select-none shadow-inner">
              🇮🇳
            </div>
          </motion.div>

          {/* Bento Card 4: Years Experience Highlight (col-span-12 sm:col-span-6 lg:col-span-4) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-6 lg:col-span-4 bg-indigo-600 rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden relative group shadow-lg text-white"
          >
            {/* Spinning background number */}
            <div className="absolute -bottom-8 -right-8 text-white/5 font-display font-black text-[11rem] select-none leading-none group-hover:scale-105 transition-transform duration-700">
              02
            </div>

            <div className="relative z-10">
              <span className="font-mono text-[10px] uppercase text-indigo-200 tracking-widest font-bold">Track Record</span>
              <h3 className="font-display font-bold text-4xl mt-3 tracking-tight">2+ Years</h3>
              <p className="text-indigo-100 text-xs mt-1.5 font-sans leading-relaxed max-w-[220px]">
                Transforming research manuscripts and web content with LaTeX, XML, HTML, and CSS.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 relative z-10 mt-8">
              {['LaTeX', 'XML', 'HTML', 'CSS'].map((tag) => (
                <span key={tag} className="px-2.5 py-1 bg-white/10 rounded-lg text-[10px] font-semibold border border-white/5">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Bento Card 5: Commits Tracker (col-span-12 sm:col-span-6 lg:col-span-4) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-6 lg:col-span-4 bg-white dark:bg-zinc-900/40 rounded-[2rem] border border-slate-200/60 dark:border-zinc-800/50 p-6 flex flex-col justify-between shadow-sm group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-violet-500/5 to-transparent rounded-bl-full pointer-events-none" />

            <div className="flex items-center justify-between w-full">
              <span className="font-mono text-[10px] uppercase text-slate-400 dark:text-zinc-500 tracking-widest font-bold">Active Stream</span>
              <div className="p-1.5 rounded-lg bg-violet-50 dark:bg-zinc-950 text-violet-600 dark:text-violet-400 border border-violet-100/50 dark:border-zinc-800">
                <GitCommit className="w-4 h-4 animate-spin-slow" />
              </div>
            </div>

            <div className="mt-4">
              <span className="font-display font-bold text-3xl text-slate-800 dark:text-white tracking-tight">
                55%+
              </span>
              <p className="font-sans text-xs text-slate-500 dark:text-zinc-400 font-medium mt-1">
                Website performance improvements delivered
              </p>
            </div>

            {/* Custom decorative grid track graph representor */}
            <div className="mt-4 h-12 w-full flex items-end gap-1 pt-2">
              {[30, 45, 60, 25, 70, 85, 40, 55, 90, 65, 80, 50, 95, 75, 85].map((val, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-slate-100 dark:bg-zinc-800 rounded-sm group-hover:bg-indigo-500/20 dark:group-hover:bg-indigo-400/20 transition-colors"
                  style={{ height: `${val}%` }}
                >
                  <div
                    className="w-full bg-gradient-to-t from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500 rounded-sm scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500"
                    style={{ height: '100%', transitionDelay: `${idx * 20}ms` }}
                  />
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
        
      </div>
    </section>
  );
}
