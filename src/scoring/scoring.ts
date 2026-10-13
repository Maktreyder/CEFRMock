import {
  Question,
  CandidateAnswer,
  ScoreRecord,
  ScoreResult,
  AttemptRecord,
  OfficialScoreResult,
} from '../types/cefr.ts';

/**
 * Scoring module for CEFR Multilevel mock tests.
 * Raw score = 1 point per correct answer, 0 for wrong or blank (max 35).
 * The 0-75 estimate comes from the average conversion table provided by the platform owner.
 * No CEFR level is assigned.
 */

export const MAX_QUESTIONS = 35;
const STORAGE_KEY = 'cefr_reading_attempts';

type ConverterFn = (
  rawScore: number,
  meta?: Record<string, any>
) => OfficialScoreResult | null;

class ScoringService {
  public readonly MAX = MAX_QUESTIONS;
  private converter: ConverterFn | null = null;
  private meta: Record<string, any> = {};

  constructor() {
    // Default 75-point scale converter from the original applet
    this.setConverter((raw: number) => {
      const T: (number | null)[] = [
        null, 20, 24, 27, 29, 32, 34, 36, 38, 39, 41, 42, 44, 45, 46, 48, 49,
        51, 52, 54, 55, 57, 58, 60, 61, 63, 65, 66, 68, 70, 71, 73, 74, 75, 75, 75,
      ];
      const v = T[raw];
      return v === null || v === undefined
        ? null
        : {
            scaled: v,
            source: 'average conversion table provided by the platform owner',
          };
    });
  }

  /**
   * Tags questions with part number and Q1..Qn ID
   */
  public tag(list: Question[], sizes: number[], m?: Record<string, any>): void {
    this.meta = m || {};
    let n = 0;
    sizes.forEach((s, p) => {
      for (let k = 0; k < s; k++) {
        const q = list[n++];
        if (q) {
          q.part = p + 1;
          q.id = 'Q' + n;
        }
      }
    });
  }

  public sum(records: { rawScore: number }[]): number {
    return records.reduce((s, r) => s + r.rawScore, 0);
  }

  /**
   * Evaluates answers and computes total score, percentage, and part breakdown
   */
  public score(list: Question[], ans: CandidateAnswer[]): ScoreResult {
    const records: ScoreRecord[] = list.map((q, i) => {
      const u = ans[i];
      const has = u !== null && u !== undefined && u !== '';

      let ok = false;
      if (has) {
        if (typeof u === 'string' && typeof q.a === 'string') {
          const userStr = u.trim().toLowerCase();
          const targetStr = q.a.trim().toLowerCase();
          const altStrs = q.alt ? q.alt.map((x) => x.trim().toLowerCase()) : [];
          ok = userStr === targetStr || altStrs.includes(userStr);
        } else {
          ok = u === q.a || Boolean(q.alt && q.alt.includes(String(u)));
        }
      }

      const getOptionDisplay = (val: any) => {
        if (val === null || val === undefined) return null;
        if (Array.isArray(q.o)) {
          return q.o[val] !== undefined ? String(q.o[val]) : String(val);
        }
        if (typeof q.o === 'object' && q.o !== null) {
          return q.o[val] !== undefined ? String(q.o[val]) : String(val);
        }
        return String(val);
      };

      const correctAnswer = getOptionDisplay(q.a) ?? String(q.a);
      const candidateAnswer = has ? (getOptionDisplay(u) ?? String(u)) : null;

      return {
        id: q.id || `Q${i + 1}`,
        part: q.part || 1,
        correctAnswer,
        candidateAnswer,
        rawScore: ok ? 1 : 0,
      };
    });

    if (records.length !== this.MAX) {
      console.warn(`Expected ${this.MAX} questions, got ${records.length}`);
    }

    const total = this.sum(records);
    const byPart = [1, 2, 3, 4, 5].map((p) => {
      const rs = records.filter((r) => r.part === p);
      return {
        part: p,
        correct: this.sum(rs),
        max: rs.length,
      };
    });

    let official: OfficialScoreResult | null = null;
    if (this.converter) {
      try {
        official = this.converter(total, this.meta);
      } catch (e) {
        console.error('Error computing official score:', e);
        official = null;
      }
    }

    return {
      records,
      total,
      max: this.MAX,
      percent: (total / this.MAX) * 100,
      byPart,
      official,
      meta: this.meta,
    };
  }

  /**
   * Persists attempt in localStorage (retains up to 20 attempts)
   */
  public save(res: ScoreResult): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list: AttemptRecord[] = raw ? JSON.parse(raw) : [];
      list.push({
        time: new Date().toISOString(),
        total: res.total,
        max: res.max,
        byPart: res.byPart,
        meta: res.meta,
        official: res.official,
        records: res.records,
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(-20)));
    } catch (e) {
      console.warn('Unable to save attempt to localStorage:', e);
    }
  }

  /**
   * Retrieves previous attempts from localStorage
   */
  public getAttempts(): AttemptRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  public setConverter(fn: ConverterFn | null): void {
    this.converter = typeof fn === 'function' ? fn : null;
  }
}

export const Scoring = new ScoringService();
