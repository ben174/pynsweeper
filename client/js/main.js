/*global $:false */
var mc = {
    boardSize: null,
    bombCount: null,
    init: function() {
        $('#generate-board').click(mc.generateBoard);
        mc.generateBoard();
    },
    generateBoard: function() {
        mc.boardSize = parseInt($("#board-size").val(), 10);
        mc.bombCount = parseInt($("#bomb-count").val(), 10);
        $.getJSON('/board/' + mc.boardSize + '/' + mc.bombCount, mc.drawGame);
    },
    drawGame: function(data) {
        $("#board").empty();
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
            mc.checkForWinner();
            return;
        }
        if($(e.target).hasClass("clicked") || $(e.target).hasClass("flagged")) {
            console.log("ignoring, already clicked");
            return;
        }
        $(e.target).removeClass("flagged");
        mc.trigger($(e.target));
        mc.checkForWinner();
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
    hasWon: function() {
        // make sure there are as many flags as there are bombs
        if($("td.flagged").length !== mc.bombCount) {
            console.log("Flag count doesn't match bomb count yet.");
            return false;
        }

        // and make sure all bombs are flagged
        if($("td[data-value=\\*]:not(.flagged)").length !== 0) {
            console.log("Some bombs aren't flagged.");
            return false;
        }

        // and make sure there aren't any unclicked squares
        if($("td:not(.clicked):not(.flagged)").length !== 0) {
            console.log("There are still unclicked squares.");
            return false;
        }
        return true;
    },
    checkForWinner: function() {
        if(mc.hasWon()) {
            console.log("Winner winner chicken dinner!");
            alert("You won!");
        }
    },
    bombHTML: '*',
    flagHTML: '&bull;'
};
$(mc.init);
