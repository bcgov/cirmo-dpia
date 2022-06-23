const express = require('express');

const app = express();
const API_PORT = process.env.API_PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, world!');
    console.log('GET to ROOT');
});

app.get('/api/v1/health', (req, res) => {
    res.status(200).send('Application is healthy!');
    console.log('GET to Application Health');
});

app.get('/api/v1/user', (req, res) => {
    res.status(404).send('User not found');
    console.log('GET to Users');
});

app.listen(API_PORT, () => console.log(`Server started and is listening on port ${API_PORT}`));
