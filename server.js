if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

const API_KEY = process.env.API_KEY;
const express = require('express');
const app = express();

app.post('/weather', (req, res) => {});

app.listen(3000, () => {
    console.log('Server started...');
});
