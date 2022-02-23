const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const app = express();

const port = 3001,
    host = "127.0.0.1";

//session middleware
app.use(
    sessions({
        secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        resave: false,
    })
);

app.use(cookieParser());

app.use(express.static(__dirname + "/public"));

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

var bodyParser = require("body-parser");
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

const { AxiosInstance } = require("./src/services/api/mainRepository.js");

var session;

app.get("/", async(req, res) => {
    if (req.session.jwt) {
        console.log(req.session.jwt);
        const themeRepository = require("./src/services/api/themeRepository.js");
        var themeRepo = new themeRepository.ThemeRepository(
            AxiosInstance.getAxiosInstance(req.session.jwt)
        );
        await themeRepo.getThemes().then((result) => {
            console.log(result);
        });

        const postTheme = require("./public/js/crud/theme/themeCrud");
        await postTheme.postTheme("Hello");

        res.render("home/index");
    } else res.redirect("/login");
});

app.get("/login", (req, res) => {
    res.render("login/auth");
});

// POST /login gets urlencoded bodies
app.post("/login", urlencodedParser, async function(req, res) {
    if (!(!req.body.email && !req.body.password)) {
        const authRepository = require("./src/services/api/authRepository.js");
        var authRepo = new authRepository.AuthRepository();
        await authRepo.login(req.body.email, req.body.password).then((result) => {
            console.log(result);
            req.session.jwt = result.jwt;
            console.log(req.session.jwt);
            AxiosInstance.getAxiosInstance(result.jwt);
            res.redirect("/");
        });
    }
});

app.post("/themes", async function(req, res) {
    console.log(req);
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3001");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    console.log(req.body);
    const themeRepository = require("./src/services/api/themeRepository.js");
    var themeRepo = new themeRepository.ThemeRepository(
        AxiosInstance.getAxiosInstance()
    );
    await themeRepo.postTheme(req.body.data.label).then((result) => {
        console.log(result);
    });
})

app.listen(port, () => {
    console.log(`Application à l'écoute sur le port ${port}!`);
});