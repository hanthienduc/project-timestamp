// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// your first API endpoint...
app.get("/api/:date?", function (req, res) {
  let utcValue, unixValue;
  if (!req.params || !req.params.date || req.params.date === "") {
    utcValue = new Date().toUTCString();
    unixValue = new Date().getTime();
    res.json({ unix: unixValue, utc: utcValue });
  }
  const dateParam = req.params.date;
  utcValue = new Date(dateParam).toUTCString();
  if (utcValue === "Invalid Date") {
    utcValue = new Date(parseInt(dateParam)).toUTCString();
  }

  if (utcValue === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  unixValue = new Date(dateParam).getTime();

  const returnDate = {
    unix: isNaN(unixValue)
      ? new Date(parseInt(dateParam)).getTime()
      : unixValue,
    utc: utcValue,
  };

  res.json(returnDate);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
