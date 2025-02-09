import React from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  LinearProgress,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useScores } from "../context/ScoreContext";
import { Bar, Pie, Radar } from "react-chartjs-2";
import TopPerformers from "../components/TopPerformers";

function Dashboard() {
  const { scores } = useScores();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  // Calculate averages
  const categoryAverages = {
    productivity:
      scores.reduce((acc, curr) => acc + Number(curr.productivity), 0) /
        scores.length || 0,
    quality:
      scores.reduce((acc, curr) => acc + Number(curr.quality), 0) /
        scores.length || 0,
    timeliness:
      scores.reduce((acc, curr) => acc + Number(curr.timeliness), 0) /
        scores.length || 0,
  };

  const pieData = {
    labels: ["Productivity", "Quality", "Timeliness"],
    datasets: [
      {
        data: Object.values(categoryAverages),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
        ],
      },
    ],
  };

  const barData = {
    labels: scores.map((score) => score.employeeName),
    datasets: [
      {
        label: "Productivity",
        data: scores.map((score) => score.productivity),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Quality",
        data: scores.map((score) => score.quality),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Timeliness",
        data: scores.map((score) => score.timeliness),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  // Add radar chart data
  const radarData = {
    labels: ["Productivity", "Quality", "Timeliness"],
    datasets: scores.map((score, index) => ({
      label: score.employeeName,
      data: [score.productivity, score.quality, score.timeliness],
      backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      }, 0.2)`,
      borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      }, 1)`,
      borderWidth: 2,
    })),
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2" }}>
          Performance Dashboard
        </Typography>
        <Divider sx={{ my: 2 }} />
      </Box>

      {/* Top Performers Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <TopPerformers scores={scores} />
        </Grid>
      </Grid>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Object.entries(categoryAverages).map(([category, average]) => (
          <Grid item xs={12} md={4} key={category}>
            <Card
              sx={{
                bgcolor: "#f5f5f5",
                height: "100%",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ textTransform: "capitalize", mb: 1 }}
                >
                  {category}
                </Typography>
                <Typography variant="h4" sx={{ color: "#1976d2", mb: 2 }}>
                  {average.toFixed(1)}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={average}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: "rgba(0,0,0,0.1)",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 4,
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              height: "400px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Team Performance
            </Typography>
            <Box sx={{ height: "calc(100% - 40px)" }}>
              <Bar data={barData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              height: "400px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Skill Performance
            </Typography>
            <Box sx={{ height: "calc(100% - 40px)" }}>
              <Radar data={radarData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              height: "400px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Score Distribution
            </Typography>
            <Box sx={{ height: "calc(100% - 40px)" }}>
              <Pie data={pieData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
