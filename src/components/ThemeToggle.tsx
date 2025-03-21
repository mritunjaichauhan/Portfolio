import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`fixed top-8 right-8 z-50 p-3 rounded-full 
        ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-[#ffdb67]'}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
    </motion.button>
  );
}
