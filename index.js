const express = require("express");
const path = require("path");
const qrcode = require("qrcode");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

async function convertToQRCode(message, response) {
	const result = await qrcode.toDataURL(message);
	fs.writeFileSync("./data/qr.html", `<img src="${result}">`);
	response.send(result);
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// OK
app.post("/api/text", (request, response) => {
	let message = request.query.message;
	convertToQRCode(message, response).catch((error) =>
	console.error(error.stack)
	);
	
	// response.send("200 !")
});

// OK
app.get("/api/download/qrCode", (request, response) => {
	response.download(path.join(__dirname, "data", "qr.html"));
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client", "build")));
// Handles any requests that don't match the ones above
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
	console.log(`App is listening on ${port}`);
});
