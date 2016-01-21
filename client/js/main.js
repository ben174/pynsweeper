var mc = {
    init: function() {
        $.getJSON('/board', mc.drawGame);
    },
    drawGame: function(data) {
        $(data).each(function(index, rowData) {
            var row = $("<tr>");
            $(rowData).each(function(i, value) {
                var cell = $("<td>").attr('data-value', value).html('x');
                $(cell).click(mc.cellClicked);
                $(row).append(cell);
            });
            $("#board").append(row);
        });
    },
    cellClicked: function(e) {
        $(e.target).addClass("clicked").text($(e.target).attr('data-value'));
        console.log(e);
    }
};
$(mc.init);
