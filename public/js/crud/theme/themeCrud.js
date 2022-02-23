const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);
async function postTheme(label) {
    console.log(label);
    console.log("-------------------------------")
    $.ajax({
        type: "POST",
        url: "http://localhost:3001/themes",
        xhrFields: { withCredentials: true },
        dataType: "json",
        data: {
            label: label,
        },
        success: function(msg) {
            Alert("This is the data returned" + msg);
        },
        error: function(err) {
            Alert("This is the message of failure" + err);
        },
    });
}

exports.postTheme = postTheme;