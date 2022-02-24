const axios = require("axios");

class GoodAnswerRepository {
    constructor(axiosInstance) {
        this.axiosInstance = axiosInstance;
    }

    async getGoodAnswers() {
        return await this.axiosInstance
            .get("/api/good_answers", {
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

    async getGoodAnswer(id) {
        return await this.axiosInstance
            .get(`/api/good_answers/${id}`, {
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

    async postGoodAnswer(content, question_id) {
        return await this.axiosInstance
          .post("/api/good_answers", {
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
exports.GoodAnswerRepository = GoodAnswerRepository;