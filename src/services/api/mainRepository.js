const axios = require("axios");
//const { SETTINGS } = require("../config/settings")

class AxiosInstance {
  static instance = null;

  static getAxiosInstance(token) {
    if (this.instance == null) {
      this.instance = axios.create({
        //baseURL: SETTINGS.AXIOS_API.BASE_URL,
        baseURL: "https://classroom-api.baptistelecat-dev.fr/",
        timeout: 1000,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return this.instance;
  }
}
exports.AxiosInstance = AxiosInstance;
