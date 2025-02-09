import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  ButtonGroup,
} from "@mui/material";
import { Share, GetApp } from "@mui/icons-material";
import { exportToExcel } from "../utils/exportData";
import DataTable from "../components/DataTable";
import { useScores } from "../context/ScoreContext";

function Reports() {
  const { scores } = useScores();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "info",
  });

  const handleShare = () => {
    // Implement email sharing logic here
    setNotification({
      open: true,
      message: "Report shared successfully!",
      type: "success",
    });
    setShareDialogOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Performance Reports</Typography>
          <div>
            <Button
              variant="contained"
              startIcon={<GetApp />}
              onClick={() => exportToExcel(scores)}
              sx={{ mr: 2 }}
            >
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<Share />}
              onClick={() => setShareDialogOpen(true)}
            >
              Share
            </Button>
          </div>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <DataTable scores={scores} />
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)}>
        <DialogTitle>Share Report</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShareDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleShare} variant="contained">
            Share
          </Button>
        </DialogActions>
      </Dialog>

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

export default Reports;
