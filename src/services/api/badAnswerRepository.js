const axios = require("axios");

class BadAnswerRepository {
    constructor(axiosInstance) {
        this.axiosInstance = axiosInstance;
    }

    async getBadAnswers() {
        return await this.axiosInstance
            .get("/api/bad_answers", {
                timeout: 5000,
            })
            .then(function(response) {
                return response.data;
            })
            .catch((err) => {
                var responseJson = {
                    error: err.response.data,
                    status: err.response.status,
                };

                return responseJson;
            });
    }

    async getBadAnswer(id) {
        return await this.axiosInstance
            .get(`/api/bad_answers/${id}`, {
                timeout: 5000,
            })
            .then(function(response) {
                return response.data;
            })
            .catch((err) => {
                var responseJson = {
                    error: err.response.data,
                    status: err.response.status,
                };

                return responseJson;
            });
    }

    async postBadAnswer(content, question_id) {
        return await this.axiosInstance
          .post("/api/bad_answers", {
            content: content,
            question: `/api/questions/${question_id}`,
          })
          .then(function (response) {
            return response.data;
          })
          .catch((err) => {
            var responseJson = {
              error: err.response.data,
              status: err.response.status,
            };

            return responseJson;
          });
    }
}
exports.BadAnswerRepository = BadAnswerRepository;