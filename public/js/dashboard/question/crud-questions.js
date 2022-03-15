$(document).ready(function () {
  $("button[name=question-crud]").on("click", function (event) {
    event.preventDefault();

    var formData = {
      iri: $("#form-questionnotvalidated").attr("action"),
      validated: false,
      content: $("#question-label").text(),
      theme: $(
        "input[type=hidden][name=theme]"
      ).attr("value"),
      difficulty: $(
        "input[type=hidden][name=difficulty]"
      ).attr("value"),
      time: $(
        "input[type=hidden][name=time]"
      ).attr("value"),
    };

    if ($(this).attr("action") == "update") {
      callController(formData);
    } else if ($(this).attr("action") == "refuse") {
      formData.validated = false;
      callController(formData);
      getNextNotValidatedQuestions();
    } else if ($(this).attr("action") == "validate") {
      formData.validated = true;
      callController(formData);
      getNextNotValidatedQuestions();
    } else {
      console.log("Une erreur est survenue.");
    }
  });
});

function callController(formData) {
  $.ajax({
    type: "put",
    url: "http://localhost:3001/questions",
    data: formData,
    dataType: "application/json; charset=utf-8",
    success: function (msg) {
      console.log("This is the data returned" + msg);
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function getNextNotValidatedQuestions() {
  $.ajax({
    type: "get",
    url: "http://localhost:3001/questions",
    dataType: "application/json; charset=utf-8",
    success: function (msg) {
      console.log(msg);
    },
    error: function (err) {
      console.log(err);
      document.location.reload();
    },
  });
}
