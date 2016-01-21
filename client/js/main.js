var mc = {
    init: function() {
        var boardSize = 10;
        var bombCount = 15;
        $.getJSON('/board/' + boardSize + '/' + bombCount, mc.drawGame);
    },
    drawGame: function(data) {
        $(data).each(function(index, rowData) {
            var row = $("<tr>");
            $(rowData).each(function(i, value) {
                var cell = $("<td>").attr('data-value', value).html('x');
                $(cell).mousedown(mc.cellClicked);
                $(row).append(cell);
            });
            $("#board").append(row);
        });
    },
    cellClicked: function(e) {
        if(e.which==3) {
            $(e.target).removeClass("clicked")
                .addClass("flagged")
                .html("&bull;");
        } else {
            $(e.target).removeClass("flagged")
                .addClass("clicked")
                .text($(e.target)
                .attr('data-value'));
            $(e.target).closest("td")
                .addClass("clicked");
        }
    }
};
$(mc.init);
