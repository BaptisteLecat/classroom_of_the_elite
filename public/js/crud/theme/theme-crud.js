async function postTheme(label) {
  $.ajax({
    type: "POST",
    url: "http://localhost:3001/themes",
    dataType: "json",
    data: {
      label: label,
    },
    success: function (msg) {
      console.log("This is the data returned" + msg);
    },
    error: function (err) {
      console.log(err);
    },
  });
}

async function postTheme(label) {
  $.ajax({
    type: "DELETE",
    url: "http://localhost:3001/themes",
    dataType: "json",
    data: {
      id: id,
    },
    success: function (msg) {
      console.log("This is the data returned" + msg);
    },
    error: function (err) {
      console.log(err);
    },
  });
}
