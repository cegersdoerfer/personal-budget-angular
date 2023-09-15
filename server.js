// Budget API

const express = require('express');
const { get } = require('http');
const app = express();
const port = 3000;
const fs = require('fs');

function getData() {
    try {
        // Read the file synchronously and parse it to return the JSON data
        const data = fs.readFileSync('data.json', 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.log(err);
        return null; // or some other error indication
    }
}

app.get('/budget', (req, res) => {
    const budget = getData();
    res.json(budget);
});

app.use('/', express.static('public'));

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});