const express = require("express");
const session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
const app = express();

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

const { AxiosInstance } = require("./src/services/api/mainRepository.js");

app.get("/", async (req, res) => {
  if (req.session.jwt) {
    console.log(req.session.jwt);
    const themeRepository = require("./src/services/api/themeRepository.js");
    var themeRepo = new themeRepository.ThemeRepository(
      AxiosInstance.getAxiosInstance(req.session.jwt)
    );
    await themeRepo.getThemes().then((result) => {
      //console.log(result);
    });

    res.render("home/index");
  } else res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login/auth");
});

// POST /login gets urlencoded bodies
app.post("/login", async function (req, res) {
  if (!(!req.body.email && !req.body.password)) {
    const authRepository = require("./src/services/api/authRepository.js");
    var authRepo = new authRepository.AuthRepository();
    await authRepo.login(req.body.email, req.body.password).then((result) => {
      console.log(result);
      req.session.jwt = result.jwt;
      console.log(req.sessionID);
      res.redirect("/");
    });
  }
});

app.post("/themes", async function (req, res) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001/themes");
  res.header("Access-Control-Allow-Credentials", true);
  const themeRepository = require("./src/services/api/themeRepository.js");
  var themeRepo = new themeRepository.ThemeRepository(
    AxiosInstance.getAxiosInstance(req.session.jwt)
  );
  await themeRepo.postTheme(req.body.label).then((result) => {
    console.log(result);
  });
});

app.listen(port, () => {
  console.log(`Application à l'écoute sur le port ${port}!`);
});
