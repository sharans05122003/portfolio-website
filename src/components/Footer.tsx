import { motion } from 'motion/react';
import { ArrowUp, Code2, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="main-footer"
      className="py-12 bg-[#F8FAFC] dark:bg-[#0A0A0B] border-t border-slate-200 dark:border-zinc-900/60 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-8 border-b border-slate-150 dark:border-zinc-900">
          
          {/* Logo & Info */}
          <div className="flex flex-col gap-3">
            <a href="#" className="flex items-center gap-2 group cursor-pointer w-fit">
              <div className="p-1.5 rounded-lg bg-indigo-600 text-white group-hover:bg-indigo-500 transition-colors duration-200">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-zinc-50">
                {PERSONAL_INFO.name.split(' ')[0]}
                <span className="text-indigo-600">.</span>
              </span>
            </a>
            <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-zinc-400 max-w-sm leading-relaxed">
              {PERSONAL_INFO.title} focused on fast, accessible web content and polished development workflows.
            </p>
          </div>

          {/* Quick Resets and Scroll Action */}
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            <ul className="flex items-center gap-6">
              {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="font-sans font-medium text-xs sm:text-sm text-slate-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            {/* Scroll To Top action */}
            <motion.button
              id="scroll-to-top-btn"
              onClick={handleScrollToTop}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-slate-50 dark:bg-zinc-900 text-slate-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 border border-slate-200 dark:border-zinc-850 cursor-pointer shadow-sm transition-colors"
              aria-label="Back to top of page"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Bottom row copyright */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <span className="font-sans text-xs text-slate-400 dark:text-zinc-550">
            &copy; {currentYear} {PERSONAL_INFO.name}. All Rights Reserved.
          </span>
          <span className="font-sans text-xs text-slate-400 dark:text-zinc-550 flex items-center gap-1.5 justify-center sm:justify-end">
            Designed with <Heart className="w-3 h-3 text-rose-500 animate-pulse" /> &amp; built in React.
          </span>
        </div>
      </div>
    </footer>
  );
}
