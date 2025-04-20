// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle wrong answers
app.post('/log-wrong-answer', (req, res) => {
    const { question, selectedAnswer, correctAnswer } = req.body;

    const logEntry = `Question: ${question}, Selected: ${selectedAnswer}, Correct: ${correctAnswer}, Timestamp: ${new Date().toISOString()}\n`;
    
    // Logging into wrong_answers.txt file
    fs.appendFile('wrong_answers.txt', logEntry, err => {
        if (err) {
            console.error('Error writing to file:', err);
        }
    });

    // Call Groc API (replace YOUR_GROC_API_KEY)
    axios.post('https://api.groc.com/v1/ask', {
        query: `Explain this clearly: ${question}`
    }, {
        headers: { 'Authorization': 'Bearer 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' }
    })
    .then(response => {
        res.json({ feedback: response.data.response });
    })
    .catch(err => {
        console.error('API Error:', err);
        res.json({ feedback: "AI feedback unavailable." });
    });
});

app.listen(5000, () => {
    console.log('Backend server running on port 5000');
});
