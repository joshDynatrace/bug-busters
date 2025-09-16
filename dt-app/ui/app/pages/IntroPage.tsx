import React, { useState } from 'react';
import { Flex } from '@dynatrace/strato-components/layouts';
import { Heading, Paragraph } from '@dynatrace/strato-components/typography';
import { Button } from '@dynatrace/strato-components/buttons';
import { TextInput } from '@dynatrace/strato-components-preview/forms';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../contexts/QuizContext';
import { useTimer } from '../contexts/TimerContext';

export const IntroPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '' });
  const navigate = useNavigate();
  const { setUserInfo } = useQuiz();
  const { startTimer } = useTimer();

  const validateForm = () => {
    const newErrors = { name: '', email: '' };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleStartQuiz = () => {
    if (validateForm()) {
      setUserInfo(name, email);
      startTimer();
      navigate('/quiz/1');
    }
  };

  return (
    <Flex flexDirection="column" alignItems="center" padding={32} gap={32} style={{
      backgroundColor: '#ffffff',
      minHeight: 'calc(100vh - 200px)'
    }}>
      <img
        src="./assets/Dynatrace_Logo.svg"
        alt="Dynatrace Logo"
        width={150}
        height={150}
      />
      
      <Heading level={1} style={{ 
        color: '#0366d6', 
        textAlign: 'center',
        margin: 0
      }}>
        🐛 Welcome to Dynatrace Bug Busters!
      </Heading>
      
      <Flex flexDirection="column" alignItems="center" gap={20} style={{ maxWidth: '700px' }}>
        <Paragraph style={{ 
          textAlign: 'center', 
          fontSize: '18px',
          lineHeight: '1.6',
          color: '#24292f'
        }}>
          Ready to test your debugging skills?
          <br /><br />
          🕒 5 Questions. 100 points each. 30 minutes.
        </Paragraph>
        
        <Paragraph style={{ 
          textAlign: 'center',
          fontSize: '16px',
          lineHeight: '1.6',
          color: '#586069',
          fontStyle: 'italic'
        }}>
          Your score will be based on correct answers and time taken to complete the challenge.
        </Paragraph>
      </Flex>

      <Flex flexDirection="column" gap={24} style={{ 
        minWidth: '400px',
        padding: '32px',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        border: '1px solid #e1e4e8',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
      }}>
        <Heading level={3} style={{ 
          color: '#0366d6', 
          textAlign: 'center',
          margin: 0
        }}>
          📝 Enter Your Information
        </Heading>
        
        <Flex flexDirection="column" gap={2}>
          <label htmlFor="name" style={{ 
            fontSize: '16px', 
            fontWeight: '500',
            color: '#24292f'
          }}>
            👤 Name / Nickname *
          </label>
          <TextInput
            id="name"
            value={name}
            onChange={(value) => setName(value)}
            placeholder="Enter your full name"
            style={{ 
              borderColor: errors.name ? '#d73a49' : '#d1d5da',
              fontSize: '16px',
              padding: '12px'
            }}
          />
          {errors.name && (
            <Paragraph style={{ 
              color: '#d73a49', 
              fontSize: '14px', 
              margin: 0,
              fontWeight: '500'
            }}>
              ⚠️ {errors.name}
            </Paragraph>
          )}
        </Flex>

        <Flex flexDirection="column" gap={2}>
          <label htmlFor="email" style={{ 
            fontSize: '16px', 
            fontWeight: '500',
            color: '#24292f'
          }}>
            📧 Email *
          </label>
          <TextInput
            id="email"
            type="email"
            value={email}
            onChange={(value) => setEmail(value)}
            placeholder="Enter your email address"
            style={{ 
              borderColor: errors.email ? '#d73a49' : '#d1d5da',
              fontSize: '16px',
              padding: '12px'
            }}
          />
          {errors.email && (
            <Paragraph style={{ 
              color: '#d73a49', 
              fontSize: '14px', 
              margin: 0,
              fontWeight: '500'
            }}>
              ⚠️ {errors.email}
            </Paragraph>
          )}
          <Paragraph style={{ 
            color: '#586069', 
            fontSize: '14px', 
            margin: 0,
            fontStyle: 'italic',
            textAlign: 'center'
          }}>
            To contact you about the prize. No spam. Scouts honor.
          </Paragraph>
        </Flex>

        <Button
          onClick={handleStartQuiz}
          variant="emphasized"
          style={{ 
            marginTop: '20px',
            height: '48px',
            fontSize: '18px',
            fontWeight: '600',
            alignSelf: 'center'
          }}
        >
          🚀 Start Bug Busters Quiz
        </Button>
      </Flex>
    </Flex>
  );
};
