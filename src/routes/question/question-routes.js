const express = require("express");
const router = express.Router();
const {
  AxiosInstance,
} = require(`${process.cwd()}/src/services/api/mainRepository.js`);

router.post("/questions", async function (req, res) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001/questions");
  res.header("Access-Control-Allow-Credentials", true);

  if (
    req.body.content &&
    req.body.goodAnswer &&
    req.body["badAnswers[]"] &&
    req.body.theme_id &&
    req.body.time_id &&
    req.body.difficulty_id
  ) {
    var questionId;
    const questionRepository = require(`${process.cwd()}/src/services/api/questionRepository.js`);
    var questionRepo = new questionRepository.QuestionRepository(
      AxiosInstance.getAxiosInstance(req.session.jwt)
    );
    await questionRepo
      .postQuestion(
        req.body.content,
        req.body.theme_id,
        req.body.difficulty_id,
        req.body.time_id
      )
      .then((result) => {
        console.log(result);
        console.log(result.id);
        questionId = result.id;
      });

    if (questionId != null) {
      const goodAnswerRepository = require(`${process.cwd()}/src/services/api/goodAnswerRepository.js`);
      var goodAnswerRepo = new goodAnswerRepository.GoodAnswerRepository(
        AxiosInstance.getAxiosInstance(req.session.jwt)
      );
      await goodAnswerRepo
        .postGoodAnswer(req.body.goodAnswer, questionId)
        .then((result) => {
          console.log(result);
        });

      const badAnswerRepository = require(`${process.cwd()}/src/services/api/badAnswerRepository.js`);
      var badAnswerRepo = new badAnswerRepository.BadAnswerRepository(
        AxiosInstance.getAxiosInstance(req.session.jwt)
      );
      req.body["badAnswers[]"].forEach(async (badAnswer) => {
        await badAnswerRepo
          .postBadAnswer(badAnswer, questionId)
          .then((result) => {
            console.log(result);
          });
      });
    } else {
      res.redirect("/");
    }
  }
});

module.exports = router;
