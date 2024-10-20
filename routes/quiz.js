const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

const openai = new OpenAI();

require('dotenv').config();

if (!process.env.OPENAI_API_KEY) {
  console.error('OpenAI API key is not set in the environment variables');
  process.exit(1);
}

console.log('OpenAI API Key being used:', process.env.OPENAI_API_KEY.slice(-4));

// Wrap your route handler in this higher-order function
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Then use it in your route
router.post('/submit', asyncHandler(async (req, res) => {
  console.log('Received POST request at /api/quiz/submit');
  console.log('Request body:', JSON.stringify(req.body, null, 2));

  const { quizData, context, userName } = req.body;

  try {
    console.log('Sending request to OpenAI with data:', JSON.stringify({ quizData, context }, null, 2));
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You are a helpful assistant. Always respond with valid JSON." },
        { role: "user", content: generateMagicalProfilePrompt(quizData, context, userName) }
      ],
      stream: false, // Set this to false to disable streaming
    });

    const content = response.choices[0].message.content;
    console.log('Full response from OpenAI:', content);

    try {
      const parsedResponse = JSON.parse(content);
      console.log('Parsed response:', JSON.stringify(parsedResponse, null, 2));
      res.json(parsedResponse);
    } catch (e) {
      console.error('Failed to parse OpenAI response:', e);
      res.status(500).json({ error: 'Failed to parse the magical profile.' });
    }
  } catch (error) {
    console.error('Error in quiz submission:', error);
    res.status(500).json({ error: 'An error occurred while generating your profile.' });
  }
}));

function generateMagicalProfilePrompt(quizData, context, userName) {
  return `Create a detailed, personalized magical profile for ${userName}. Use ${userName}'s name sparingly but effectively throughout the profile.

    Quiz Data: ${JSON.stringify(quizData)}

    Context: ${context}

    IMPORTANT: Ensure that all sections specified in the structure below are included and fully populated in your response.

    Use the following structure, ensuring each section is detailed and comprehensive:

    {
      "spiritualArchetype": {
        "title": "string",
        "description": "string (Begin with a greeting using ${userName}'s name. Then provide a grounded yet profound description of the spiritual archetype. Use 'you' throughout the rest. Connect the dots from the quiz responses to form a cohesive and meaningful description. Aim for profound, meaningful insights that help them see themselves in a new empowering way, no cliches)"
      },
      "coreStrengths": [
        {
          "title": "string",
          "description": "string (A detailed description of the first core strength, how it manifests, and how to leverage it. Use 'you' throughout. Aim to make connections they might not have seen, profound yet effective and grounded, no cliches)"
        },
        {
          "title": "string",
          "description": "string (A second core strength, again detailed, profound, and no cliches, something that might surprise them but rings true to their essence. Use 'you' throughout)"
        }
      ],
      "growthAreas": [
        {
          "title": "string",
          "description": "string (Draw connections from the quiz responses to form a detailed growth area. Use 'you' throughout. Aim for profound, meaningful insights that could spark personal transformation, no cliches)"
        },
        {
          "title": "string",
          "description": "string (Another detailed growth area description, contrasting with the first one. Use 'you' throughout)"
        }
      ],
      "elementalInfluence": "string (Share a profound and grounded elemental influence that resonates with their essence, using a metaphor or analogy that fits their responses. Use 'you' throughout. Make it unique and profound, no cliches)",
      "practicalWisdom": [
        {
          "title": "string",
          "description": "string (Start by addressing ${userName} by name. Then provide effective wisdom and how to apply it. Use 'you' for the rest. Make it profound, unique, meaningful, no cliches or overused phrases/ideas, very thoughtful and actually useful and thought-provoking)",
          "benefit": "string (50-75 words on specific benefits. Use 'you' throughout. Always include content here.)"
        },
        {
          "title": "string",
          "description": "string (Another detailed wisdom that's more mystical and enlightened. Use 'you' throughout)",
          "benefit": "string (Benefits of this practice. Use 'you' throughout. Always include content here.)"
        }
      ],
      "reflectiveQuestions": [
        "string (A truly profound and insightful question that connects to their essence and the quiz responses. Use 'you' in the question, no cliches)",
        "string (Another reflective question that contrasts with the first. Use 'you' in the question)",
        "string (A third insightful question that is profound and meaningful. Use 'you' in the question)"
      ],
      "personalMantra": "string (A powerful, personalized mantra that includes their name. For example, 'I, ${userName}, am...' or 'I am ${userName}, and I...'. It should be empowering and profound)",
      "conclusion": "string (A profound and heartfelt conclusion that encapsulates the essence of the profile. Use ${userName}'s name once at the beginning and 'you' throughout the rest. Provide a powerful message of hope, transformation, and their unique role in the world. Leave them with a sense of purpose and a feeling that they can change the world)",
      "portraitDescription": "string (Based on the quiz answers, create a compelling and personalised description of their potential portrait commission. Consider their essence and spiritual archetype, meaningful symbols or elements from their responses, potential magical creatures or fantastical elements that resonate with their personality. Use ${userName}'s name once at the beginning and 'you' for the rest. The description should be vivid and imaginative, encouraging them to envision themselves in Hanna's artistic style. Frame it using 'could' and 'might' instead of 'will'.)"
    }

    // Ensure each section is thoroughly developed with rich, personalized details drawn from the quiz responses.
    // Use metaphors, analogies, and specific examples to make the profile more engaging and relatable.
    // The total profile should be substantial, providing deep insights and guidance tailored to the individual.
    // Use ${userName}'s name sparingly throughout the profile (about 5 times total):
    // 1. At the beginning of the spiritualArchetype
    // 2. In the practicalWisdom section
    // 3. In the personalMantra
    // 4. At the beginning of the conclusion
    // 5. At the beginning of the portraitDescription
    // Rely on 'you' to maintain a personal and engaging tone throughout the rest of the profile.
  `;
}

// Ensure each section is thoroughly developed with rich, personalized details drawn from the quiz responses.
// Use metaphors, analogies, and specific examples to make the profile more engaging and relatable.
// The total profile should be substantial, providing deep insights and guidance tailored to the individual.

router.get('/submit', (req, res) => {
  console.log('GET request received at /api/quiz/submit');
  res.status(405).json({ error: 'GET method not allowed, use POST instead' });
});


// At the end of the file, add this error handler
router.use((error, req, res, next) => {
  console.error('Quiz route error:', error);
  res.status(500).json({
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'production' ? {} : error
  });
});

module.exports = router;