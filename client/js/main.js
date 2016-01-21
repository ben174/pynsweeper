/*global $:false */
var mc = {
    init: function() {
        var boardSize = 10;
        var bombCount = 15;
        $.getJSON('/board/' + boardSize + '/' + bombCount, mc.drawGame);
    },
    drawGame: function(data) {
        $(data).each(function() {
            var row = $("<tr>");
            $(this).each(function() {
                var cell = $("<td>").attr('data-value', this).html('&nbsp;');
                $(cell).mousedown(mc.cellClicked);
                $(row).append(cell);
            });
            $("#board").append(row);
        });
    },
    cellClicked: function(e) {
        if(e.which === 3) {
            $(e.target).removeClass("clicked");
            if($(e.target).hasClass('flagged')) {
                $(e.target).removeClass("flagged").html('&nbsp;');
            } else {
                $(e.target).addClass("flagged").html(mc.flagHTML);
            }
            return;
        }
        if($(e.target).hasClass("clicked") || $(e.target).hasClass("flagged")) {
            console.log("ignoring, already clicked");
            return;
        }
        $(e.target).removeClass("flagged");
        mc.trigger($(e.target));
    },
    trigger: function(element) {
        if($(element).attr('data-value') === '0') {
            mc.expand(element);
            $(element).html('&nbsp');
        } else {
            var val = $(element).attr('data-value');
            if(val === '*') {
                mc.bombHit(element);
            } else {
                $(element).text(val);
            }
        }
        $(element).addClass("clicked");
    },
    bombHit: function(element) {
        $(element).html(mc.bombHTML);
    },
    expand: function(element) {
        if($(element).hasClass("clicked")) {
            return;
        }
        $(element).addClass("clicked");
        // trigger surrounding elements, recursively
        var prevRow = $(element).parent("tr").prev().children();
        if(prevRow.length>0) {
            var upElement = $(prevRow[$(element).index()]);
            if(upElement.attr('data-value') === '0') {
                mc.trigger(upElement);
            }
        }
        var nextRow = $(element).parent("tr").next().children();
        if(nextRow.length>0) {
            var downElement = $(nextRow[$(element).index()]);
            if(downElement.attr('data-value') === '0') {
                mc.trigger(downElement);
            }
        }
        if($(element).prev().attr('data-value') === '0') {
            mc.trigger($(element).prev());
        }
        if($(element).next().attr('data-value') === '0') {
            mc.trigger($(element).next());
        }
    },
    bombHTML: '*',
    flagHTML: '&bull;'
};
$(mc.init);
