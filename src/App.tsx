/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header.tsx';
import { HomeView } from './components/HomeView.tsx';
import { LangView } from './components/LangView.tsx';
import { ListView } from './components/ListView.tsx';
import { TestView } from './components/TestView.tsx';
import { ResultView } from './components/ResultView.tsx';
import { HistoryModal } from './components/HistoryModal.tsx';
import { generateTest, GeneratedTest } from './data/questionBanks.ts';
import { Scoring } from './scoring/scoring.ts';
import { CandidateAnswer, ScoreResult, AttemptRecord } from './types/cefr.ts';

type ViewMode = 'home' | 'lang' | 'list' | 'test' | 'result';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('cefr_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('cefr_theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // View state
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedLang, setSelectedLang] = useState<string>('en');

  // Test data state
  const [testData, setTestData] = useState<GeneratedTest | null>(null);
  const [answers, setAnswers] = useState<CandidateAnswer[]>([]);
  const [isReview, setIsReview] = useState<boolean>(false);
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);

  // History state
  const [attempts, setAttempts] = useState<AttemptRecord[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  useEffect(() => {
    setAttempts(Scoring.getAttempts());
  }, []);

  const navigateTo = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartTest = () => {
    const freshTest = generateTest();
    // Tag the 35 questions into the 5 parts
    Scoring.tag(freshTest.questions, [6, 8, 6, 9, 6], freshTest.meta);

    setTestData(freshTest);
    setAnswers(new Array(freshTest.questions.length).fill(null));
    setIsReview(false);
    setScoreResult(null);
    navigateTo('test');
  };

  const handlePickAnswer = (questionIndex: number, value: CandidateAnswer) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[questionIndex] = value;
      return copy;
    });
  };

  const handleFinishTest = () => {
    if (!testData) return;
    const res = Scoring.score(testData.questions, answers);
    Scoring.save(res);
    setScoreResult(res);
    setAttempts(Scoring.getAttempts());
    navigateTo('result');
  };

  const handleReviewTest = () => {
    setIsReview(true);
    navigateTo('test');
  };

  const handleClearHistory = () => {
    localStorage.removeItem('cefr_reading_attempts');
    setAttempts([]);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[var(--accent)] selection:text-[var(--brand-ink)]">
      <div className="w-full max-w-[960px] mx-auto px-4 sm:px-6 pt-5 pb-12 flex-1">
        {/* Header with Mak EDU brand and theme toggle */}
        <Header
          onGoHome={() => navigateTo('home')}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* View Router */}
        <main>
          {currentView === 'home' && (
            <HomeView
              onSelectLang={(code) => {
                setSelectedLang(code);
                navigateTo('lang');
              }}
            />
          )}

          {currentView === 'lang' && (
            <LangView
              langCode={selectedLang}
              onBack={() => navigateTo('home')}
              onSelectSkill={(targetView) => {
                if (targetView === 'list') {
                  navigateTo('list');
                }
              }}
            />
          )}

          {currentView === 'list' && (
            <ListView
              onBack={() => navigateTo('lang')}
              onStartTest={handleStartTest}
              attempts={attempts}
              onOpenHistory={() => setIsHistoryOpen(true)}
            />
          )}

          {currentView === 'test' && testData && (
            <TestView
              testData={testData}
              answers={answers}
              onPickAnswer={handlePickAnswer}
              onFinish={handleFinishTest}
              isReview={isReview}
              onBackToResult={() => navigateTo('result')}
            />
          )}

          {currentView === 'result' && scoreResult && testData && (
            <ResultView
              scoreResult={scoreResult}
              questions={testData.questions}
              answers={answers}
              onReviewTest={handleReviewTest}
              onTryAgain={handleStartTest}
              onGoList={() => navigateTo('list')}
            />
          )}
        </main>
      </div>

      {/* History modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        attempts={attempts}
        onClearHistory={handleClearHistory}
      />

      {/* Footer from original file */}
      <footer className="w-full max-w-[960px] mx-auto px-4 pb-8 text-center text-sm text-[var(--muted)]">
        Powered by Muhammadayyub
      </footer>
    </div>
  );
}
