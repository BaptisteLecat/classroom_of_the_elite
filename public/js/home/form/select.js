$(document).ready(function () {
  $("li.select-item").on("click", function () {
    console.log($(this).attr("name"));
    $("#theme_id").val($(this).attr("name"));
  });
});
