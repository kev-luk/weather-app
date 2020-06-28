if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

const API_KEY = process.env.API_KEY;

const express = require('express');
const axios = require('axios');
const { response } = require('express');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/weather', (req, res) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${API_KEY}`;
    axios({
        url: url,
        responseType: 'json',
    }).then((data) => res.json(data.data));
});

app.listen(3000, () => {
    console.log('Successfully started server...');
});
