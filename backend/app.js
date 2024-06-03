import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5002;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(bodyParser.json());
app.use(cors());

app.post('/api/chat', async (req, res) => {
  const messages = req.body.messages;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
