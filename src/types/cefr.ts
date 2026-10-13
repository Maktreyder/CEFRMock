export interface Question {
  id?: string;
  part?: number;
  t: string;
  o: Record<string | number, string> | string[];
  a: string | number;
  alt?: string[];
  gap?: number | boolean;
  mc?: number | boolean;
  m?: number | boolean;
}

export interface ScoreRecord {
  id: string;
  part: number;
  correctAnswer: string;
  candidateAnswer: string | null;
  rawScore: number;
}

export interface PartBreakdown {
  part: number;
  correct: number;
  max: number;
}

export interface OfficialScoreResult {
  scaled: number;
  source: string;
}

export interface ScoreResult {
  records: ScoreRecord[];
  total: number;
  max: number;
  percent: number;
  byPart: PartBreakdown[];
  official: OfficialScoreResult | null;
  meta: Record<string, any>;
}

export interface AttemptRecord {
  time: string;
  total: number;
  max: number;
  byPart: PartBreakdown[];
  meta: Record<string, any>;
  official: OfficialScoreResult | null;
  records: ScoreRecord[];
}

export type CandidateAnswer = string | number | null;

export interface LanguageSkill {
  name: string;
  targetView: string | 0;
}

export interface LanguageOption {
  code: string;
  name: string;
  sub: string;
  live: boolean;
  skills: [string, string | 0][];
}
