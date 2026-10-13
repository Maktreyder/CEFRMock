import React, { useMemo, useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Clock, Pause, Play, AlertTriangle } from 'lucide-react';
import { GeneratedTest, LETTERS } from '../data/questionBanks.ts';
import { CandidateAnswer, Question } from '../types/cefr.ts';

interface TestViewProps {
  testData: GeneratedTest;
  answers: CandidateAnswer[];
  onPickAnswer: (questionIndex: number, value: CandidateAnswer) => void;
  onFinish: () => void;
  isReview: boolean;
  onBackToResult: () => void;
}

const PARTS_INFO = [
  { part: 1, name: 'Part 1', label: 'P1', desc: 'Gap-fill', range: 'Q1–6', start: 0, end: 5, total: 6 },
  { part: 2, name: 'Part 2', label: 'P2', desc: 'Matching', range: 'S7–14', start: 6, end: 13, total: 8 },
  { part: 3, name: 'Part 3', label: 'P3', desc: 'Headings', range: 'S15–20', start: 14, end: 19, total: 6 },
  { part: 4, name: 'Part 4', label: 'P4', desc: 'Passage', range: 'S21–29', start: 20, end: 28, total: 9 },
  { part: 5, name: 'Part 5', label: 'P5', desc: 'Summary', range: 'S30–35', start: 29, end: 34, total: 6 },
];

export const TestView: React.FC<TestViewProps> = ({
  testData,
  answers,
  onPickAnswer,
  onFinish,
  isReview,
  onBackToResult,
}) => {
  const {
    questions,
    part1Text,
    part2Headings,
    part2Texts,
    part3Headings,
    part3Texts,
    part4Title,
    part4Paragraphs,
    part4Questions,
    part5Title,
    part5Paragraphs,
    part5SummaryText,
    part5McQuestions,
  } = testData;

  const [activePart, setActivePart] = useState<number>(1);

  // Countdown timer state: 60 minutes (3600s) default for CEFR Reading exam
  const [timeLeft, setTimeLeft] = useState<number>(3600);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [showTimeUpModal, setShowTimeUpModal] = useState<boolean>(false);

  // Reset timer to 60 minutes whenever a new test starts
  useEffect(() => {
    setTimeLeft(3600);
    setIsTimerRunning(true);
    setShowTimeUpModal(false);
  }, [testData]);

  useEffect(() => {
    if (isReview || !isTimerRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowTimeUpModal(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isReview, isTimerRunning]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isTimeLow = timeLeft > 0 && timeLeft <= 300; // <= 5 minutes remaining (critical)
  const isTimeWarning = timeLeft > 300 && timeLeft <= 600; // <= 10 minutes remaining (warning)

  // Overall progress computation
  const answeredCount = useMemo(() => {
    return answers.filter((a) => a !== null && a !== undefined && a !== '').length;
  }, [answers]);

  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  // Helper to check if an answer is correct
  const isQuestionCorrect = (qIndex: number): boolean => {
    const q = questions[qIndex];
    if (!q) return false;
    const u = answers[qIndex];
    if (u === null || u === undefined || u === '') return false;

    if (typeof u === 'string' && typeof q.a === 'string') {
      const userStr = u.trim().toLowerCase();
      const targetStr = q.a.trim().toLowerCase();
      const alts = q.alt ? q.alt.map((x) => x.trim().toLowerCase()) : [];
      return userStr === targetStr || alts.includes(userStr);
    }
    return u === q.a || Boolean(q.alt && q.alt.includes(String(u)));
  };

  // Part-specific statistics for segmented progress
  const partStats = useMemo(() => {
    return PARTS_INFO.map((p) => {
      let answered = 0;
      let correct = 0;
      for (let i = p.start; i <= p.end; i++) {
        const u = answers[i];
        if (u !== null && u !== undefined && u !== '') {
          answered++;
          if (isQuestionCorrect(i)) {
            correct++;
          }
        }
      }
      const percent = Math.round((answered / p.total) * 100);
      return {
        ...p,
        answered,
        correct,
        percent,
        isComplete: answered === p.total,
      };
    });
  }, [answers, questions]);

  // Current active part information
  const activePartData = useMemo(() => {
    return partStats.find((p) => p.part === activePart) || partStats[0];
  }, [partStats, activePart]);

  // Scroll listener to update active part based on viewport location
  useEffect(() => {
    const handleScroll = () => {
      const partElements = [1, 2, 3, 4, 5].map((p) => ({
        part: p,
        el: document.getElementById(`part-${p}`),
      }));

      const scrollThreshold = window.scrollY + 180;

      for (let i = partElements.length - 1; i >= 0; i--) {
        const item = partElements[i];
        if (item.el) {
          const top = item.el.getBoundingClientRect().top + window.scrollY;
          if (scrollThreshold >= top) {
            setActivePart(item.part);
            return;
          }
        }
      }
      setActivePart(1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPart = (partNum: number) => {
    setActivePart(partNum);
    const el = document.getElementById(`part-${partNum}`);
    if (el) {
      const headerOffset = 130;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handlePick = (qIdx: number, val: CandidateAnswer) => {
    onPickAnswer(qIdx, val);
    const qPart = questions[qIdx]?.part;
    if (qPart) {
      setActivePart(qPart);
    }
  };

  // Helper to render gap fill text with react nodes
  const renderGaps = (
    template: string,
    startQuestionIdx: number,
    prefix = '',
    offsetNum = 1
  ) => {
    const parts = template.split(/(\{([0-9]+)\})/g);
    const nodes: React.ReactNode[] = [];

    parts.forEach((part, index) => {
      const match = part.match(/^\{([0-9]+)\}$/);
      if (match) {
        const gapNum = parseInt(match[1], 10);
        const qIdx = startQuestionIdx + gapNum;
        const q = questions[qIdx];
        const val = answers[qIdx] !== null && answers[qIdx] !== undefined ? String(answers[qIdx]) : '';
        const isGood = isReview && isQuestionCorrect(qIdx);
        const isBad = isReview && !isGood;

        nodes.push(
          <span key={`gap-${qIdx}-${index}`} className="inline-flex flex-wrap items-center gap-1 mx-1 my-0.5">
            <input
              type="text"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              disabled={isReview}
              value={val}
              placeholder={prefix ? `${prefix}${qIdx + 1}` : `(${gapNum + offsetNum})`}
              aria-label={prefix ? `${prefix}${qIdx + 1}` : `Gap ${gapNum + offsetNum}`}
              onChange={(e) => {
                const s = e.target.value.trim().toLowerCase();
                handlePick(qIdx, s ? s : null);
              }}
              onFocus={() => {
                const qPart = q?.part;
                if (qPart) setActivePart(qPart);
              }}
              className={`gap-input ${isGood ? 'mk-ok ring-2 ring-[var(--ok)]' : ''} ${
                isBad ? 'mk-bad ring-2 ring-[var(--bad)]' : ''
              }`}
            />
            {isBad && q && (
              <span className="ans text-xs font-bold text-[var(--ok)] inline-flex items-center gap-0.5 whitespace-nowrap bg-[var(--surface)] px-1.5 py-0.5 rounded border border-[var(--ok)]/30">
                ✓ {Array.isArray(q.o) ? q.o[Number(q.a)] ?? String(q.a) : (q.o as any)[q.a] ?? String(q.a)}
                {q.alt && q.alt.length > 0 ? ` / ${q.alt.join(' / ')}` : ''}
              </span>
            )}
          </span>
        );
      } else if (part && !part.match(/^\{[0-9]+\}$/)) {
        nodes.push(part);
      }
    });

    return nodes;
  };

  return (
    <section className="space-y-8 pb-16">
      {/* Review Mode Banner */}
      {isReview && (
        <div className="flex items-center justify-between gap-3 flex-wrap bg-[var(--surface)] border-2 border-[var(--brand)] rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-[var(--ink)]">
            <CheckCircle2 className="w-5 h-5 text-[var(--ok)] shrink-0" />
            <span>Review mode: green is correct, red is wrong.</span>
          </div>
          <button
            onClick={onBackToResult}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] hover:bg-[var(--surface)] cursor-pointer transition-colors focus-visible:outline-3 focus-visible:outline-[var(--accent)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to results</span>
          </button>
        </div>
      )}

      {/* ================= STICKY HEADER WITH VISUAL PART PROGRESS BAR ================= */}
      <div className="sticky top-0 z-30 bg-[var(--bg)]/95 backdrop-blur-md pt-2 pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 border-b border-[var(--line)] shadow-xs transition-colors">
        {/* Header Metadata Row */}
        <div className="flex items-center justify-between gap-2.5 mb-2.5 flex-wrap">
          {/* Active Part indicator badge and title */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-[var(--brand)] text-[var(--brand-ink)] shrink-0 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              {isReview ? 'Reviewing' : 'Working on'}: Part {activePart}
            </span>
            <span className="text-xs sm:text-sm text-[var(--muted)] truncate">
              <span className="font-semibold text-[var(--ink)]">{activePartData.desc}</span> ({activePartData.range})
              <span className="hidden sm:inline"> · </span>
              <span className="hidden sm:inline font-mono">
                {activePartData.answered}/{activePartData.total} answered
              </span>
            </span>
          </div>

          {/* Right Group: Exam Countdown Timer & Overall Stats */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
            {/* Countdown Timer */}
            {!isReview && (
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs sm:text-sm font-mono font-bold transition-all shadow-2xs ${
                  isTimeLow
                    ? 'bg-rose-500/15 border-rose-500/50 text-[var(--bad)] ring-2 ring-rose-500/30 animate-pulse'
                    : isTimeWarning
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400'
                    : 'bg-[var(--surface)] border-[var(--line)] text-[var(--ink)]'
                }`}
                title={
                  isTimeLow
                    ? 'Vaqt oz qoldi! / Less than 5 minutes left!'
                    : isTimeWarning
                    ? '10 daqiqadan kam vaqt qoldi / Less than 10 minutes left'
                    : 'Imtihon taymeri / Exam timer (60 min)'
                }
                aria-label={`Time remaining: ${timeString}`}
              >
                <Clock
                  className={`w-3.5 h-3.5 shrink-0 ${
                    isTimeLow
                      ? 'text-[var(--bad)]'
                      : isTimeWarning
                      ? 'text-amber-500'
                      : 'text-[var(--muted)]'
                  }`}
                />
                <span className="tabular-nums tracking-tight">{timeString}</span>

                {isTimeLow && (
                  <span className="text-[10px] uppercase font-sans tracking-wide font-extrabold px-1 py-0.5 bg-rose-500/20 rounded text-[var(--bad)]">
                    Low
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => setIsTimerRunning((r) => !r)}
                  className="text-[var(--muted)] hover:text-[var(--ink)] p-0.5 rounded cursor-pointer transition-colors"
                  title={isTimerRunning ? 'Pauza' : 'Davom ettirish'}
                  aria-label={isTimerRunning ? 'Pause timer' : 'Resume timer'}
                >
                  {isTimerRunning ? (
                    <Pause className="w-3 h-3" />
                  ) : (
                    <Play className="w-3 h-3" />
                  )}
                </button>
              </div>
            )}

            {/* Overall Test Total Stats */}
            <div className="shrink-0 text-right text-xs text-[var(--muted)] font-mono">
              <span className="hidden sm:inline text-[var(--muted)]">Overall: </span>
              <strong className="text-[var(--ink)] font-bold">{answeredCount}/{questions.length}</strong>
              <span className="text-[var(--muted)]"> ({progressPercent}%)</span>
            </div>
          </div>
        </div>

        {/* Visual 5-Segment Progress Bar indicating current part & completion */}
        <div
          className="grid grid-cols-5 gap-1.5 sm:gap-2.5"
          role="tablist"
          aria-label="Test parts navigation and visual progress"
        >
          {partStats.map((p) => {
            const isActive = activePart === p.part;
            return (
              <button
                key={p.part}
                type="button"
                onClick={() => scrollToPart(p.part)}
                role="tab"
                aria-selected={isActive}
                aria-label={`${p.name} (${p.desc}), ${p.answered} of ${p.total} answered`}
                className={`group relative text-left p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer focus-visible:outline-3 focus-visible:outline-[var(--accent)] overflow-hidden ${
                  isActive
                    ? 'bg-[var(--surface)] border-[var(--brand)] shadow-xs ring-2 ring-[var(--accent)]/60'
                    : 'bg-[var(--surface)]/75 hover:bg-[var(--surface)] border-[var(--line)] hover:border-[var(--brand)]/50'
                }`}
              >
                {/* Part Header & Counts */}
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span
                    className={`text-xs font-bold leading-none ${
                      isActive ? 'text-[var(--brand)]' : 'text-[var(--ink)]'
                    }`}
                  >
                    <span className="sm:hidden">{p.label}</span>
                    <span className="hidden sm:inline">{p.name}</span>
                  </span>
                  <span className="text-[10px] font-mono font-medium text-[var(--muted)] leading-none">
                    {p.answered}/{p.total}
                  </span>
                </div>

                {/* Subtitle / Range on larger screens */}
                <div className="hidden sm:flex items-center justify-between text-[11px] text-[var(--muted)] mb-1.5 leading-none">
                  <span className="truncate">{p.desc}</span>
                  <span className="font-mono text-[10px] opacity-75">{p.range}</span>
                </div>

                {/* Part Mini-Progress Fill */}
                <div className="h-1.5 w-full bg-[var(--line)]/70 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      p.isComplete
                        ? 'bg-[var(--ok)]'
                        : isActive
                        ? 'bg-[var(--accent)]'
                        : 'bg-[var(--brand)]/80'
                    }`}
                    style={{ width: `${p.percent}%` }}
                  />
                </div>

                {/* Active Part Edge Highlight */}
                {isActive && (
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[var(--accent)]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= PART 1 ================= */}
      <div
        id="part-1"
        className="scroll-mt-36 bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 sm:p-7 shadow-xs"
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[var(--ink)] m-0">
            Part 1
          </h2>
          <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-[var(--bg)] border border-[var(--line)] text-[var(--muted)]">
            Questions 1–6
          </span>
        </div>
        <p className="text-sm sm:text-base text-[var(--ink)] font-semibold mb-4">
          Read the text. Fill in each gap with ONE word. Each missing word is in the sentence just before the sentence with the gap.
        </p>
        <p className="font-serif text-lg sm:text-xl leading-loose text-[var(--ink)]">
          {renderGaps(part1Text, 0, '', 1)}
        </p>
      </div>

      {/* ================= PART 2 ================= */}
      <div id="part-2" className="scroll-mt-36">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[var(--ink)] m-0">
            Part 2
          </h2>
          <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-[var(--surface)] border border-[var(--line)] text-[var(--muted)]">
            Questions S7–S14
          </span>
        </div>
        <p className="text-base text-[var(--muted)] mb-4">
          Read texts S7–S14. For each one, choose the heading A–H that matches it.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
          {/* Headings List */}
          <article className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 lg:sticky lg:top-36 max-h-[calc(100vh-160px)] overflow-y-auto">
            <h3 className="font-serif font-bold text-xl text-[var(--ink)] mb-3 pb-2 border-b border-[var(--line)]">
              Headings
            </h3>
            <div className="space-y-2 text-sm sm:text-base leading-relaxed">
              {part2Headings.map((head, idx) => (
                <p key={idx} className="m-0 font-serif">
                  <b className="font-sans font-bold text-[var(--brand)] mr-1.5">
                    {LETTERS[idx]}.
                  </b>
                  {head}
                </p>
              ))}
            </div>
          </article>

          {/* Questions S7-S14 */}
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 space-y-5">
            {part2Texts.map((item, idx) => {
              const qIdx = item.targetQuestionIdx;
              const q = questions[qIdx];
              const userVal = answers[qIdx];
              const isGood = isReview && isQuestionCorrect(qIdx);
              const isBad = isReview && !isGood;

              return (
                <div
                  key={idx}
                  className="pt-4 first:pt-0 border-t border-[var(--line)] first:border-0 space-y-2.5"
                >
                  <b className="block font-sans font-bold text-sm text-[var(--ink)]">
                    S{qIdx + 1}
                  </b>
                  <p className="text-sm sm:text-base leading-relaxed text-[var(--ink)] m-0">
                    {item.text}
                  </p>
                  <div className="pt-1 flex items-center gap-2">
                    <select
                      disabled={isReview}
                      value={userVal !== null && userVal !== undefined ? String(userVal) : ''}
                      aria-label={`S${qIdx + 1}`}
                      onChange={(e) => {
                        const val = e.target.value ? Number(e.target.value) : null;
                        handlePick(qIdx, val);
                      }}
                      onFocus={() => setActivePart(2)}
                      className={`gap-select text-sm ${isGood ? 'mk-ok ring-2 ring-[var(--ok)]' : ''} ${
                        isBad ? 'mk-bad ring-2 ring-[var(--bad)]' : ''
                      }`}
                    >
                      <option value="">Choose</option>
                      {LETTERS.map((letter, lIdx) => (
                        <option key={letter} value={lIdx}>
                          {letter}
                        </option>
                      ))}
                    </select>
                    {isBad && q && (
                      <span className="ans text-xs font-bold text-[var(--ok)] whitespace-nowrap bg-[var(--surface)] px-1.5 py-0.5 rounded border border-[var(--ok)]/30">
                        ✓ {LETTERS[q.a as number]}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= PART 3 ================= */}
      <div id="part-3" className="scroll-mt-36">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[var(--ink)] m-0">
            Part 3
          </h2>
          <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-[var(--surface)] border border-[var(--line)] text-[var(--muted)]">
            Questions S15–S20
          </span>
        </div>
        <p className="text-base text-[var(--muted)] mb-4">
          Read texts S15–S20. For each one, choose the heading A–H that matches it. There are two extra headings you do not need.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
          {/* Headings List */}
          <article className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 lg:sticky lg:top-36 max-h-[calc(100vh-160px)] overflow-y-auto">
            <h3 className="font-serif font-bold text-xl text-[var(--ink)] mb-3 pb-2 border-b border-[var(--line)]">
              Headings
            </h3>
            <div className="space-y-2 text-sm sm:text-base leading-relaxed">
              {part3Headings.map((head, idx) => (
                <p key={idx} className="m-0 font-serif">
                  <b className="font-sans font-bold text-[var(--brand)] mr-1.5">
                    {LETTERS[idx]}.
                  </b>
                  {head}
                </p>
              ))}
            </div>
          </article>

          {/* Questions S15-S20 */}
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 space-y-5">
            {part3Texts.map((item, idx) => {
              const qIdx = item.targetQuestionIdx;
              const q = questions[qIdx];
              const userVal = answers[qIdx];
              const isGood = isReview && isQuestionCorrect(qIdx);
              const isBad = isReview && !isGood;

              return (
                <div
                  key={idx}
                  className="pt-4 first:pt-0 border-t border-[var(--line)] first:border-0"
                >
                  <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                    <b className="font-sans font-bold text-sm text-[var(--ink)]">
                      S{qIdx + 1}
                    </b>
                    <div className="inline-flex items-center gap-1.5">
                      <select
                        disabled={isReview}
                        value={userVal !== null && userVal !== undefined ? String(userVal) : ''}
                        aria-label={`S${qIdx + 1}`}
                        onChange={(e) => {
                          const val = e.target.value ? Number(e.target.value) : null;
                          handlePick(qIdx, val);
                        }}
                        onFocus={() => setActivePart(3)}
                        className={`gap-select text-sm ${isGood ? 'mk-ok ring-2 ring-[var(--ok)]' : ''} ${
                          isBad ? 'mk-bad ring-2 ring-[var(--bad)]' : ''
                        }`}
                      >
                        <option value="">Choose</option>
                        {LETTERS.map((letter, lIdx) => (
                          <option key={letter} value={lIdx}>
                            {letter}
                          </option>
                        ))}
                      </select>
                      {isBad && q && (
                        <span className="ans text-xs font-bold text-[var(--ok)] whitespace-nowrap bg-[var(--surface)] px-1.5 py-0.5 rounded border border-[var(--ok)]/30">
                          ✓ {LETTERS[q.a as number]}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-[var(--ink)] m-0">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= PART 4 ================= */}
      <div id="part-4" className="scroll-mt-36">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[var(--ink)] m-0">
            Part 4
          </h2>
          <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-[var(--surface)] border border-[var(--line)] text-[var(--muted)]">
            Questions S21–S29
          </span>
        </div>
        <p className="text-base text-[var(--muted)] mb-4">
          Read the text first, then answer questions S21–S29.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
          {/* Passage */}
          <article className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 sm:p-6 lg:sticky lg:top-36 max-h-[calc(100vh-160px)] overflow-y-auto">
            <h3 className="font-serif font-bold text-2xl text-[var(--ink)] mb-4 pb-2 border-b border-[var(--line)]">
              {part4Title}
            </h3>
            <div className="space-y-4 font-serif text-base sm:text-lg leading-relaxed text-[var(--ink)]">
              {part4Paragraphs.map((par, pIdx) => (
                <p key={pIdx} className="m-0">
                  {par}
                </p>
              ))}
            </div>
          </article>

          {/* Questions S21-S29 */}
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 space-y-6">
            {part4Questions.map((q, idx) => {
              const qIdx = q.targetQuestionIdx;
              const userVal = answers[qIdx];

              return (
                <div
                  key={idx}
                  className="pt-4 first:pt-0 border-t border-[var(--line)] first:border-0"
                >
                  {idx === 0 && (
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3">
                      S21–S24: choose the best answer.
                    </p>
                  )}
                  {idx === 4 && (
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3 mt-4 pt-3 border-t border-[var(--line)]">
                      S25–S29: choose True, False or Not Given.
                    </p>
                  )}

                  <b className="block text-sm sm:text-base font-semibold text-[var(--ink)] mb-2.5">
                    S{qIdx + 1}. {q.questionText}
                  </b>

                  <div className="space-y-1.5">
                    {q.options.map((optionText, optIdx) => {
                      const isSelected = userVal === optIdx;
                      const isCorrectChoice = optIdx === q.correctIndex;
                      let labelReviewClass = '';
                      if (isReview) {
                        if (isCorrectChoice) {
                          labelReviewClass = 'mk-ok font-semibold';
                        } else if (isSelected && !isCorrectChoice) {
                          labelReviewClass = 'mk-bad';
                        }
                      }

                      return (
                        <label
                          key={optIdx}
                          className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition-colors ${
                            !isReview ? 'hover:bg-[var(--bg)]' : ''
                          } ${labelReviewClass}`}
                        >
                          <input
                            type="radio"
                            name={`q${qIdx}`}
                            value={optIdx}
                            disabled={isReview}
                            checked={isSelected}
                            onChange={() => handlePick(qIdx, optIdx)}
                            onFocus={() => setActivePart(4)}
                            className="mt-1 accent-[var(--brand)]"
                          />
                          <span className="text-sm sm:text-base text-[var(--ink)]">
                            {optionText}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= PART 5 ================= */}
      <div id="part-5" className="scroll-mt-36">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[var(--ink)] m-0">
            Part 5
          </h2>
          <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-[var(--surface)] border border-[var(--line)] text-[var(--muted)]">
            Questions S30–S35
          </span>
        </div>
        <p className="text-base text-[var(--muted)] mb-4">
          Read the text. Then complete the summary (S30–S33) with ONE word from the text in each gap, and answer S34–S35.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
          {/* Passage */}
          <article className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 sm:p-6 lg:sticky lg:top-36 max-h-[calc(100vh-160px)] overflow-y-auto">
            <h3 className="font-serif font-bold text-2xl text-[var(--ink)] mb-4 pb-2 border-b border-[var(--line)]">
              {part5Title}
            </h3>
            <div className="space-y-4 font-serif text-base sm:text-lg leading-relaxed text-[var(--ink)]">
              {part5Paragraphs.map((par, pIdx) => (
                <p key={pIdx} className="m-0">
                  {par}
                </p>
              ))}
            </div>
          </article>

          {/* Right Column: Summary + S34-S35 */}
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 space-y-6">
            <div>
              <h3 className="font-serif font-bold text-xl text-[var(--ink)] mb-3 pb-2 border-b border-[var(--line)]">
                Summary
              </h3>
              <div className="font-serif text-base sm:text-lg leading-loose text-[var(--ink)]">
                {renderGaps(part5SummaryText, 29, 'S', 0)}
              </div>
            </div>

            {/* S34 and S35 MCQs */}
            <div className="space-y-6 pt-4 border-t border-[var(--line)]">
              {part5McQuestions.map((q, idx) => {
                const qIdx = q.targetQuestionIdx;
                const userVal = answers[qIdx];

                return (
                  <div key={idx} className="space-y-2">
                    <b className="block text-sm sm:text-base font-semibold text-[var(--ink)] mb-2">
                      S{qIdx + 1}. {q.questionText}
                    </b>

                    <div className="space-y-1.5">
                      {q.options.map((optionText, optIdx) => {
                        const isSelected = userVal === optIdx;
                        const isCorrectChoice = optIdx === q.correctIndex;
                        let labelReviewClass = '';
                        if (isReview) {
                          if (isCorrectChoice) {
                            labelReviewClass = 'mk-ok font-semibold';
                          } else if (isSelected && !isCorrectChoice) {
                            labelReviewClass = 'mk-bad';
                          }
                        }

                        return (
                          <label
                            key={optIdx}
                            className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition-colors ${
                              !isReview ? 'hover:bg-[var(--bg)]' : ''
                            } ${labelReviewClass}`}
                          >
                            <input
                              type="radio"
                              name={`q${qIdx}`}
                              value={optIdx}
                              disabled={isReview}
                              checked={isSelected}
                              onChange={() => handlePick(qIdx, optIdx)}
                              onFocus={() => setActivePart(5)}
                              className="mt-1 accent-[var(--brand)]"
                            />
                            <span className="text-sm sm:text-base text-[var(--ink)]">
                              {optionText}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Finish test button */}
      {!isReview && (
        <div className="pt-6 border-t border-[var(--line)] flex justify-end">
          <button
            onClick={onFinish}
            className="px-8 py-3.5 rounded-xl font-bold text-base bg-[var(--brand)] text-[var(--brand-ink)] cursor-pointer hover:opacity-95 shadow-sm transition-all focus-visible:outline-3 focus-visible:outline-[var(--accent)]"
          >
            Finish test
          </button>
        </div>
      )}

      {/* Time Up Alert Modal */}
      {showTimeUpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl max-w-md w-full p-6 shadow-xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-500/15 text-[var(--bad)] flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-[var(--ink)] m-0">
              Vaqt tugadi! (Time is up)
            </h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed m-0">
              60 daqiqalik sinov vaqti yakunlandi. Barcha belgilangan javoblaringiz saqlangan. Natijani koʻrish uchun testni yakunlang.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowTimeUpModal(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] cursor-pointer hover:bg-[var(--surface)]"
              >
                Koʻrib chiqish (Keep reviewing)
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowTimeUpModal(false);
                  onFinish();
                }}
                className="px-5 py-2 rounded-xl text-sm font-bold bg-[var(--brand)] text-[var(--brand-ink)] cursor-pointer hover:opacity-95"
              >
                Natijani koʻrish (Finish test)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
