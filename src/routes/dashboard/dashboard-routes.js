const express = require("express");

const {
    AxiosInstance,
} = require(`${process.cwd()}/src/services/api/mainRepository.js`);

const router = express.Router();

router.get("/dashboard", async(req, res) => {
    if (req.session && req.session.jwt) {
      var themes = [];
      var questions = [];
      var questionsValidated = [];
      var questionsNotValidated = [];
      var questionsNullValidated = [];

      await getThemes(req).then((listThemes) => {
        themes = listThemes;
      });
      await getQuestions(req).then((listQuestions) => {
        questions = listQuestions;
      });

      console.log(questions);

      questions.forEach((question) => {
        if (question.validated) {
          questionsValidated.push(question);
        } else if (question.validated == false) {
          questionsNotValidated.push(question);
        } else {
          questionsNullValidated.push(question);
        }
      });

      res.locals.themes = themes;
      console.log(themes);
      res.locals.questions = questions;
      res.locals.questionsValidated = questionsValidated;
      res.locals.questionsNotValidated = questionsNotValidated;
      res.locals.questionsNullValidated = questionsNullValidated;
      res.render("dashboard/index.twig");
    } else res.redirect("/login");
});

async function getThemes(req) {
    var themes = [];
    const themeRepository = require(`${process.cwd()}/src/services/api/themeRepository.js`);
    var themeRepo = new themeRepository.ThemeRepository(
        AxiosInstance.getAxiosInstance(req.session.jwt)
    );
    await themeRepo.getThemes().then((listThemes) => {
        themes = listThemes["hydra:member"];
    });
    return themes;
}

async function getQuestions(req) {
    var questions = [];
    const questionRepository = require(`${process.cwd()}/src/services/api/questionRepository.js`);
    var questionRepo = new questionRepository.QuestionRepository(
        AxiosInstance.getAxiosInstance(req.session.jwt)
    );
    await questionRepo.getQuestions().then((listQuestions) => {
        questions = listQuestions["hydra:member"];
    });
    return questions;
}

module.exports = router;