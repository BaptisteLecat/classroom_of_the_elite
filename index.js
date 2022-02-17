const express = require("express");
const app = express();

const port = 3001,
  host = "127.0.0.1";

app.use(express.static(__dirname + "/public"));

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

var bodyParser = require("body-parser");
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login/auth");
});

// POST /login gets urlencoded bodies
app.post("/login", urlencodedParser, function (req, res) {
});

app.listen(port, () => {
  console.log(`Application à l'écoute sur le port ${port}!`);
});
