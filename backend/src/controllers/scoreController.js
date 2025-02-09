const Score = require('../models/Score');

exports.createScore = async (req, res) => {
  try {
    const score = new Score(req.body);
    await score.save();
    res.status(201).json(score);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllScores = async (req, res) => {
  try {
    const scores = await Score.find().sort({ createdAt: -1 });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateScore = async (req, res) => {
  try {
    const score = await Score.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(score);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteScore = async (req, res) => {
  try {
    await Score.findByIdAndDelete(req.params.id);
    res.json({ message: 'Score deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};