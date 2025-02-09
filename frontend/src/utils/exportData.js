import { utils, writeFile } from 'xlsx';
import { calculateOverallScore, getPerformanceLevel } from './calculateScores';

export const exportToExcel = (scores, filename = 'scorecard_report.xlsx') => {
  const data = scores.map(score => ({
    ...score,
    overallScore: calculateOverallScore(score).toFixed(2),
    performanceLevel: getPerformanceLevel(calculateOverallScore(score))
  }));

  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Scores");
  writeFile(wb, filename);
};

export const exportToPDF = (scores) => {
  // PDF export functionality can be implemented here
  console.log('PDF export not implemented yet');
};