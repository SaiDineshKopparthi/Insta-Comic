const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;

router.post("/generate-story", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Missing prompt" });

  try {
    const response = await axios.post(
      "https://api.together.xyz/v1/completions",
      {
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        messages: [
          {
            role: "user",
            content: `Generate a 4-panel comic script based on: "${prompt}". Format as JSON ["line1", "line2", "line3", "line4"]`,
          },
        ],
        max_tokens: 200,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${TOGETHER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiResponse = response.data.choices[0].text;
    const script = JSON.parse(aiResponse.trim());

    res.json({ prompt, script });
  } catch (error) {
    console.error("AI Error:",   error);
    res.status(500).json({ error: "Failed to generate story" });
  }
});

router.post("/generate-images", async (req, res) => {
  return res.json({ message: "Image generation not implemented yet" });
});

module.exports = router;
