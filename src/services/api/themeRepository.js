const axios = require("axios");

class ThemeRepository {
  constructor(axiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async getThemes() {
    return this.axiosInstance
      .get("/api/themes", {
        timeout: 5000,
        headers: {
          Authorization: "Bearer KJmaITz--gyy0Nh6M18LYS_Jvxb50mVpmAasqdtyxBw",
        },
      })
      .then(function (response) {
        return response.data;
      })
      .catch((err) => {
        console.log(err);

        responseJson = {
          error: err.response.data,
          status: err.response.status,
        };

        return responseJson;
      });
  }
}
exports.ThemeRepository = ThemeRepository;
