import React, { createContext, useContext, useState, ReactNode } from 'react';
import { QuizQuestion, POINTS_PER_CORRECT_ANSWER, QUIZ_TIMER_INITIAL } from '../data/quizData';

interface UserAnswer {
  questionId: number;
  selectedAnswerId: string;
  isCorrect: boolean;
}

interface QuizContextType {
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  userName: string;
  userEmail: string;
  isQuizCompleted: boolean;
  setUserInfo: (name: string, email: string) => void;
  submitAnswer: (questionId: number, selectedAnswerId: string, isCorrect: boolean) => void;
  nextQuestion: () => void;
  calculateScore: (timeRemaining: number) => number;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const setUserInfo = (name: string, email: string) => {
    setUserName(name);
    setUserEmail(email);
  };

  const submitAnswer = (questionId: number, selectedAnswerId: string, isCorrect: boolean) => {
    const newAnswer: UserAnswer = {
      questionId,
      selectedAnswerId,
      isCorrect,
    };

    setUserAnswers((prev) => {
      const existingIndex = prev.findIndex((answer) => answer.questionId === questionId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newAnswer;
        return updated;
      }
      return [...prev, newAnswer];
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < 3) { // 4 questions total (0-3)
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const calculateScore = (timeRemaining: number) => {
    const correctAnswers = userAnswers.filter((answer) => answer.isCorrect).length;
    const incorrectAnswers = userAnswers.filter((answer) => !answer.isCorrect).length;
    
    // Calculate time multiplier (percentage of time remaining + 1)
    // This means 100% time remaining = 2x multiplier, 50% = 1.5x, 0% = 1x
    const timePercentage = timeRemaining / QUIZ_TIMER_INITIAL;
    const timeMultiplier = 1 + timePercentage;
    
    const baseCorrectPoints = correctAnswers * POINTS_PER_CORRECT_ANSWER;
    const multipliedCorrectPoints = Math.round(baseCorrectPoints * timeMultiplier);
    const penaltyPoints = incorrectAnswers * POINTS_PER_CORRECT_ANSWER;
    
    return Math.max(0, multipliedCorrectPoints - penaltyPoints); // Ensure score doesn't go negative
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setUserName('');
    setUserEmail('');
    setIsQuizCompleted(false);
  };

  return (
    <QuizContext.Provider
      value={{
        currentQuestionIndex,
        userAnswers,
        userName,
        userEmail,
        isQuizCompleted,
        setUserInfo,
        submitAnswer,
        nextQuestion,
        calculateScore,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
