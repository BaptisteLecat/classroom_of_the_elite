$('button[name="btn-add-badanswer"]').click(function(event) {
    event.preventDefault();
    var length = $(".input-container-wrapper .form-label").length;
    var label = `<label class="form-label" for="badanswer${length}-content">Mauvaise réponse</label>`;
    var input = `<input class="form-input" name="badanswer${length}-content" type="text"></input>`;
    $(".input-container-wrapper").append(label);
    $(".input-container-wrapper").append(input);
});