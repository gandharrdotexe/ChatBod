const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5009;
const corsOptions = {
  origin: "*", // Change this to your frontend's URL in production
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json());



app.post("/chat", async (req, res, next) => {
  console.log("Received request for chat");

  try {
    const jsonData = req.body.message;
    const prevConvo = req.body.prevconvo;
    let prompt;
    if (prevConvo.length > 0)
    {
      const prevConvoFormatted = prevConvo
        .map(
          (entry) => `${entry.role === "user" ? "User" : "AI"}: ${entry.content}`
        )
        .join("\n");

       prompt = `You are an AI assistant engaged in an ongoing conversation. Always refer to the previous exchanges before responding to ensure continuity and relevance.

Conversation History:
${prevConvoFormatted}

Now, based on the context above, respond to the following(**do not repeat the conversation history** and **do not mention based on prev conversation**):

User: ${jsonData}
AI: `;

    }
    else
    {

       prompt = `You are an AI assistant. Respond **only with short, to-the-point answers** unless a detailed response is explicitly required. Keep it simple and precise.  \n\nUser Input: ${jsonData}
    )}`;
    }
    const postData = {
      model: "llama3",
      prompt: prompt,
      stream: false,
    };

      console.log(prompt);
    const responses = await axios.post(
      "http://127.0.0.1:11434/api/generate/",
      postData
    );

    console.log("Response from AI: ", responses.data.response);
      const aiResponse = responses.data.response;
   
    

      res.status(200).send(aiResponse);
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
