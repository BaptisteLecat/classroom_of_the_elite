$(document).ready(function() {
    $('button[name="btn-add-badanswer"]').click(function(event) {
        event.preventDefault();
        var length = $(".input-container-wrapper .form-label").length;
        var label = `<label class="form-label" for="badanswer-${length}-content">Mauvaise réponse</label>`;
        var input = `
        <div class="input-deletable-container">
            <input class="form-input" name="badanswer-content" style="flex:3;" type="text">
            <img class="input-deletable-btn" name="${length}" src="/assets/icons/bin.png" alt="delete">
        </div>`;
        var inputbox = `
        <div class="input-container-wrapper" name="input-box-${length}">
            ${label}
            ${input}
        </div>`;
        console.log(inputbox);
        $(".input-container").append(inputbox);
    });

    $(".input-container").on(
        "click",
        ".input-deletable-btn",
        function() {
            index = event.target.name;
            $(`div[name="input-box-${index}"]`).remove();
        }
    );
});