import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import DataInput from "./pages/DataInput";
import Comparison from "./pages/Comparison";
import Reports from "./pages/Reports";
import { ScoreProvider } from "./context/ScoreContext";
import ErrorBoundary from "./components/ErrorBoundary";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ScoreProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/input" element={<DataInput />} />
              <Route path="/compare" element={<Comparison />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </BrowserRouter>
        </ScoreProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
