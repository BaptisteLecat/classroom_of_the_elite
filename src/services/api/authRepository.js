const axios = require("axios");
var qs = require("qs");

class AuthRepository {
  async login(email, password) {
    return await axios({
      method: "POST",
      url: "https://classroom-api.baptistelecat-dev.fr/api/auth/login",
      data: new URLSearchParams({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
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

exports.AuthRepository = AuthRepository;
