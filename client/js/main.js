var mc = {
  init: function() {
    $.getJSON('/board', mc.drawGame);
  },
  drawGame: function(data) {
    $(data).each(function(index, rowData) {
      console.log('fin to draw row');
      var row = $("<tr>");
      $(rowData).each(function(i, value) {
        var cell = $("<td>").text(value);
        $(row).append(cell);
      });
      console.log(row);
      $("#board").append(row);
      console.log($("#board"));
    });
  }
};
$(mc.init);
