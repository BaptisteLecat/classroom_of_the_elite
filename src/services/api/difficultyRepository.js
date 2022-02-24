const axios = require("axios");

class DifficultyRepository {
    constructor(axiosInstance) {
        this.axiosInstance = axiosInstance;
    }

    async getDifficulties() {
        return await this.axiosInstance
            .get("/api/difficulties", {
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

    async getDifficulty(id) {
        return await this.axiosInstance
            .get(`/api/difficulties/${id}`, {
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

    async postDifficulty(label, point) {
        return await this.axiosInstance
            .post("/api/difficulties", {
                label: label,
                point: point,
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
exports.DifficultyRepository = DifficultyRepository;