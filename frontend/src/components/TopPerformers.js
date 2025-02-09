import React from 'react';
import { 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar,
  Box,
  Chip
} from '@mui/material';
import { Star, EmojiEvents } from '@mui/icons-material';
import { calculateOverallScore } from '../utils/calculateScores';

const TopPerformers = ({ scores }) => {
  const sortedScores = [...scores]
    .sort((a, b) => calculateOverallScore(b) - calculateOverallScore(a))
    .slice(0, 3);

  const getPerformanceColor = (index) => {
    switch(index) {
      case 0: return '#FFD700'; 
      case 1: return '#C0C0C0'; 
      case 2: return '#CD7F32'; 
      default: return '#1976d2';
    }
  };

  return (
    <Paper 
      sx={{ 
        p: 3,
        bgcolor: '#f8f9fa',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <EmojiEvents sx={{ color: '#FFD700', mr: 1 }} />
        <Typography variant="h5">
          Top Performers
        </Typography>
      </Box>
      <List sx={{ width: '100%' }}>
        {sortedScores.map((score, index) => (
          <ListItem 
            key={index}
            sx={{
              mb: 2,
              bgcolor: 'white',
              borderRadius: 2,
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            <ListItemAvatar>
              <Avatar 
                sx={{ 
                  bgcolor: getPerformanceColor(index),
                  width: 56,
                  height: 56
                }}
              >
                <Star />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6">
                    {score.employeeName}
                  </Typography>
                  <Chip 
                    label={`#${index + 1}`}
                    size="small"
                    sx={{ 
                      ml: 1,
                      bgcolor: getPerformanceColor(index),
                      color: 'white'
                    }}
                  />
                </Box>
              }
              secondary={
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Overall Score: {calculateOverallScore(score).toFixed(2)}%
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TopPerformers;