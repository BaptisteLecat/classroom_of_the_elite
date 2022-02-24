$(document).ready(function () {
  $("form").on("submit", function (event) {
    event.preventDefault();
    var formData = {
      content: $("#question-content").val(),
      goodAnswer: $("#goodanswer-content").val(),
      badAnswers: $('input[name="badanswer-content"]')
        .map((_, el) => el.value)
        .get(),
      theme_id: $("#theme_id").val(),
      time_id: $("#time_id").val(),
      difficulty_id: $("#difficulty_id").val(),
    };

    $.ajax({
      type: "POST",
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
  });
});
