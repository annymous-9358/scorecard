import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import { Bar, Radar, Pie } from "react-chartjs-2";
import { useScores } from "../context/ScoreContext";
import { TrendingUp, TrendingDown } from "@mui/icons-material";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement
);

function Comparison() {
  const { scores } = useScores();
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [viewType, setViewType] = useState("bar");

  const filteredScores = scores.filter((score) =>
    selectedEmployees.includes(score.employeeName)
  );

  const calculateAverage = (score) =>
    (Number(score.productivity) +
      Number(score.quality) +
      Number(score.timeliness)) /
    3;

  const sortedScores = [...filteredScores].sort(
    (a, b) => calculateAverage(b) - calculateAverage(a)
  );

  const getPerformanceColor = (value) => {
    if (value >= 90) return "#4caf50";
    if (value >= 70) return "#ff9800";
    return "#f44336";
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  // Add color palette
  const chartColors = {
    main: [
      "rgba(25, 118, 210, 0.7)", // Blue
      "rgba(156, 39, 176, 0.7)", // Purple
      "rgba(0, 150, 136, 0.7)", // Teal
      "rgba(255, 152, 0, 0.7)", // Orange
      "rgba(76, 175, 80, 0.7)", // Green
    ],
    light: [
      "rgba(25, 118, 210, 0.2)",
      "rgba(156, 39, 176, 0.2)",
      "rgba(0, 150, 136, 0.2)",
      "rgba(255, 152, 0, 0.2)",
      "rgba(76, 175, 80, 0.2)",
    ],
  };

  // Update chartData with new colors
  const chartData = {
    bar: {
      labels: ["Productivity", "Quality", "Timeliness"],
      datasets: filteredScores.map((score, index) => ({
        label: score.employeeName,
        data: [score.productivity, score.quality, score.timeliness],
        backgroundColor: chartColors.main[index % chartColors.main.length],
      })),
    },
    radar: {
      labels: ["Productivity", "Quality", "Timeliness"],
      datasets: filteredScores.map((score, index) => ({
        label: score.employeeName,
        data: [score.productivity, score.quality, score.timeliness],
        backgroundColor: chartColors.light[index % chartColors.light.length],
        borderColor: chartColors.main[index % chartColors.main.length],
        borderWidth: 2,
      })),
    },
    pie: {
      labels: selectedEmployees,
      datasets: [
        {
          data: filteredScores.map(calculateAverage),
          backgroundColor: filteredScores.map(
            (_, index) => chartColors.main[index % chartColors.main.length]
          ),
        },
      ],
    },
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2" }}>
          Performance Comparison
        </Typography>
        <Divider sx={{ my: 2 }} />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <FormControl fullWidth size="small">
            <InputLabel>Select Employees to Compare</InputLabel>
            <Select
              multiple
              value={selectedEmployees}
              onChange={(e) => setSelectedEmployees(e.target.value)}
              renderValue={(selected) => selected.join(", ")}
            >
              {scores.map((score) => (
                <MenuItem key={score.employeeName} value={score.employeeName}>
                  {score.employeeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <ToggleButtonGroup
            size="small"
            value={viewType}
            exclusive
            onChange={(e, value) => value && setViewType(value)}
            fullWidth
          >
            <ToggleButton value="bar">Bar Chart</ToggleButton>
            <ToggleButton value="radar">Radar Chart</ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        {selectedEmployees.length > 0 && (
          <>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 2, height: "300px" }}>
                <Box sx={{ height: "100%" }}>
                  {viewType === "bar" ? (
                    <Bar data={chartData.bar} options={chartOptions} />
                  ) : (
                    <Radar data={chartData.radar} options={chartOptions} />
                  )}
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, height: "300px" }}>
                <Typography variant="subtitle1" gutterBottom align="center">
                  Overall Performance
                </Typography>
                <Box sx={{ height: "calc(100% - 30px)" }}>
                  <Pie data={chartData.pie} options={chartOptions} />
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Rank</TableCell>
                      <TableCell>Employee</TableCell>
                      <TableCell align="right">Productivity</TableCell>
                      <TableCell align="right">Quality</TableCell>
                      <TableCell align="right">Timeliness</TableCell>
                      <TableCell align="right">Average</TableCell>
                      <TableCell>Trend</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedScores.map((score, index) => (
                      <TableRow key={score.employeeName}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{score.employeeName}</TableCell>
                        {["productivity", "quality", "timeliness"].map(
                          (metric) => (
                            <TableCell key={metric} align="right">
                              <Chip
                                label={`${score[metric]}%`}
                                size="small"
                                sx={{
                                  bgcolor: getPerformanceColor(score[metric]),
                                }}
                              />
                            </TableCell>
                          )
                        )}
                        <TableCell align="right">
                          {calculateAverage(score).toFixed(1)}%
                        </TableCell>
                        <TableCell>
                          {index === 0 ? (
                            <TrendingUp sx={{ color: "#4caf50" }} />
                          ) : (
                            <TrendingDown sx={{ color: "#f44336" }} />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}

export default Comparison;
