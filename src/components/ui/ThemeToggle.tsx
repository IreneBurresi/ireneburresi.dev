import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Sun, Moon } from 'lucide-preact';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Update theme in DOM and localStorage
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        class="p-2 text-on-surface-variant hover:bg-surface-container-highest shape-full transition-colors"
        aria-label="Toggle theme"
      >
        <div class="w-6 h-6" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      class="p-2 text-on-surface-variant hover:bg-surface-container-highest shape-full transition-colors relative"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <Sun
        size={24}
        class={`absolute inset-0 m-auto transition-all duration-500 ${
          theme === 'light'
            ? 'rotate-0 scale-100 opacity-100'
            : 'rotate-90 scale-0 opacity-0'
        }`}
      />
      <Moon
        size={24}
        class={`absolute inset-0 m-auto transition-all duration-500 ${
          theme === 'dark'
            ? 'rotate-0 scale-100 opacity-100'
            : '-rotate-90 scale-0 opacity-0'
        }`}
      />
      <div class="w-6 h-6" />
    </button>
  );
}
