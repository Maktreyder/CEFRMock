import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  onGoHome: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onGoHome,
  theme,
  onToggleTheme,
}) => {
  return (
    <header className="flex justify-between items-center mb-8 pt-1">
      <button
        onClick={onGoHome}
        aria-label="Mak EDU home"
        className="inline-flex items-center gap-2.5 font-serif font-bold text-xl text-[var(--ink)] cursor-pointer focus-visible:outline-3 focus-visible:outline-[var(--accent)] rounded p-1 hover:opacity-90 transition-opacity"
      >
        <svg
          viewBox="120 130 840 560"
          width="42"
          height="28"
          fill="currentColor"
          aria-hidden="true"
          className="shrink-0 text-[var(--ink)]"
        >
          <polygon points="140,670 403,147 472,272 537,147 570,212 335,670 275,670 435,345 405,280 210,670" />
          <polygon points="408,670 670,147 940,670 870,670 672,285 505,610 645,610 675,670" />
          <polygon points="672,410 805,670 740,670 642,478" />
        </svg>
        <span className="tracking-tight text-lg sm:text-xl font-bold">Mak EDU</span>
      </button>

      <button
        onClick={onToggleTheme}
        aria-label="Switch light or dark theme"
        className="inline-flex items-center gap-2 px-3.5 py-1.5 text-sm font-semibold rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--bg)] cursor-pointer transition-colors focus-visible:outline-3 focus-visible:outline-[var(--accent)]"
      >
        {theme === 'dark' ? (
          <>
            <Sun className="w-4 h-4 text-amber-400" />
            <span>Light</span>
          </>
        ) : (
          <>
            <Moon className="w-4 h-4 text-slate-700" />
            <span>Dark</span>
          </>
        )}
      </button>
    </header>
  );
};
