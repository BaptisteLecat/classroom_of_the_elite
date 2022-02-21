$(document).ready(function () {
  var itemCardTimeId = 0;
  $('div[name="item-card-list-time"] > .item-card').click(function (event) {
    event.preventDefault();
    if (itemCardTimeId != $(this).attr("name")) {
      $('div[name="item-card-list-time"] > .item-card-selected').removeClass(
        "item-card-selected"
      );
      $(this).addClass("item-card-selected");
      itemCardTimeId = $(this).attr("name");
    }

    $('input[name="time_id"]').val(itemCardTimeId);
  });

  var itemCardDifficultyId = 0;
  $('div[name="item-card-list-difficulty"] > .item-card').click(function (
    event
  ) {
    event.preventDefault();
    if (itemCardDifficultyId != $(this).attr("name")) {
      $(
        'div[name="item-card-list-difficulty"] > .item-card-selected'
      ).removeClass("item-card-selected");
      $(this).addClass("item-card-selected");
      itemCardDifficultyId = $(this).attr("name");
    }

    $('input[name="difficulty_id"]').val(itemCardDifficultyId);
  });
});
