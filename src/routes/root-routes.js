const express = require("express");

const router = express.Router();

const { AxiosInstance } = require(`${process.cwd()}/src/services/api/mainRepository.js`);

router.get('/', async(req,res) => {
  //req.session.destroy();
  if (req.session && req.session.jwt) {
    /** Modal fields data */
    var themes = [];
    var times = [];
    var difficulties = [];

    const themeRepository = require(`${process.cwd()}/src/services/api/themeRepository.js`);
    var themeRepo = new themeRepository.ThemeRepository(
      AxiosInstance.getAxiosInstance(req.session.jwt)
    );
    const difficultyRepository = require(`${process.cwd()}/src/services/api/difficultyRepository.js`);
    var difficultyRepo = new difficultyRepository.DifficultyRepository(
      AxiosInstance.getAxiosInstance(req.session.jwt)
    );
    const timeRepository = require(`${process.cwd()}/src/services/api/timeRepository.js`);
    var timeRepo = new timeRepository.TimeRepository(
      AxiosInstance.getAxiosInstance(req.session.jwt)
    );
    await themeRepo.getThemes().then((listThemes) => {
      themes = listThemes["hydra:member"];
    });
    await difficultyRepo.getDifficulties().then((listDifficulties) => {
      difficulties = listDifficulties["hydra:member"];
    });
    await timeRepo.getTimes().then((listTimes) => {
      console.log(listTimes);
      times = listTimes["hydra:member"];
    });

    res.locals.themes = themes;
    res.locals.difficulties = difficulties;
    res.locals.times = times;
    console.log(themes);
    res.render("home/index");
  } else res.redirect("/login");
})

module.exports = router;