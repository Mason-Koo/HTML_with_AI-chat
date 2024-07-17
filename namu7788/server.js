const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;
const API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';
const API_KEY = process.env.OPENAI_API_KEY; // 환경 변수에서 OpenAI API 키를 가져옵니다.

app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 150
            })
        });

        const data = await response.json();
        if (data.error) {
            return res.status(500).json({ error: data.error });
        }

        res.json({ reply: data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch response from OpenAI" });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


