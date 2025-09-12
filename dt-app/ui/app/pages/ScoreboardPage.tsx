import React, { useEffect, useState } from 'react';
import { Flex } from '@dynatrace/strato-components/layouts';
import { Heading, Paragraph } from '@dynatrace/strato-components/typography';
import { Button } from '@dynatrace/strato-components/buttons';
import { useUserAppStates } from '@dynatrace-sdk/react-hooks';

interface UserResult {
  name: string;
  score: number;
}

export const ScoreboardPage: React.FC = () => {
  const [topScores, setTopScores] = useState<UserResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get all user app states with filter for bug-busters results
  const { data: userStates, refetch } = useUserAppStates({
    filter: "key starts-with 'bug-busters-results-'",
    addFields: 'value'
  });

  useEffect(() => {
    if (userStates) {
      loadScoreboard();
    }
  }, [userStates]);

  const loadScoreboard = () => {
    try {
      setIsLoading(true);
      
      if (userStates && userStates.length > 0) {
        const allResults: UserResult[] = [];
        
        for (const state of userStates) {
          try {
            if (state.value) {
              const resultData = JSON.parse(state.value);
              allResults.push({
                name: resultData.name || 'Anonymous',
                score: resultData.score || 0
              });
            }
          } catch (error) {
            console.warn('Failed to parse state:', state.key, error);
          }
        }
        
        // Sort by score (highest first) and take top 100
        const sortedResults = allResults
          .sort((a, b) => b.score - a.score)
          .slice(0, 100);
          
        setTopScores(sortedResults);
      } else {
        setTopScores([]);
      }
    } catch (error) {
      console.error('Failed to load scoreboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRankDisplay = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}`;
  };

  const getRankColor = (index: number) => {
    if (index === 0) return '#FFD700';
    if (index === 1) return '#C0C0C0';
    if (index === 2) return '#CD7F32';
    return '#24292f';
  };

  return (
    <Flex 
      flexDirection="column" 
      padding={32} 
      gap={32} 
      style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        backgroundColor: '#ffffff',
        minHeight: 'calc(100vh - 200px)'
      }}
    >
      <Flex flexDirection="column" alignItems="center" gap={16}>
        <Heading level={1} style={{ color: '#0366d6', margin: 0 }}>
          🏆 Top Scores
        </Heading>
        <Paragraph style={{ 
          fontSize: '18px', 
          textAlign: 'center',
          color: '#24292f',
          margin: 0
        }}>
          Bug Busters Quiz Leaderboard
        </Paragraph>
      </Flex>

      {isLoading ? (
        <Flex justifyContent="center" alignItems="center" style={{ minHeight: '200px' }}>
          <Paragraph style={{ 
            fontSize: '18px',
            color: '#586069',
            margin: 0
          }}>
            🔄 Loading scoreboard...
          </Paragraph>
        </Flex>
      ) : topScores.length > 0 ? (
        <Flex flexDirection="column" gap={16}>
          <Flex justifyContent="space-between" alignItems="center" style={{
            padding: '16px 24px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e1e4e8'
          }}>
            <Paragraph style={{ 
              margin: 0, 
              fontWeight: 'bold',
              color: '#24292f',
              fontSize: '16px'
            }}>
              Total Participants: {topScores.length}
            </Paragraph>
            <Button 
              onClick={() => refetch()}
              variant="emphasized"
              style={{ 
                height: '32px',
                backgroundColor: '#0366d6',
                color: '#ffffff',
                border: 'none',
                fontWeight: '500'
              }}
            >
              🔄 Refresh
            </Button>
          </Flex>

          {/* Table Header */}
          <Flex style={{
            padding: '16px 24px',
            backgroundColor: '#f1f3f4',
            borderRadius: '8px 8px 0 0',
            border: '1px solid #e1e4e8',
            borderBottom: 'none'
          }}>
            <Flex style={{ width: '100px' }}>
              <Paragraph style={{ fontWeight: 'bold', color: '#24292f', margin: 0 }}>
                Rank
              </Paragraph>
            </Flex>
            <Flex style={{ flex: 1 }}>
              <Paragraph style={{ fontWeight: 'bold', color: '#24292f', margin: 0 }}>
                Name
              </Paragraph>
            </Flex>
            <Flex style={{ width: '150px', justifyContent: 'flex-end' }}>
              <Paragraph style={{ fontWeight: 'bold', color: '#24292f', margin: 0 }}>
                Score
              </Paragraph>
            </Flex>
          </Flex>

          {/* Table Rows */}
          <div style={{ 
            border: '1px solid #e1e4e8',
            borderRadius: '0 0 8px 8px',
            overflow: 'hidden'
          }}>
            {topScores.map((result, index) => (
              <Flex 
                key={`${result.name}-${result.score}-${index}`}
                style={{
                  padding: '16px 24px',
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa',
                  borderBottom: index < topScores.length - 1 ? '1px solid #e1e4e8' : 'none'
                }}
              >
                <Flex style={{ width: '100px' }} alignItems="center">
                  <Paragraph style={{ 
                    fontWeight: 'bold',
                    color: getRankColor(index),
                    margin: 0,
                    fontSize: '18px'
                  }}>
                    {getRankDisplay(index)}
                  </Paragraph>
                </Flex>
                <Flex style={{ flex: 1 }} alignItems="center">
                  <Paragraph style={{ 
                    fontWeight: '500', 
                    color: '#24292f',
                    margin: 0,
                    fontSize: '16px'
                  }}>
                    {result.name}
                  </Paragraph>
                </Flex>
                <Flex style={{ width: '150px', justifyContent: 'flex-end' }} alignItems="center">
                  <Paragraph style={{ 
                    fontWeight: 'bold', 
                    color: '#155724',
                    fontSize: '18px',
                    margin: 0
                  }}>
                    {result.score} pts
                  </Paragraph>
                </Flex>
              </Flex>
            ))}
          </div>
        </Flex>
      ) : (
        <Flex 
          flexDirection="column" 
          alignItems="center" 
          gap={16}
          style={{
            padding: '48px',
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            border: '1px solid #e1e4e8'
          }}
        >
          <Paragraph style={{ 
            fontSize: '24px',
            color: '#586069',
            margin: 0
          }}>
            📊 No scores yet!
          </Paragraph>
          <Paragraph style={{ 
            fontSize: '16px',
            color: '#586069',
            textAlign: 'center',
            margin: 0
          }}>
            Be the first to complete the Bug Busters quiz and appear on the scoreboard.
          </Paragraph>
        </Flex>
      )}
    </Flex>
  );
};
