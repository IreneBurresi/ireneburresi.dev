import { h } from 'preact';
import { useState, useEffect, useRef, useCallback } from 'preact/hooks';
import { Search, X, FileText, ArrowRight } from 'lucide-preact';

interface PagefindResult {
  id: string;
  data: () => Promise<PagefindResultData>;
}

interface PagefindResultData {
  url: string;
  meta: {
    title?: string;
    image?: string;
  };
  excerpt: string;
  content: string;
}

interface SearchResult {
  url: string;
  title: string;
  excerpt: string;
}

let pagefindInstance: any = null;

async function initPagefind() {
  if (pagefindInstance) return pagefindInstance;

  try {
    // Pagefind is loaded at runtime from the built assets
    // Using @vite-ignore to prevent Vite from bundling this import
    const pagefindPath = '/pagefind/pagefind.js';
    pagefindInstance = await import(/* @vite-ignore */ pagefindPath);
    await pagefindInstance.init();
    return pagefindInstance;
  } catch (e) {
    console.warn('Pagefind not available - run build first');
    return null;
  }
}

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Search function with debounce
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const pf = await initPagefind();
      if (!pf) {
        setResults([]);
        return;
      }

      const search = await pf.search(searchQuery);
      const searchResults: SearchResult[] = await Promise.all(
        search.results.slice(0, 8).map(async (result: PagefindResult) => {
          const data = await result.data();
          return {
            url: data.url,
            title: data.meta?.title || 'Untitled',
            excerpt: data.excerpt,
          };
        })
      );
      setResults(searchResults);
      setSelectedIndex(0);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 150);
    return () => clearTimeout(timeoutId);
  }, [query, performSearch]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open modal with Cmd+K / Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        return;
      }

      if (!isOpen) return;

      // Close with Escape
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        return;
      }

      // Navigate results
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }

      // Navigate to selected result
      if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        window.location.href = results[selectedIndex].url;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Listen for custom open-search event
  useEffect(() => {
    const handleOpenSearch = () => setIsOpen(true);
    window.addEventListener('open-search', handleOpenSearch);
    return () => window.removeEventListener('open-search', handleOpenSearch);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Scroll selected item into view
  useEffect(() => {
    if (results.length > 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      selectedElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex, results.length]);

  if (!isOpen) return null;

  return (
    <div
      class="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Cerca nel sito"
    >
      {/* Scrim/Backdrop */}
      <div
        class="absolute inset-0 bg-scrim/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div class="relative w-full max-w-2xl bg-surface-container-high rounded-[28px] shadow-elevation-3 overflow-hidden">
        {/* Search Input */}
        <div class="flex items-center gap-3 px-6 py-4 border-b border-outline-variant/30">
          <Search size={20} class="text-on-surface-variant flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
            placeholder="Cerca articoli..."
            class="flex-1 bg-transparent text-on-surface text-body-large placeholder:text-on-surface-variant/60 outline-none"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="search-results"
            aria-autocomplete="list"
            aria-activedescendant={results.length > 0 ? `result-${selectedIndex}` : undefined}
          />
          <button
            onClick={() => setIsOpen(false)}
            class="p-2 -m-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest rounded-full transition-colors"
            aria-label="Chiudi ricerca"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results */}
        <div
          ref={resultsRef}
          id="search-results"
          role="listbox"
          aria-label="Risultati della ricerca"
          class="max-h-[60vh] overflow-y-auto"
        >
          {isLoading && (
            <div class="px-6 py-8 text-center text-on-surface-variant">
              <div class="inline-block w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!isLoading && query && results.length === 0 && (
            <div class="px-6 py-8 text-center text-on-surface-variant">
              <p class="text-body-large">Nessun risultato per "{query}"</p>
              <p class="text-body-medium mt-1 opacity-70">Prova con termini diversi</p>
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div class="p-2">
              {results.map((result, index) => (
                <a
                  key={result.url}
                  href={result.url}
                  data-index={index}
                  id={`result-${index}`}
                  role="option"
                  aria-selected={index === selectedIndex}
                  class={`flex items-start gap-3 px-4 py-3 rounded-2xl transition-colors ${
                    index === selectedIndex
                      ? 'bg-primary-container text-on-primary-container'
                      : 'hover:bg-surface-container text-on-surface'
                  }`}
                  onClick={() => {
                    window.location.href = result.url;
                  }}
                >
                  <FileText
                    size={20}
                    class={`flex-shrink-0 mt-0.5 ${
                      index === selectedIndex ? 'text-on-primary-container' : 'text-on-surface-variant'
                    }`}
                  />
                  <div class="flex-1 min-w-0">
                    <h3 class="text-title-medium font-medium truncate">{result.title}</h3>
                    <p
                      class={`text-body-small mt-0.5 line-clamp-2 ${
                        index === selectedIndex ? 'text-on-primary-container/80' : 'text-on-surface-variant'
                      }`}
                      dangerouslySetInnerHTML={{ __html: result.excerpt }}
                    />
                  </div>
                  <ArrowRight
                    size={16}
                    class={`flex-shrink-0 mt-1 opacity-0 transition-opacity ${
                      index === selectedIndex ? 'opacity-100' : ''
                    }`}
                  />
                </a>
              ))}
            </div>
          )}

          {!isLoading && !query && (
            <div class="px-6 py-8 text-center text-on-surface-variant">
              <p class="text-body-large">Inizia a digitare per cercare</p>
            </div>
          )}
        </div>

        {/* Footer with keyboard hints */}
        <div class="flex items-center justify-between px-6 py-3 border-t border-outline-variant/30 text-label-small text-on-surface-variant/70">
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
              <kbd class="px-1.5 py-0.5 bg-surface-container-highest rounded text-[10px] font-mono">↑</kbd>
              <kbd class="px-1.5 py-0.5 bg-surface-container-highest rounded text-[10px] font-mono">↓</kbd>
              <span class="ml-1">naviga</span>
            </span>
            <span class="flex items-center gap-1">
              <kbd class="px-1.5 py-0.5 bg-surface-container-highest rounded text-[10px] font-mono">↵</kbd>
              <span class="ml-1">apri</span>
            </span>
          </div>
          <span class="flex items-center gap-1">
            <kbd class="px-1.5 py-0.5 bg-surface-container-highest rounded text-[10px] font-mono">esc</kbd>
            <span class="ml-1">chiudi</span>
          </span>
        </div>
      </div>
    </div>
  );
}
