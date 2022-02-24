const express = require("express");
const session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
const app = express();

const authRoutes = require("./src/routes/auth/auth-routes");
const questionRoutes = require("./src/routes/question/question-routes");
const rootRootes = require("./src/routes/root-routes");

var options = {
  host: "146.59.177.96",
  port: 3306,
  user: "classroom_apidevsession",
  password: "08ds5-swDgb-f5s",
  database: "classroomelite",
};

var sessionStore = new MySQLStore(options);
app.use(
  session({
    key: "session_classroom_elite",
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

process.on("exit", (code) => {
  console.log(`Le processus s'est arrêté avec le code: ${code} !`);
});
process.on("uncaughtException", (err, origin) => {
  console.log(`UNCHAUGHT_EXCEPETION: ${err}`, `Origine: ${origin}`);
});
process.on("unhandledRejection", (reason, promise) => {
  console.log(`UNHANDLED_REJECTION: ${reason}\n-----\n`, promise);
});
process.on("warning", (...args) => console.log(...args));

const port = 3001,
  host = "127.0.0.1";

app.use(express.static(__dirname + "/public"));

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

var bodyParser = require("body-parser");
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", authRoutes, questionRoutes, rootRootes);

app.listen(port, () => {
  console.log(`Application à l'écoute sur le port ${port}!`);
});
