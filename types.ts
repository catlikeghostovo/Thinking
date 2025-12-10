
export interface Question {
  id: number;
  text: string;
  hint?: string; // Added optional hint
}

export interface Topic {
  id: string;
  number: string;
  titleEn: string;
  titleCn: string;
  color: string; // Hex code
  questions: Question[];
}

export type AppView = 'welcome' | 'mode_select' | 'toc' | 'shake' | 'editor' | 'summary';

export type ModeType = 'quick' | 'deep';

export interface UserAnswer {
  questionId: number;
  questionText: string;
  topicTitle: string;
  answer: string;
  date: string;
}

// Helper interface for the active session queue
export interface SessionItem {
  question: Question;
  topic: Topic;
}
