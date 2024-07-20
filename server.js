const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config(); // 환경 변수 로드

const app = express();
const PORT = process.env.PORT || 3000;

// 허용할 출처 설정
const allowedOrigins = ['https://www.namu7788.com'];
app.use(cors({
    origin: function(origin, callback){
        if(!origin || allowedOrigins.indexOf(origin) !== -1){
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
    const { prompt } = req.body;
    const apiKey = process.env.OPENAI_API_KEY; // 환경 변수에서 API 키를 읽음

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'text-davinci-003', // 이 모델을 사용할 때의 엔드포인트
                prompt: prompt,
                max_tokens: 150
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        res.json({ reply: data.choices[0].text });
    } catch (error) {
        console.error('Error occurred:', error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


