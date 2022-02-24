const express = require("express");
const router = express.Router();
const { AxiosInstance } = require(`${process.cwd()}/src/services/api/mainRepository.js`);

router.post("/themes", async function (req, res) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001/themes");
  res.header("Access-Control-Allow-Credentials", true);
  const themeRepository = require(`${process.cwd()}/src/services/api/themeRepository.js`);
  var themeRepo = new themeRepository.ThemeRepository(
    AxiosInstance.getAxiosInstance(req.session.jwt)
  );
  await themeRepo.postTheme(req.body.label).then((result) => {
    console.log(result);
  });
});

module.exports = router;