export const calculateOverallScore = (scores) => {
  return (Number(scores.productivity) + Number(scores.quality) + Number(scores.timeliness)) / 3;
};

export const getPerformanceLevel = (score) => {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Good';
  if (score >= 70) return 'Satisfactory';
  return 'Needs Improvement';
};