import React from 'react';
import { Flex } from '@dynatrace/strato-components/layouts';
import { Heading, Paragraph } from '@dynatrace/strato-components/typography';
import { ProgressBar } from '@dynatrace/strato-components/content';
import { useTimer } from '../contexts/TimerContext';
import { QUIZ_TIMER_INITIAL } from '../data/quizData';

export const TimerBar: React.FC = () => {
  const { timeRemaining, isTimerRunning } = useTimer();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (timeRemaining / QUIZ_TIMER_INITIAL) * 100;

  return (
    <Flex
      flexDirection="column"
      gap={8}
      padding={16}
      style={{
        backgroundColor: '#0366d6',
        borderBottom: '1px solid #0366d6',
        minHeight: '70px',
        color: '#ffffff'
      }}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Heading level={4} style={{ margin: 0, color: '#ffffff' }}>
          🐛 Bug Busters Quiz Timer
        </Heading>
        <Heading level={4} style={{ 
          margin: 0, 
          color: timeRemaining < 300 ? '#ffeb3b' : '#ffffff',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          ⏱️ {formatTime(timeRemaining)}
        </Heading>
      </Flex>
      <ProgressBar 
        value={progressPercentage}
        color={timeRemaining < 300 ? 'critical' : 'primary'}
        style={{ 
          height: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.3)'
        }}
      />
      {!isTimerRunning && timeRemaining > 0 && (
        <Paragraph style={{ 
          fontSize: '14px', 
          color: 'rgba(255, 255, 255, 0.8)',
          margin: 0
        }}>
          ⚡ Timer will start when you begin the quiz
        </Paragraph>
      )}
      {timeRemaining === 0 && (
        <Paragraph style={{ 
          fontSize: '14px', 
          color: '#ffeb3b',
          margin: 0,
          fontWeight: 'bold'
        }}>
          ⏰ Time's up!
        </Paragraph>
      )}
    </Flex>
  );
};
