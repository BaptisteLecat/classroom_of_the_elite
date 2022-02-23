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

const { AxiosInstance } = require("./src/services/api/mainRepository.js");

app.get("/", async (req, res) => {
  const themeRepository = require("./src/services/api/themeRepository.js");
  var themeRepo = new themeRepository.ThemeRepository(
    AxiosInstance.getAxiosInstance()
  );
  await themeRepo.getThemes().then((result) => {
    console.log(result);
  });

  const postTheme = require("./public/js/crud/theme/themeCrud");
  await postTheme.postTheme("Hello");

  res.render("home/index");
});

app.get("/login", (req, res) => {
  res.render("login/auth");
});

// POST /login gets urlencoded bodies
app.post("/login", urlencodedParser, async function (req, res) {
  if (!(!req.body.email && !req.body.password)) {
    const authRepository = require("./src/services/api/authRepository.js");
    var authRepo = new authRepository.AuthRepository();
    await authRepo.login(req.body.email, req.body.password).then((result) => {
      console.log(result);
      AxiosInstance.getAxiosInstance(result.jwt);
    });
  }
});

app.listen(port, () => {
  console.log(`Application à l'écoute sur le port ${port}!`);
});
