const express = require('express');

const app = express();
const API_PORT = process.env.API_PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, world!!!!');
});

app.listen(API_PORT, () => console.log(`Server started and is listening on port ${API_PORT}`));
