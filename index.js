const express = require("express");
const path = require("path");
const qrcode = require("qrcode");
const fs = require("fs");
const bodyParser = require("body-parser");


const app = express();
const dev = app.get("env") !== "production";
app.use(bodyParser.urlencoded({ extended: false }));


async function convertToQRCode(message, response) {
	const result = await qrcode.toDataURL(message);
	fs.writeFileSync("./data/qr.html", `<img src="${result}">`);
	response.send(result);
}

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

if (!dev) {
	app.disable("x-powered-by");
	// Serve the static files from the React app
	app.use(express.static('client/build'));
	// Handles any requests that don't match the ones above
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
} 
else {
	// app.disable("x-powered-by");
	// Serve the static files from the React app
	app.use(express.static(path.join(__dirname, "client", "build")));
	// Handles any requests that don't match the ones above
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "client", "build", "index.html"));
	});
}
const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5000)

app.listen(PORT, () => {
	console.log(`App is listening on ${PORT}`);
});
