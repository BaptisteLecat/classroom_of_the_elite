const axios = require("axios");

class QuestionRepository {
  constructor(axiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async getQuestions(filter) {
    var url =
      filter != undefined && filter != null
        ? `/api/questions?${filter}`
        : "/api/questions";
    return await this.axiosInstance
      .get(url, {
        timeout: 5000,
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

  async getQuestion(id) {
    return await this.axiosInstance
      .get(`/api/questions/${id}`, {
        timeout: 5000,
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

  async postQuestion(content, theme_id, difficulty_id, time_id) {
    return await this.axiosInstance
      .post("/api/questions", {
        content: content,
        theme: `/api/themes/${theme_id}`,
        difficulty: `/api/difficulties/${difficulty_id}`,
        time: `/api/times/${time_id}`,
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

  async putQuestion(iri = null, id = null, content, validated, theme_iri, difficulty_iri, time_iri) {
    return await this.axiosInstance
      .put(iri != null ? iri : `/api/questions/${id}`, {
        content: content,
        validated: validated,
        theme: theme_iri,
        difficulty: difficulty_iri,
        time: time_iri,
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
exports.QuestionRepository = QuestionRepository;