import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Sync dark mode selection on mounting
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleToggleTheme = () => {
    const updatedTheme = !darkMode;
    setDarkMode(updatedTheme);
    if (updatedTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('portfolio_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('portfolio_theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0A0B] transition-colors duration-300">
      {/* Header Sticky Component with inline theme toggling control */}
      <Header darkMode={darkMode} onToggleTheme={handleToggleTheme} />
      
      {/* Main body content section grids */}
      <main>
        {/* Animated Hero Profile Introductions */}
        <Hero />
        
        {/* About Bio and Tech Stack Skills Filtering grids */}
        <About />

        {/* Chronological Timeline Track for work experiences */}
        <Experience />

        {/* Grid-based Projects directory with spec dialogs */}
        <Projects />

        {/* Contact Form with simulated CLI Terminal Mail inbox */}
        <Contact />
      </main>

      {/* Structured Footer copyright with scroll-top anchor */}
      <Footer />
    </div>
  );
}
