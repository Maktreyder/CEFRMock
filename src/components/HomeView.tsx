import React from 'react';
import { LANGS } from '../data/questionBanks.ts';

interface HomeViewProps {
  onSelectLang: (langCode: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSelectLang }) => {
  return (
    <section>
      <h1 className="font-serif font-bold text-[clamp(2.3rem,6vw,3.6rem)] leading-[1.15] text-[var(--ink)] mb-3">
        CEFR Mock Tests
      </h1>
      <p className="max-w-[34em] text-[var(--muted)] text-[1.1rem] leading-relaxed mb-9">
        Practise for the CEFR exam with tests built to match the real format. Choose a language to begin.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {LANGS.map((lang) =>
          lang.live ? (
            <button
              key={lang.code}
              onClick={() => onSelectLang(lang.code)}
              className="text-left bg-[var(--surface)] border-2 border-[var(--brand)] rounded-[14px] p-5 sm:p-6 min-h-[148px] flex flex-col justify-start cursor-pointer transition-colors hover:border-[var(--accent)] focus-visible:outline-3 focus-visible:outline-[var(--accent)]"
            >
              <div className="font-serif font-bold text-[1.85rem] leading-[1.15] text-[var(--ink)] mb-1" dir="auto">
                {lang.name}
              </div>
              <p className="text-[0.95rem] text-[var(--muted)] m-0 leading-normal">{lang.sub}</p>
            </button>
          ) : (
            <div
              key={lang.code}
              className="text-left bg-[var(--surface)] border border-[var(--line)] rounded-[14px] p-5 sm:p-6 min-h-[148px] flex flex-col justify-start"
            >
              <div className="font-serif font-bold text-[1.85rem] leading-[1.15] text-[var(--ink)] mb-1" dir="auto">
                {lang.name}
              </div>
              <p className="text-[0.95rem] text-[var(--muted)] m-0 leading-normal">{lang.sub}</p>
              <div className="mt-3.5">
                <span className="inline-block text-[0.82rem] text-[var(--muted)] border border-dashed border-[var(--line)] rounded-md px-2.5 py-0.5">
                  Coming soon
                </span>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};
