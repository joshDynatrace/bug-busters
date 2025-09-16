import React, { useState, useEffect } from 'react';
import { Flex } from '@dynatrace/strato-components/layouts';
import { Heading, Paragraph } from '@dynatrace/strato-components/typography';
import { Button } from '@dynatrace/strato-components/buttons';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuiz } from '../contexts/QuizContext';
import { quizQuestions } from '../data/quizData';

export const QuizPage: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const navigate = useNavigate();
  const { submitAnswer, nextQuestion } = useQuiz();

  const currentQuestionIndex = parseInt(questionId || '1') - 1;
  const question = quizQuestions[currentQuestionIndex];

  // Reset selected answer when question changes
  useEffect(() => {
    setSelectedAnswer('');
  }, [questionId]);

  if (!question) {
    navigate('/');
    return null;
  }

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    const isCorrect = question.answers.find(
      (answer) => answer.id === selectedAnswer
    )?.isCorrect || false;

    submitAnswer(question.id, selectedAnswer, isCorrect);
    nextQuestion();

    // Navigate to next question or results
    if (currentQuestionIndex < quizQuestions.length - 1) {
      navigate(`/quiz/${currentQuestionIndex + 2}`);
    } else {
      navigate('/results');
    }
  };

  return (
    <Flex 
      flexDirection="column" 
      padding={32} 
      gap={32} 
      style={{ 
        maxWidth: '900px', 
        margin: '0 auto',
        backgroundColor: '#ffffff',
        minHeight: 'calc(100vh - 200px)'
      }}
    >
      <Flex justifyContent="space-between" alignItems="center" style={{
        padding: '16px 24px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e1e4e8'
      }}>
        <Heading level={2} style={{ margin: 0, color: '#24292f' }}>
          Question {currentQuestionIndex + 1} of {quizQuestions.length}
        </Heading>
        <Paragraph style={{ 
          margin: 0, 
          fontSize: '14px',
          color: '#586069',
          fontWeight: '500'
        }}>
          Bug #{question.id}
        </Paragraph>
      </Flex>

      <Flex flexDirection="column" gap={24} style={{
        padding: '24px',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        border: '1px solid #e1e4e8'
      }}>
        <Heading level={3} style={{ 
          margin: 0, 
          color: '#0366d6',
          fontSize: '24px'
        }}>
          {question.bugHeading}
        </Heading>
        
        <Paragraph style={{
          margin: 0,
          color: '#24292f',
          fontSize: '16px',
          lineHeight: '1.6',
          fontStyle: 'italic'
        }}>
          <span dangerouslySetInnerHTML={{ __html: question.bugDescription }} />
        </Paragraph>
        
        <Flex flexDirection="column" gap={16}>
          <Heading level={4} style={{ 
            margin: 0, 
            color: '#24292f',
            fontSize: '18px'
          }}>
            💡 Hints:
          </Heading>
          <Flex flexDirection="column" gap={20}>
            {question.hints.map((hint, index) => (
              <div key={index}>
                <Paragraph style={{ 
                  margin: 0,
                  color: '#24292f',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  fontWeight: '500',
                  marginBottom: '8px'
                }}>
                  {hint.text}
                </Paragraph>
                <ul style={{ 
                  margin: 0, 
                  paddingLeft: '20px',
                  listStyleType: 'disc',
                  color: '#24292f'
                }}>
                  {hint.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} style={{ marginBottom: '6px' }}>
                      <Paragraph style={{ 
                        margin: 0,
                        color: '#24292f',
                        fontSize: '15px',
                        lineHeight: '1.5'
                      }}>
                        {bullet}
                      </Paragraph>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Flex>
        </Flex>
      </Flex>

      <Flex flexDirection="column" gap={24} style={{
        padding: '24px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '2px solid #0366d6',
        boxShadow: '0 4px 12px rgba(3, 102, 214, 0.1)'
      }}>
        <Heading level={4} style={{ 
          margin: 0,
          color: '#0366d6',
          fontSize: '20px'
        }}>
          🤔 {question.question}
        </Heading>
        
        <Flex flexDirection="column" gap={12}>
          {question.answers.map((answer) => (
            <label 
              key={answer.id} 
              style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '12px',
                cursor: 'pointer',
                padding: '16px',
                border: selectedAnswer === answer.id ? '2px solid #0066cc' : '1px solid #d1d5da',
                borderRadius: '8px',
                backgroundColor: selectedAnswer === answer.id ? '#f0f8ff' : '#ffffff',
                boxShadow: selectedAnswer === answer.id ? '0 2px 4px rgba(0, 102, 204, 0.1)' : '0 1px 2px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.2s ease-in-out'
              }}
              onMouseEnter={(e) => {
                if (selectedAnswer !== answer.id) {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                  e.currentTarget.style.borderColor = '#0066cc';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedAnswer !== answer.id) {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#d1d5da';
                }
              }}
            >
              <input
                type="radio"
                name="quiz-answer"
                value={answer.id}
                checked={selectedAnswer === answer.id}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                style={{ 
                  margin: '4px 0 0 0',
                  width: '16px',
                  height: '16px',
                  accentColor: '#0066cc'
                }}
              />
              <Paragraph style={{ 
                margin: 0, 
                fontSize: '16px',
                lineHeight: '1.5',
                color: '#24292f',
                fontWeight: selectedAnswer === answer.id ? '500' : '400'
              }}>
                {answer.text}
              </Paragraph>
            </label>
          ))}
        </Flex>

        <Button
          onClick={handleSubmitAnswer}
          variant="emphasized"
          disabled={!selectedAnswer}
          style={{ 
            marginTop: '24px', 
            alignSelf: 'flex-start',
            minWidth: '160px',
            height: '44px',
            fontSize: '16px',
            fontWeight: '500',
            backgroundColor: !selectedAnswer ? '#e1e4e8' : undefined,
            color: !selectedAnswer ? '#586069' : undefined,
            border: !selectedAnswer ? '1px solid #d1d5da' : undefined,
            cursor: !selectedAnswer ? 'not-allowed' : 'pointer',
            opacity: !selectedAnswer ? 0.7 : 1
          }}
        >
          {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question →' : 'Finish Quiz 🎉'}
        </Button>
      </Flex>
    </Flex>
  );
};
