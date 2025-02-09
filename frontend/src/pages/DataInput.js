import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Card,
  CardContent,
  Alert,
  Snackbar,
  IconButton,
} from "@mui/material";
import { Upload, Save } from "@mui/icons-material";
import FileUpload from "../components/FileUpload";
import { useScores } from "../context/ScoreContext";

function DataInput() {
  const { addScore } = useScores();
  const [formData, setFormData] = useState({
    employeeName: "",
    productivity: "",
    quality: "",
    timeliness: "",
  });
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "info",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addScore(formData);
    setNotification({
      open: true,
      message: "Data saved successfully!",
      type: "success",
    });
    setFormData({
      employeeName: "",
      productivity: "",
      quality: "",
      timeliness: "",
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2" }}>
          Data Input
        </Typography>
        <Divider sx={{ my: 2 }} />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ mb: 3, bgcolor: "#f8f9fa" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Upload sx={{ mr: 1, color: "#1976d2" }} />
                <Typography variant="h6">Import Data</Typography>
              </Box>
              <FileUpload
                onDataUpload={(data) => {
                  data.forEach((item) => addScore(item));
                  setNotification({
                    open: true,
                    message: "File data imported successfully!",
                    type: "success",
                  });
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Save sx={{ mr: 1, color: "#1976d2" }} />
              <Typography variant="h6">Manual Entry</Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Employee Name"
                    value={formData.employeeName}
                    onChange={(e) =>
                      setFormData({ ...formData, employeeName: e.target.value })
                    }
                    required
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Productivity Score"
                    type="number"
                    inputProps={{ min: 0, max: 100 }}
                    value={formData.productivity}
                    onChange={(e) =>
                      setFormData({ ...formData, productivity: e.target.value })
                    }
                    required
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Quality Score"
                    type="number"
                    inputProps={{ min: 0, max: 100 }}
                    value={formData.quality}
                    onChange={(e) =>
                      setFormData({ ...formData, quality: e.target.value })
                    }
                    required
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Timeliness Score"
                    type="number"
                    inputProps={{ min: 0, max: 100 }}
                    value={formData.timeliness}
                    onChange={(e) =>
                      setFormData({ ...formData, timeliness: e.target.value })
                    }
                    required
                    size="small"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    type="submit"
                    startIcon={<Save />}
                    sx={{ mt: 2 }}
                  >
                    Save Data
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert severity={notification.type} sx={{ width: "100%" }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default DataInput;
