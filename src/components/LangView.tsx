import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { LANGS } from '../data/questionBanks.ts';

interface LangViewProps {
  langCode: string;
  onBack: () => void;
  onSelectSkill: (targetView: string) => void;
}

export const LangView: React.FC<LangViewProps> = ({
  langCode,
  onBack,
  onSelectSkill,
}) => {
  const lang = LANGS.find((l) => l.code === langCode) || LANGS[0];

  return (
    <section>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border border-[var(--line)] bg-transparent text-[var(--ink)] hover:bg-[var(--surface)] cursor-pointer transition-colors focus-visible:outline-3 focus-visible:outline-[var(--accent)]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Languages</span>
      </button>

      <h2
        className="text-3xl font-bold font-serif text-[var(--ink)] mt-5 mb-2"
        dir="auto"
      >
        {lang.name}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5">
        {lang.skills.map(([title, targetView], idx) =>
          targetView ? (
            <button
              key={idx}
              onClick={() => onSelectSkill(String(targetView))}
              className="text-left bg-[var(--surface)] border-2 border-[var(--brand)] rounded-2xl p-5 cursor-pointer transition-all hover:border-[var(--accent)] hover:shadow-sm focus-visible:outline-3 focus-visible:outline-[var(--accent)]"
            >
              <h3 className="font-serif font-bold text-xl mb-1 text-[var(--ink)]" dir="auto">
                {title}
              </h3>
              <p className="text-sm text-[var(--muted)] m-0 leading-relaxed">
                Gap-fill, matching and passage questions. 35 questions in 5 parts.
              </p>
            </button>
          ) : (
            <div
              key={idx}
              className="text-left bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5"
            >
              <h3 className="font-serif font-bold text-xl mb-1 text-[var(--ink)]" dir="auto">
                {title}
              </h3>
              <span className="inline-block mt-2 text-xs text-[var(--muted)] border border-dashed border-[var(--line)] rounded-md px-2 py-0.5">
                Coming soon
              </span>
            </div>
          )
        )}
      </div>
    </section>
  );
};
