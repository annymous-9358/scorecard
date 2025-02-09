import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const ScoreContext = createContext();
const API_URL = "https://scorecard-backend-zrg3.onrender.com/api";

export function useScores() {
  return useContext(ScoreContext);
}

export function ScoreProvider({ children }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const response = await axios.get(`${API_URL}/scores`);
      setScores(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching scores");
      setLoading(false);
    }
  };

  const addScore = async (newScore) => {
    try {
      const response = await axios.post(`${API_URL}/scores`, newScore);
      setScores((prevScores) => [...prevScores, response.data]);
      return { success: true };
    } catch (error) {
      setError("Error adding score");
      return { success: false, error: error.message };
    }
  };

  const updateScore = async (id, updatedScore) => {
    try {
      const response = await axios.put(`${API_URL}/scores/${id}`, updatedScore);
      setScores((prevScores) =>
        prevScores.map((score) => (score._id === id ? response.data : score))
      );
      return { success: true };
    } catch (error) {
      setError("Error updating score");
      return { success: false, error: error.message };
    }
  };

  const deleteScore = async (id) => {
    try {
      await axios.delete(`${API_URL}/scores/${id}`);
      setScores((prevScores) => prevScores.filter((score) => score._id !== id));
      return { success: true };
    } catch (error) {
      setError("Error deleting score");
      return { success: false, error: error.message };
    }
  };

  const value = {
    scores,
    loading,
    error,
    addScore,
    updateScore,
    deleteScore,
    refreshScores: fetchScores,
  };

  return (
    <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
  );
}
