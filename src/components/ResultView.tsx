import React, { useState } from 'react';
import { RotateCcw, Eye, ArrowLeft, Check, X, HelpCircle, Filter } from 'lucide-react';
import { ScoreResult, Question, CandidateAnswer } from '../types/cefr.ts';

interface ResultViewProps {
  scoreResult: ScoreResult;
  questions: Question[];
  answers: CandidateAnswer[];
  onReviewTest: () => void;
  onTryAgain: () => void;
  onGoList: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  scoreResult,
  questions,
  answers,
  onReviewTest,
  onTryAgain,
  onGoList,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'correct' | 'wrong' | 'blank'>('all');

  const { total, max, percent, byPart, official } = scoreResult;

  // Calculate counts
  let correctCount = 0;
  let wrongCount = 0;
  let blankCount = 0;

  const questionReviews = questions.map((q, i) => {
    const u = answers[i];
    const isBlank = u === null || u === undefined || u === '';

    let isCorrect = false;
    if (!isBlank) {
      if (typeof u === 'string' && typeof q.a === 'string') {
        const userStr = u.trim().toLowerCase();
        const targetStr = q.a.trim().toLowerCase();
        const alts = q.alt ? q.alt.map((x) => x.trim().toLowerCase()) : [];
        isCorrect = userStr === targetStr || alts.includes(userStr);
      } else {
        isCorrect = u === q.a || Boolean(q.alt && q.alt.includes(String(u)));
      }
    }

    if (isBlank) blankCount++;
    else if (isCorrect) correctCount++;
    else wrongCount++;

    const getDisplay = (val: any) => {
      if (val === null || val === undefined) return '';
      if (Array.isArray(q.o)) return q.o[val] !== undefined ? String(q.o[val]) : String(val);
      if (typeof q.o === 'object' && q.o !== null) {
        return q.o[val] !== undefined ? String(q.o[val]) : String(val);
      }
      return String(val);
    };

    const targetDisplay = getDisplay(q.a);
    const candidateDisplay = !isBlank ? getDisplay(u) : null;
    const title = q.gap ? q.t : `S${i + 1}${q.mc ? '. ' + q.t : ''}`;

    return {
      index: i + 1,
      title,
      isBlank,
      isCorrect,
      candidateDisplay,
      targetDisplay,
      altDisplays: q.alt,
    };
  });

  const filteredReviews = questionReviews.filter((rev) => {
    if (filterMode === 'correct') return rev.isCorrect;
    if (filterMode === 'wrong') return !rev.isBlank && !rev.isCorrect;
    if (filterMode === 'blank') return rev.isBlank;
    return true;
  });

  return (
    <section className="space-y-6 pb-16">
      <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[var(--ink)] mb-3">
        Your practice result
      </h2>

      {/* Rawbox Score Card */}
      <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 sm:p-7 shadow-xs">
        {official && typeof official.scaled === 'number' && (
          <div className="mb-6 pb-6 border-b border-[var(--line)]">
            <p className="text-sm font-medium text-[var(--muted)] m-0">
              Estimated score (75-point scale)
            </p>
            <div className="font-serif font-bold text-4xl sm:text-5xl text-[var(--brand)] mt-1">
              {official.scaled} / 75
            </div>
          </div>
        )}

        <div>
          <p className="text-sm font-medium text-[var(--muted)] m-0">Raw score</p>
          <div className="font-serif font-bold text-4xl sm:text-5xl text-[var(--ink)] mt-1">
            {total} / {max}
          </div>
          <p className="text-sm text-[var(--muted)] mt-1 font-mono">
            Raw percentage: {percent.toFixed(1)}%
          </p>
        </div>

        {/* Part breakdown table */}
        <div className="mt-5 overflow-hidden border-t border-[var(--line)] pt-3">
          <table className="w-full border-collapse text-sm">
            <tbody>
              {byPart.map((p) => (
                <tr key={p.part} className="border-b border-[var(--line)]/50 last:border-0">
                  <td className="py-2.5 text-[var(--muted)] font-medium">Part {p.part}</td>
                  <td className="py-2.5 text-right font-mono font-bold text-[var(--ink)]">
                    {p.correct} / {p.max}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {official && typeof official.scaled === 'number' ? (
          <p className="text-xs text-[var(--muted)] mt-5 leading-relaxed bg-[var(--bg)] p-3 rounded-xl border border-[var(--line)]/70">
            Estimated from an average conversion table ({official.source}). Real results may differ depending on the difficulty of the test variant. Practice result only, not an official score. No CEFR level is assigned.
          </p>
        ) : (
          <p className="text-xs text-[var(--muted)] mt-5 leading-relaxed bg-[var(--bg)] p-3 rounded-xl border border-[var(--line)]/70">
            Practice result only. No score on the 75-point scale is shown for 0 correct answers because the table starts at 1. No CEFR level is assigned.
          </p>
        )}
      </div>

      {/* 3 Metric Summary Boxes */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[var(--surface)] border border-[var(--line)] rounded-xl p-4 text-center">
          <strong className="block font-serif font-bold text-2xl sm:text-3xl text-[var(--ok)]">
            {correctCount}
          </strong>
          <span className="text-xs sm:text-sm text-[var(--muted)] font-medium">Correct</span>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--line)] rounded-xl p-4 text-center">
          <strong className="block font-serif font-bold text-2xl sm:text-3xl text-[var(--bad)]">
            {wrongCount}
          </strong>
          <span className="text-xs sm:text-sm text-[var(--muted)] font-medium">Wrong</span>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--line)] rounded-xl p-4 text-center">
          <strong className="block font-serif font-bold text-2xl sm:text-3xl text-[var(--ink)]">
            {blankCount}
          </strong>
          <span className="text-xs sm:text-sm text-[var(--muted)] font-medium">Blank</span>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          onClick={onReviewTest}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-base bg-[var(--brand)] text-[var(--brand-ink)] cursor-pointer hover:opacity-95 shadow-sm transition-all focus-visible:outline-3 focus-visible:outline-[var(--accent)]"
        >
          <Eye className="w-4 h-4" />
          <span>Review my test</span>
        </button>

        <button
          onClick={onTryAgain}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-base border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--bg)] cursor-pointer transition-colors focus-visible:outline-3 focus-visible:outline-[var(--accent)]"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try again</span>
        </button>

        <button
          onClick={onGoList}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-base border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--bg)] cursor-pointer transition-colors focus-visible:outline-3 focus-visible:outline-[var(--accent)]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All tests</span>
        </button>
      </div>

      {/* Itemized Review List */}
      <div className="mt-8 pt-6 border-t border-[var(--line)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h3 className="font-serif font-bold text-xl text-[var(--ink)] m-0">
            Questions Review ({filteredReviews.length})
          </h3>

          <div className="inline-flex items-center gap-1 p-1 bg-[var(--surface)] border border-[var(--line)] rounded-xl text-xs">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
                filterMode === 'all'
                  ? 'bg-[var(--brand)] text-[var(--brand-ink)]'
                  : 'text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
            >
              All ({questionReviews.length})
            </button>
            <button
              onClick={() => setFilterMode('correct')}
              className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
                filterMode === 'correct'
                  ? 'bg-[var(--ok)] text-white'
                  : 'text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
            >
              Correct ({correctCount})
            </button>
            <button
              onClick={() => setFilterMode('wrong')}
              className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
                filterMode === 'wrong'
                  ? 'bg-[var(--bad)] text-white'
                  : 'text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
            >
              Wrong ({wrongCount})
            </button>
            <button
              onClick={() => setFilterMode('blank')}
              className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
                filterMode === 'blank'
                  ? 'bg-[var(--muted)] text-white'
                  : 'text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
            >
              Blank ({blankCount})
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredReviews.map((rev, i) => (
            <div
              key={i}
              className="bg-[var(--surface)] border border-[var(--line)] rounded-xl p-4 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <b className="text-sm font-semibold text-[var(--ink)] block">
                  {rev.index}. {rev.title}
                </b>
                {rev.isBlank ? (
                  <span className="shrink-0 text-xs px-2 py-0.5 rounded-md font-mono bg-slate-200/50 dark:bg-slate-800 text-[var(--muted)]">
                    Blank
                  </span>
                ) : rev.isCorrect ? (
                  <span className="shrink-0 text-xs px-2 py-0.5 rounded-md font-mono bg-emerald-500/10 text-[var(--ok)] font-semibold inline-flex items-center gap-1">
                    <Check className="w-3 h-3" /> Correct
                  </span>
                ) : (
                  <span className="shrink-0 text-xs px-2 py-0.5 rounded-md font-mono bg-rose-500/10 text-[var(--bad)] font-semibold inline-flex items-center gap-1">
                    <X className="w-3 h-3" /> Wrong
                  </span>
                )}
              </div>

              <div className="p-3 rounded-lg bg-[var(--bg)] text-sm space-y-1">
                {rev.isBlank ? (
                  <div>
                    <span className="text-[var(--muted)]">Blank. </span>
                    <span>
                      Correct answer: <b className="text-[var(--ok)]">{rev.targetDisplay}</b>
                    </span>
                  </div>
                ) : rev.isCorrect ? (
                  <div>
                    <span className="text-[var(--ok)] font-semibold">Correct: </span>
                    <b>{rev.candidateDisplay}</b>
                  </div>
                ) : (
                  <div>
                    <div>
                      <span className="text-[var(--bad)] font-medium">Your answer: </span>
                      <span className="line-through">{rev.candidateDisplay}</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-[var(--ok)] font-medium">Correct answer: </span>
                      <b>{rev.targetDisplay}</b>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
