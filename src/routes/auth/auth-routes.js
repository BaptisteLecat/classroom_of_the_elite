const express = require("express");

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login/auth");
});

// POST /login gets urlencoded bodies
router.post("/login", async function (req, res) {
  if (!(!req.body.email && !req.body.password)) {
    const authRepository = require(`${process.cwd()}/src/services/api/authRepository.js`);
    var authRepo = new authRepository.AuthRepository();
    await authRepo.login(req.body.email, req.body.password).then((result) => {
      console.log(result);
      req.session.jwt = result.jwt;
      console.log(req.sessionID);
      res.redirect("/");
    });
  }
});

module.exports = router;