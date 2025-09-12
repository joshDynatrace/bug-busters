import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { QUIZ_TIMER_INITIAL } from '../data/quizData';

interface TimerContextType {
  timeRemaining: number;
  isTimerRunning: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};

interface TimerProviderProps {
  children: ReactNode;
}

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [timeRemaining, setTimeRemaining] = useState(QUIZ_TIMER_INITIAL);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerRunning, timeRemaining]);

  const startTimer = () => setIsTimerRunning(true);
  const stopTimer = () => setIsTimerRunning(false);
  const resetTimer = () => {
    setTimeRemaining(QUIZ_TIMER_INITIAL);
    setIsTimerRunning(false);
  };

  return (
    <TimerContext.Provider
      value={{
        timeRemaining,
        isTimerRunning,
        startTimer,
        stopTimer,
        resetTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
