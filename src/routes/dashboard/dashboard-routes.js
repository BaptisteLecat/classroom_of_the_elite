const express = require("express");

const {
    AxiosInstance,
} = require(`${process.cwd()}/src/services/api/mainRepository.js`);

const router = express.Router();

router.get("/dashboard", async(req, res) => {
    var themes = [];
    var questions = [];
    var questionsValidated = [];
    var questionsNotValidated = [];

    await getThemes(req).then((listThemes) => {
        themes = listThemes;
    });
    await getQuestions(req).then((listQuestions) => {
        questions = listQuestions;
    });

    console.log(questions);

    questions.forEach(question => {
        if (question.validated) {
            questionsValidated.push(question);
        } else {
            questionsNotValidated.push(question);
        }
    });

    res.locals.themes = themes;
    res.locals.questions = questions;
    res.locals.questionsValidated = questionsValidated;
    res.locals.questionsNotValidated = questionsNotValidated;
    res.render("dashboard/index.twig");
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