const axios = require("axios");

class ThemeRepository {
  constructor(axiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async getThemes() {
    return await this.axiosInstance
      .get("/api/themes", {
        timeout: 5000,
      })
      .then(function (response) {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        var responseJson = {
          error: err.response.data,
          status: err.response.status,
        };

        return responseJson;
      });
  }

  async getTheme(id) {
    return await this.axiosInstance
      .get(`/api/themes/${id}`, {
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

  async postTheme(label) {
    return await this.axiosInstance
      .post("/api/themes", {
        label: label,
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
exports.ThemeRepository = ThemeRepository;
