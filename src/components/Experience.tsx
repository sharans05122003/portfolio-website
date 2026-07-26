import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, Sparkles } from 'lucide-react';
import { EXPERIENCES } from '../data';

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  return (
    <section
      id="experience"
      className="py-24 bg-[#F8FAFC] dark:bg-[#0A0A0B] border-t border-slate-100 dark:border-zinc-900/40 relative transition-colors duration-300"
    >
      {/* Dynamic ambient backdrop blur vectors */}
      <div className="absolute top-1/3 right-10 w-80 h-80 rounded-full bg-violet-400/5 dark:bg-violet-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-indigo-600 dark:text-indigo-400 font-mono text-sm uppercase tracking-widest italic font-medium block mb-2">My Journey</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-zinc-50 tracking-tight">
            Professional Timeline
          </h2>
          <div className="h-1.5 w-16 bg-indigo-600 dark:bg-indigo-400 rounded-full mt-4 mb-6 mx-auto" />
          <p className="font-sans text-slate-600 dark:text-zinc-300 max-w-xl mx-auto">
            A chronological timeline of my professional roles, engineering contributions, and core institutional achievements.
          </p>
        </div>

        {/* Timeline thread container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative border-l-2 border-slate-200 dark:border-zinc-800 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-12 py-4"
        >
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className="relative group"
            >
              {/* Spinning decorative dot anchor */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-[#0A0A0B] border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center shadow-sm z-10">
                <Briefcase className="w-2.5 h-2.5 text-indigo-600 dark:text-indigo-400" />
              </div>

              {/* Glowing hover card effect */}
              <div className="p-6 sm:p-8 rounded-[2rem] bg-white dark:bg-zinc-900/40 border border-slate-200/60 dark:border-zinc-800/50 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-bl-full pointer-events-none" />

                {/* Role header info block */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-display font-bold text-xl text-slate-900 dark:text-zinc-50">
                      {exp.role}
                    </h3>
                    <p className="font-sans font-semibold text-sm text-indigo-600 dark:text-indigo-400 mt-1">
                      {exp.company}
                    </p>
                  </div>

                  {/* Duration Pill Tag */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-sans font-semibold text-xs border border-indigo-150/40 dark:border-indigo-900/40 w-fit">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.duration}
                  </span>
                </div>

                {/* Subtitle/Metadata */}
                <div className="flex items-center gap-2 text-slate-400 dark:text-zinc-500 text-xs mb-4">
                  <MapPin className="w-3.5 h-3.5 text-slate-350 dark:text-zinc-600" />
                  <span>{exp.location}</span>
                </div>

                {/* Responsibility list points */}
                <ul className="space-y-3 mb-6 relative z-10">
                  {exp.description.map((point, pIndex) => (
                    <li
                      key={pIndex}
                      className="flex items-start gap-3 font-sans text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed"
                    >
                      <span className="text-indigo-500 dark:text-indigo-400 mt-1 shrink-0">
                        <Sparkles className="w-3 h-3" />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies tag group used at this position */}
                <div className="pt-6 border-t border-slate-100 dark:border-zinc-850/85">
                  <span className="font-sans font-medium text-[10px] uppercase text-slate-400 dark:text-zinc-550 tracking-wider block mb-3">
                    Technologies Leveraged:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-[10px] px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-950 text-slate-600 dark:text-zinc-400 border border-slate-150/50 dark:border-zinc-800 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
