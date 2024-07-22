const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = ['https://www.namu7788.com', 'https://namu7788-26384c2e3ec8.herokuapp.com'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    const prompt = `
You are an AI specialized in business management consulting. Answer only questions related to business management, consulting, strategy, finance, or marketing. If the question is not related to these topics, respond with "질문에 답변드릴 수는 있지만, 저는 경영 컨설팅에 특화된 AI입니다. 관련된 질문을 해주시면 감사하겠습니다.".
Question: ${message}
Answer:`;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'asst_svRDm2YmCRy7GoxMe2ZBFCso',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 300
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        res.json({ reply: data.choices[0].message.content });
    } catch (error) {
        console.error('Error occurred:', error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


