const axios = require("axios");
//const { SETTINGS } = require("../config/settings")
const instance = axios.create({
    //baseURL: SETTINGS.AXIOS_API.BASE_URL,
    baseURL: "https://classroom-api.baptistelecat-dev.fr/",
    timeout: 1000,
});
exports.instance = instance;