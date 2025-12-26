import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Search } from 'lucide-preact';

export default function SearchTrigger() {
  const [isMac, setIsMac] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  const openSearch = () => {
    window.dispatchEvent(new CustomEvent('open-search'));
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        class="hidden md:flex items-center gap-2 px-3 py-2 text-on-surface-variant rounded-full hover:bg-surface-container-highest transition-colors"
        aria-label="Cerca"
      >
        <Search size={20} />
      </button>
    );
  }

  return (
    <button
      onClick={openSearch}
      class="hidden md:flex items-center gap-2 px-3 py-2 text-on-surface-variant rounded-full hover:bg-surface-container-highest hover:text-on-surface transition-colors"
      aria-label={`Cerca (${isMac ? 'Cmd' : 'Ctrl'}+K)`}
    >
      <Search size={20} />
      <span class="text-label-small text-on-surface-variant/60 hidden lg:inline">
        {isMac ? '⌘' : 'Ctrl'}+K
      </span>
    </button>
  );
}
