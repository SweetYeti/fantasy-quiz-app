require('dotenv').config({ override: true });

const OpenAI = require('openai');

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: apiKey });

async function testOpenAI() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Hello, how are you?" }],
      max_tokens: 50
    });

    console.log('OpenAI API Response:', JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Error connecting to OpenAI API:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testOpenAI();