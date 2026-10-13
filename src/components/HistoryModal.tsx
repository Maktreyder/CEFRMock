import React from 'react';
import { X, Calendar, Award, CheckCircle, BarChart2 } from 'lucide-react';
import { AttemptRecord } from '../types/cefr.ts';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  attempts: AttemptRecord[];
  onClearHistory: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  attempts,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl w-full max-w-xl max-h-[85vh] flex flex-col shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between p-5 border-b border-[var(--line)]">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-[var(--brand)]" />
            <h3 className="font-serif font-bold text-xl text-[var(--ink)] m-0">
              Practice History
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--bg)] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {attempts.length === 0 ? (
            <p className="text-center text-[var(--muted)] py-8">
              No saved test attempts yet. Complete a test to see your history!
            </p>
          ) : (
            attempts
              .slice()
              .reverse()
              .map((att, idx) => (
                <div
                  key={idx}
                  className="bg-[var(--bg)] border border-[var(--line)] rounded-xl p-4 space-y-2 text-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(att.time).toLocaleString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    {att.official && (
                      <span className="font-serif font-bold text-[var(--brand)] text-base">
                        {att.official.scaled} / 75
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between font-medium">
                    <span className="text-[var(--ink)]">
                      Raw Score: <b>{att.total}</b> / {att.max} ({((att.total / att.max) * 100).toFixed(1)}%)
                    </span>
                  </div>

                  {att.byPart && (
                    <div className="flex flex-wrap gap-2 pt-1 border-t border-[var(--line)]/50 text-xs text-[var(--muted)]">
                      {att.byPart.map((p) => (
                        <span key={p.part} className="font-mono">
                          P{p.part}: {p.correct}/{p.max}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
          )}
        </div>

        <div className="p-4 border-t border-[var(--line)] bg-[var(--surface)] flex items-center justify-between">
          {attempts.length > 0 && (
            <button
              onClick={onClearHistory}
              className="text-xs text-[var(--bad)] hover:underline cursor-pointer font-medium"
            >
              Clear history
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-auto px-4 py-2 rounded-xl text-sm font-semibold bg-[var(--brand)] text-[var(--brand-ink)] cursor-pointer hover:opacity-95"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
