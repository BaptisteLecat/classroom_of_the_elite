const axios = require("axios");
//const { SETTINGS } = require("../config/settings")

class AxiosInstance {
    static getAxiosInstance(token) {
        return axios.create({
            //baseURL: SETTINGS.AXIOS_API.BASE_URL,
            baseURL: "https://classroom-api.baptistelecat-dev.fr/",
            timeout: 1000,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}
exports.AxiosInstance = AxiosInstance;