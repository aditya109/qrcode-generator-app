const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();

router.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/templates/index.html'))
    console.log("Route ${"/"} is working ...")
})


const PORT = 3000;

app.use('/', router);
app.listen(process.env.port || PORT, () => {
    console.log(`App running on ${PORT}`);
})
