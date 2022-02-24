const axios = require("axios");

class TimeRepository {
    constructor(axiosInstance) {
        this.axiosInstance = axiosInstance;
    }

    async getTimes() {
        return await this.axiosInstance
            .get("/api/times", {
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

    async getTime(id) {
        return await this.axiosInstance
            .get(`/api/times/${id}`, {
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

    async postTime(label, time) {
        return await this.axiosInstance
            .post("/api/times", {
                label: label,
                time: time,
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
}
exports.TimeRepository = TimeRepository;