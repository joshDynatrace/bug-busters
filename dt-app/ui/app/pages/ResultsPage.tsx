import React, { useEffect, useState } from 'react';
import { Flex } from '@dynatrace/strato-components/layouts';
import { Heading, Paragraph } from '@dynatrace/strato-components/typography';
import { Button } from '@dynatrace/strato-components/buttons';
import { useNavigate } from 'react-router-dom';
import { useSetUserAppState } from '@dynatrace-sdk/react-hooks';
import { useQuiz } from '../contexts/QuizContext';
import { useTimer } from '../contexts/TimerContext';
import { quizQuestions, QUIZ_TIMER_INITIAL } from '../data/quizData';

export const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { userAnswers, userName, userEmail, calculateScore, resetQuiz } = useQuiz();
  const { timeRemaining, stopTimer, resetTimer } = useTimer();
  const [saveComplete, setSaveComplete] = useState(false);
  const { execute: saveUserState, isLoading: isSaving } = useSetUserAppState();

  const finalScore = calculateScore(timeRemaining);
  const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
  const incorrectAnswers = userAnswers.filter(answer => !answer.isCorrect).length;
  
  // Calculate the same multiplier logic for display
  const timePercentage = timeRemaining / QUIZ_TIMER_INITIAL;
  const timeMultiplier = 1 + timePercentage;
  const baseCorrectPoints = correctAnswers * 100;
  const multipliedCorrectPoints = Math.round(baseCorrectPoints * timeMultiplier);

  useEffect(() => {
    stopTimer();
    saveUserResults();
  }, []);

  const saveUserResults = async () => {
    try {
      const resultData = {
        version: '1',
        name: userName,
        email: userEmail,
        score: finalScore,
        correctAnswers,
        incorrectAnswers,
        totalQuestions: quizQuestions.length,
        timeRemaining,
        completedAt: new Date().toISOString(),
        answers: userAnswers
      };
      
      // Save to Dynatrace user app state
      await saveUserState({
        key: `bug-busters-results-${Date.now()}`,
        body: {
          value: JSON.stringify(resultData),
          validUntilTime: 'now+90d', // Keep results for 90 days
        }
      });
      
      setSaveComplete(true);
    } catch (error) {
      console.error('Failed to save quiz results:', error);
    }
  };

  const handleRestartQuiz = () => {
    resetQuiz();
    resetTimer();
    navigate('/');
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Flex flexDirection="column" padding={32} gap={24} style={{ 
      maxWidth: '800px', 
      margin: '0 auto',
      backgroundColor: '#ffffff',
      minHeight: 'calc(100vh - 200px)'
    }}>
      <Flex flexDirection="column" alignItems="center" gap={16}>
        <Heading level={1} style={{ color: '#0366d6', margin: 0 }}>
          🎉 Quiz Complete!
        </Heading>
        <Paragraph style={{ 
          fontSize: '18px', 
          textAlign: 'center',
          color: '#24292f',
          margin: 0
        }}>
          Congratulations {userName}! You've completed the Bug Busters quiz.
        </Paragraph>
      </Flex>

      <Flex flexDirection="column" gap={16} style={{ 
        padding: '24px', 
        border: '2px solid #28a745', 
        borderRadius: '12px',
        backgroundColor: '#f0f8f0'
      }}>
        <Heading level={2} style={{ color: '#155724', margin: 0 }}>
          🏆 Your Final Score
        </Heading>
        <Flex justifyContent="space-between" alignItems="center">
          <Paragraph style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            color: '#155724',
            margin: 0
          }}>
            {finalScore} points
          </Paragraph>
          <Paragraph style={{ 
            color: '#155724',
            fontSize: '16px',
            margin: 0
          }}>
            ⏱️ Time Remaining: {formatTime(timeRemaining)}
          </Paragraph>
        </Flex>
        
        <Flex flexDirection="column" gap={8}>
          <Paragraph style={{ color: '#155724', fontSize: '16px', margin: 0 }}>
            ✅ Correct Answers: {correctAnswers} out of {quizQuestions.length}
          </Paragraph>
          <Paragraph style={{ color: '#155724', fontSize: '16px', margin: 0 }}>
            🎯 Base Score: {baseCorrectPoints} points ({correctAnswers} × 100)
          </Paragraph>
          <Paragraph style={{ color: '#0366d6', fontSize: '16px', margin: 0 }}>
            ⏱️ Time Multiplier: {timeMultiplier.toFixed(2)}x ({Math.round(timePercentage * 100)}% time remaining)
          </Paragraph>
          <Paragraph style={{ color: '#155724', fontSize: '16px', margin: 0 }}>
            🚀 Time-Boosted Score: {multipliedCorrectPoints} points
          </Paragraph>
          {incorrectAnswers > 0 && (
            <Paragraph style={{ color: '#dc3545', fontSize: '16px', margin: 0 }}>
              ❌ Wrong Answer Penalty: -{incorrectAnswers * 100} points
            </Paragraph>
          )}
        </Flex>
      </Flex>

      <Flex flexDirection="column" gap={16}>
        <Heading level={3} style={{ color: '#24292f', margin: 0 }}>
          📝 Review Your Answers
        </Heading>
        {quizQuestions.map((question, index) => {
          const userAnswer = userAnswers.find(answer => answer.questionId === question.id);
          const selectedAnswer = question.answers.find(answer => answer.id === userAnswer?.selectedAnswerId);
          const correctAnswer = question.answers.find(answer => answer.isCorrect);
          
          return (
            <Flex 
              key={question.id} 
              flexDirection="column" 
              gap={12}
              style={{ 
                padding: '20px',
                border: `2px solid ${userAnswer?.isCorrect ? '#28a745' : '#dc3545'}`,
                borderRadius: '12px',
                backgroundColor: userAnswer?.isCorrect ? '#f0f8f0' : '#fff5f5'
              }}
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Heading level={4} style={{ 
                  color: '#24292f',
                  margin: 0,
                  fontSize: '18px'
                }}>
                  Question {index + 1}: {question.bugHeading}
                </Heading>
                <Paragraph style={{ 
                  color: userAnswer?.isCorrect ? '#155724' : '#721c24',
                  fontWeight: 'bold',
                  margin: 0,
                  fontSize: '16px'
                }}>
                  {userAnswer?.isCorrect ? '✅ Correct' : '❌ Incorrect'}
                </Paragraph>
              </Flex>
              
              <Paragraph style={{ 
                fontStyle: 'italic',
                color: '#6a737d',
                margin: 0,
                fontSize: '15px'
              }}>
                {question.question}
              </Paragraph>
              
              <Flex flexDirection="column" gap={8}>
                <Paragraph style={{ 
                  color: '#24292f',
                  margin: 0,
                  fontSize: '16px'
                }}>
                  Your answer: <strong style={{ color: userAnswer?.isCorrect ? '#155724' : '#721c24' }}>
                    {selectedAnswer?.text}
                  </strong>
                </Paragraph>
                {!userAnswer?.isCorrect && (
                  <Paragraph style={{ 
                    color: '#155724',
                    margin: 0,
                    fontSize: '16px'
                  }}>
                    Correct answer: <strong>{correctAnswer?.text}</strong>
                  </Paragraph>
                )}
              </Flex>
            </Flex>
          );
        })}
      </Flex>

      <Flex flexDirection="column" gap={16} alignItems="center" style={{
        padding: '24px',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        border: '1px solid #e1e4e8'
      }}>
        {isSaving && (
          <Paragraph style={{ 
            color: '#0366d6',
            fontSize: '16px',
            margin: 0,
            fontWeight: '500'
          }}>
            💾 Saving your results to Dynatrace state service...
          </Paragraph>
        )}
        
        {saveComplete && (
          <Paragraph style={{ 
            color: '#155724', 
            fontWeight: 'bold',
            fontSize: '16px',
            margin: 0
          }}>
            ✅ Results saved successfully!
          </Paragraph>
        )}

        <Button
          onClick={handleRestartQuiz}
          variant="emphasized"
          disabled={isSaving}
          style={{
            minWidth: '200px',
            height: '48px',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          🔄 Take Quiz Again
        </Button>
      </Flex>
    </Flex>
  );
};
