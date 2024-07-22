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

    
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 300
            })
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error('Error response from OpenAI:', errorResponse);
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorResponse.error.message}`);
        }

        const data = await response.json();
        if (data && data.choices && data.choices.length > 0) {
            res.json({ reply: data.choices[0].message.content });
        } else {
            console.error('Unexpected response structure:', data);
            res.status(500).json({ error: 'Unexpected response structure' });
        }
    } catch (error) {
        console.error('Error occurred:', error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

