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
  const zodiacSign = quizData.find(item => item.id === 3)?.answer || "Unknown";
  const elementalAffinity = quizData.find(item => item.id === 9)?.answer || "Unknown";

  const prompt = `
Create a personal, practical magical profile for ${userName}. Use clear language with a mystical tone. Make it feel tailored to their soul, showing understanding of their essence. Structure as follows:

1. Spiritual Archetype: A brief, evocative title capturing ${userName}'s core attributes (e.g., "The Practical Dreamer", "The Empathetic Guardian").

2. Archetype Introduction (12 sentences):
   Use this template:
   [Opener] [Clarification] [Why it matters]
   [Expand] [Story/insight] [Build on story] [Small conclusion] [Why conclusion matters]
   [Recap] [Reinforce with new insight] [Drive point home]
   [Important takeaway]

3. Core Strengths (3-5 items): List ${userName}'s key spiritual strengths, directly referencing their quiz answers. Use the 1/5/1 structure for each:
   [Opener]
   [Clarify, reinforce, build, explain why, drive home]
   [Strong conclusion]

4. Growth Areas (3-5 items): Identify areas for spiritual growth, framing challenges as opportunities. Use the 1/5/1 structure for each.

5. Elemental Influence: Briefly explain how ${userName}'s elemental affinity (${elementalAffinity}) shapes their path. Use the 1/5/1 structure.

6. Practical Wisdom (3-5 items): Offer actionable advice based on ${userName}'s responses, connecting ancient wisdom to modern life. Use the 1/5/1 structure for each.

7. Daily Practices (3 items): Suggest concrete, personalized spiritual practices. Format as:
   - Practice: [Name]
     Description: [Brief explanation using 1/5/1 structure]
     Benefit: [How it helps]

8. Reflective Questions (3 questions): Provide thought-provoking questions based on ${userName}'s profile.

9. Personal Mantra (1 sentence): A concise, powerful affirmation encapsulating ${userName}'s essence.

10. Magical Portrait (7 sentences): Describe a vivid, symbolic representation of ${userName}'s magical essence that could be captured in a portrait. Incorporate their zodiac sign (${zodiacSign}) and elemental affinity (${elementalAffinity}) in a way that is empowering and enchanting. This description should paint a clear picture of how their unique magical qualities might be visually represented.

11. Conclusion (7 sentences): Summarize the key points of ${userName}'s profile and offer encouragement for their spiritual journey.

Use the following quiz data to inform your response:

${quizData.map(item => `Question: ${item.text}
Answer: ${JSON.stringify(item.answer)}
Purpose: ${item.purpose || 'N/A'}`).join('\n\n')}

Context: ${context}

Ensure the response is personal, using ${userName}'s name throughout. Be practical, insightful, and encouraging while maintaining a mystical tone. Avoid overly abstract language.

Format the response as a JSON object with the following structure:
{
  "spiritualArchetype": {
    "title": "string",
    "description": "string"
  },
  "coreStrengths": [
    { "title": "string", "description": "string" }
  ],
  "growthAreas": [
    { "title": "string", "description": "string" }
  ],
  "elementalInfluence": "string",
  "practicalWisdom": [
    { "title": "string", "description": "string" }
  ],
  "dailyPractices": [
    { "practice": "string", "description": "string", "benefit": "string" }
  ],
  "reflectiveQuestions": ["string", "string", "string"],
  "personalMantra": "string",
  "magicalPortrait": "string",
  "conclusion": "string"
}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 3500
    });

    if (!response.choices || response.choices.length === 0) {
      throw new Error('No response from OpenAI');
    }

    const content = response.choices[0].message.content;
    console.log('Raw OpenAI response:', content);
    const parsedContent = JSON.parse(content);

    console.log('Parsed OpenAI response:', parsedContent);

    // Validate the parsed content
    const requiredFields = ['spiritualArchetype', 'coreStrengths', 'growthAreas', 'elementalInfluence', 'practicalWisdom', 'dailyPractices', 'reflectiveQuestions', 'personalMantra', 'magicalPortrait', 'conclusion'];
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