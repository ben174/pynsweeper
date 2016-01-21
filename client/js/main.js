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
                var cell = $("<td>").attr('data-value', value).html('&nbsp;');
                $(cell).mousedown(mc.cellClicked);
                $(row).append(cell);
            });
            $("#board").append(row);
        });
    },
    cellClicked: function(e) {
        if($(e.target).hasClass("clicked") || $(e.target).hasClass("flagged")) {
            console.log("ignoring, already clicked");
            return;
        }
        if(e.which==3) {
            $(e.target).removeClass("clicked")
                .addClass("flagged")
                .html("&bull;");
        } else {
            $(e.target).removeClass("flagged");
            mc.trigger($(e.target));
        }
    },
    trigger: function(element) {
        if($(element).attr('data-value') == '0') {
            mc.expand(element);
        }
        $(element).addClass("clicked").text($(element).attr('data-value'));
    },
    expand: function(element) {
        $(element).addClass("clicked");
        if($(element).hasClass("clicked")) {
            return;
        }
        if($(element).prev().attr('data-value') == '0') {
            mc.trigger($(element).prev());
        }
        if($(element).next().attr('data-value') == '0') {
            mc.trigger($(element).next());
        }
    }
};
$(mc.init);
