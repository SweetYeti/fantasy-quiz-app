const express = require('express');
const router = express.Router();
const QuizResponse = require('../models/quizResponse');
const OpenAI = require('openai');

require('dotenv').config({ override: true });

if (!process.env.OPENAI_API_KEY) {
  console.error('OpenAI API key is not set in the environment variables');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/submit', async (req, res) => {
  try {
    const { quizData, context } = req.body;
    console.log('Received quizData:', quizData);
    console.log('Received context:', context);
    const profile = await generateMagicalProfile(quizData, context);
    res.json(profile);
  } catch (error) {
    console.error('Error in quiz submission:', error);
    res.status(500).json({ error: 'An error occurred while generating your profile.' });
  }
});

async function generateMagicalProfile(quizData, context) {
  const userName = quizData.find(item => item.id === 1)?.answer || "Seeker";

  const prompt = `
Create a deeply personal, narrative-based magical profile for ${userName}. Use vivid imagery and metaphors that align with their responses. The profile should feel like it's speaking directly to their soul, demonstrating a profound understanding of their essence. Structure the response as follows:

1. Introduction: A poetic, imagery-rich description of ${userName}'s overall spiritual essence.
2. The Spiritual Archetype: Introduce a personalized archetype that embodies ${userName}'s core attributes based on their quiz responses.
3. The Elemental Journey: Describe how different elements shape ${userName}'s spiritual path, with emphasis on their elemental affinity.
4. Wisdom of the Ages: Connect their profile to ancient wisdom and historical/cultural references that resonate with their responses.
5. The Inner Landscape: Dive deep into ${userName}'s emotional and intuitive world, incorporating their responses about joy, peace, and self-reflection.
6. Challenges as Catalysts: Reframe ${userName}'s spiritual challenges as opportunities for growth, referencing their life patterns and purpose.
7. The Path Forward: Outline potential future developments and growth areas for ${userName}, incorporating their aspirations and the world they'd create in a lucid dream.
8. Daily Practices: Offer concrete, personalized spiritual practices tailored to ${userName}'s profile and their responses about peace and harmony.
9. Your Spiritual Emblem: Describe a symbolic representation of ${userName}'s essence (which could be captured in a portrait), incorporating their zodiac sign and elemental affinity.
10. Reflective Questions: Engage ${userName} with three thought-provoking questions based on their profile and responses.
11. Personal Mantra: Provide a unique affirmation encapsulating ${userName}'s essence, incorporating their perception of destiny.

Use the following quiz data to inform your response:

${quizData.map(item => `Section: ${item.section || 'N/A'}
Question: ${item.text}
Answer: ${JSON.stringify(item.answer)}
Purpose: ${item.purpose || 'N/A'}`).join('\n\n')}

Context: ${context}

Ensure the response is deeply personal, using ${userName}'s name throughout, and create a cohesive narrative that flows naturally between sections. The tone should be mystical, insightful, and encouraging.

Format the response as a JSON object with the following structure:
{
  "introduction": "string",
  "spiritualArchetype": {
    "name": "string",
    "description": "string"
  },
  "elementalJourney": "string",
  "wisdomOfTheAges": "string",
  "innerLandscape": "string",
  "challengesAsCatalysts": "string",
  "pathForward": "string",
  "dailyPractices": [
    { "practice": "string", "description": "string" }
  ],
  "spiritualEmblem": "string",
  "reflectiveQuestions": ["string", "string", "string"],
  "personalMantra": "string"
}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000
    });

    if (!response.choices || response.choices.length === 0) {
      throw new Error('No response from OpenAI');
    }

    const content = response.choices[0].message.content;
    const parsedContent = JSON.parse(content);

    console.log('Parsed OpenAI response:', parsedContent);

    // Validate the parsed content
    const requiredFields = ['introduction', 'spiritualArchetype', 'elementalJourney', 'wisdomOfTheAges', 'innerLandscape', 'challengesAsCatalysts', 'pathForward', 'dailyPractices', 'spiritualEmblem', 'reflectiveQuestions', 'personalMantra'];
    requiredFields.forEach(field => {
      if (!parsedContent[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    });

    return parsedContent;
  } catch (error) {
    console.error('Error generating magical profile:', error);
    throw new Error('Failed to generate magical profile: ' + (error.response ? JSON.stringify(error.response.data) : error.message));
  }
}

function getCategoryForQuestion(questionId) {
  const categories = {
    1: "Personal Information",
    2: "Dream Interpretation",
    3: "Astrological Influence",
    4: "Seasonal Affinity",
    5: "Magical Abilities",
    6: "Mystical Environments",
    7: "Spirit Guides",
    8: "Divination Methods",
    9: "Elemental Affinity"
  };
  return categories[questionId] || "Miscellaneous";
}

module.exports = router;