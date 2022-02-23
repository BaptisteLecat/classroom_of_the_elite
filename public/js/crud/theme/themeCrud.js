const {
  AxiosInstance,
} = require("../../../../src/services/api/mainRepository");
const themeRepository = require("../../../../src/services/api/themeRepository.js");

async function postTheme(label) {
  var themeRepo = new themeRepository.ThemeRepository(
    AxiosInstance.getAxiosInstance()
  );
  await themeRepo.postTheme(label).then((result) => {
    console.log(result);
  });
}

exports.postTheme = postTheme;
