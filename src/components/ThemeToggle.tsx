import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  darkMode: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ darkMode, onToggle }: ThemeToggleProps) {
  return (
    <motion.button
      id="theme-toggle"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className="relative p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 transition-colors duration-200 shadow-sm border border-slate-200 dark:border-zinc-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
      aria-label="Toggle dark mode"
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{
            y: darkMode ? -30 : 0,
            opacity: darkMode ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute"
        >
          <Sun className="w-5 h-5 text-amber-500" />
        </motion.div>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{
            y: darkMode ? 0 : 30,
            opacity: darkMode ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute"
        >
          <Moon className="w-5 h-5 text-indigo-400" />
        </motion.div>
      </div>
    </motion.button>
  );
}
