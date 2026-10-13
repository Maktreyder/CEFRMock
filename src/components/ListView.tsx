import React from 'react';
import { ArrowLeft, Play, History, Clock } from 'lucide-react';
import { AttemptRecord } from '../types/cefr.ts';

interface ListViewProps {
  onBack: () => void;
  onStartTest: () => void;
  attempts: AttemptRecord[];
  onOpenHistory?: () => void;
}

export const ListView: React.FC<ListViewProps> = ({
  onBack,
  onStartTest,
  attempts,
  onOpenHistory,
}) => {
  return (
    <section>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border border-[var(--line)] bg-transparent text-[var(--ink)] hover:bg-[var(--surface)] cursor-pointer transition-colors focus-visible:outline-3 focus-visible:outline-[var(--accent)]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>English</span>
      </button>

      <h2 className="text-3xl font-bold font-serif text-[var(--ink)] mt-5 mb-2">
        Reading
      </h2>
      <p className="max-w-2xl text-[var(--muted)] text-lg mb-6 leading-relaxed">
        Part 1 is a gap-fill. Part 2 is a reading passage with questions.
      </p>

      <div className="grid gap-3.5 mt-5">
        <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <b className="text-xl text-[var(--ink)] block font-serif">Reading Test</b>
              <span className="text-sm text-[var(--muted)]">
                Part 1: gap-fill · Part 2: matching · Part 3: headings · Part 4: passage · Part 5: summary · 35 questions
              </span>
            </div>

            <button
              onClick={onStartTest}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-base bg-[var(--brand)] text-[var(--brand-ink)] cursor-pointer transition-all hover:opacity-95 shadow-sm hover:shadow focus-visible:outline-3 focus-visible:outline-[var(--accent)] shrink-0"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start test</span>
            </button>
          </div>

          {/* Bildirishnoma (Notification Note next to test start) */}
          <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-[var(--bg)] border border-[var(--line)] text-sm text-[var(--ink)] transition-colors">
            <Clock className="w-5 h-5 text-[var(--brand)] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-sm sm:text-base text-[var(--ink)] m-0 leading-snug">
                Test uchun 60 daqiqa vaqtingiz bor, Start testni bosishingiz bilan vaqt ketishni boshlaydi.
              </p>
              <p className="text-xs sm:text-sm text-[var(--muted)] m-0 leading-relaxed">
                Test boshlanganda yuqori paneldagi taymer 60:00 dan ortga qarab hisoblaydi va 35 ta savolni toʻliq ishlash uchun vaqtingizni taqsimlashga yordam beradi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {attempts.length > 0 && (
        <div className="mt-10 pt-6 border-t border-[var(--line)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-bold text-xl text-[var(--ink)] m-0">
              Recent Practice Attempts
            </h3>
            {onOpenHistory && (
              <button
                onClick={onOpenHistory}
                className="text-sm font-semibold text-[var(--brand)] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <History className="w-3.5 h-3.5" />
                View all ({attempts.length})
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {attempts.slice(-3).reverse().map((att, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 bg-[var(--surface)] border border-[var(--line)] rounded-xl text-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[var(--muted)]">
                    {new Date(att.time).toLocaleDateString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <span className="font-semibold text-[var(--ink)]">
                    Raw: {att.total} / {att.max}
                  </span>
                </div>
                {att.official && (
                  <span className="font-serif font-bold text-[var(--brand)]">
                    Scale: {att.official.scaled} / 75
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
