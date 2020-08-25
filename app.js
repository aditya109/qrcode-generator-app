const express = require('express');
const path = require('templates');
const app = express();

app.get('/*', (request, response) => {
    response.sendFile(path.join(__dirname, './index.html'));
})

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`App running on ${PORT}`);
})