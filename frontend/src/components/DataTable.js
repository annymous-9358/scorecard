import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { calculateOverallScore, getPerformanceLevel } from '../utils/calculateScores';

const DataTable = ({ scores }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employee Name</TableCell>
            <TableCell align="right">Productivity</TableCell>
            <TableCell align="right">Quality</TableCell>
            <TableCell align="right">Timeliness</TableCell>
            <TableCell align="right">Overall Score</TableCell>
            <TableCell>Performance Level</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scores.map((score, index) => {
            const overallScore = calculateOverallScore(score);
            return (
              <TableRow key={index}>
                <TableCell>{score.employeeName}</TableCell>
                <TableCell align="right">{score.productivity}</TableCell>
                <TableCell align="right">{score.quality}</TableCell>
                <TableCell align="right">{score.timeliness}</TableCell>
                <TableCell align="right">{overallScore.toFixed(2)}</TableCell>
                <TableCell>{getPerformanceLevel(overallScore)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;