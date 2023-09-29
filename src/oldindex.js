require('dotenv').config(); // <-- Load environment variables
const functions = require('firebase-functions');
const twilio = require('twilio');
const OpenAI = require("openai");

const accountSid = 'AC459cffe5393a5a2f24891ad03b2f0cfd';
const authToken = 'ecbb86b4b0c9afd0a55846185833a17d';
const client = new twilio(accountSid, authToken);

exports.sendTestSMS = functions.https.onRequest((req, res) => {
  client.messages
    .create({
      body: 'Hello, this is a test message from your Firebase function!',
      from: '+18333031428',
      to: '+19133583724'
    })
    .then(message => {
      console.log(message.sid);
      return res.status(200).send("Message sent!");
    })
    .catch(err => {
      console.error(err);
      return res.status(500).send("Something went wrong.");
    });
});

// Initialize OpenAI with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Make sure you have this key in your .env file
});

exports.generateText = functions.https.onCall(async (data, context) => {
  // Verify if the user is authenticated
  if (!context.auth) {
    return { message: "Authentication Required!", code: 401 };
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "system", "content": "This is a test " },
        { "role": "user", "content": "say this is a test" },
        { "role": "assistant", "content": "You are helping me test" }
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    const generatedText = response.choices[0].message.content.trim();

    return {
      message: "Text generated successfully!",
      generatedText: generatedText,
      code: 200
    };
  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred while generating text.",
      code: 500
    };
  }
});
