(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    var that = this;
    $('.cell').on('click', function(event) {
      var currentTarget = event.currentTarget;
      var $currentTarget = $(currentTarget);
      that.makeMove($currentTarget);
    });
  };

  View.prototype.makeMove = function ($square) {
    var x = $square.data("row");
    var y = $square.data("col");
    var pos = [x, y];
    try{
      this.game.playMove(pos);
      var mark = this.game.board.grid[x][y];
      $square.html("<h1 class='mark'>" + mark + "</h1>");
      if(mark === 'x') {
        $square.addClass('red');
      } else {
        $square.addClass('blue');
      }
      $square.addClass('revealed');
    }
    catch (e) {
      alert('invalid move');
    }

    if (this.game.isOver()) {
      if (!this.game.winner()) {
        this.$el.after("<h1 class='end-message'>It's a tie!</h1>");
      } else {
        this.$el.after("<h1 class='end-message'>Congratulations, " + this.game.winner() + " wins!</h1>");
      }
      $('.cell').off("click");
    }
  };

  View.prototype.setupBoard = function () {
    var rows = "";
    var cells = "";
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        cells += "<div class='cell' data-row='" + i + "' data-col='" + j + "'></div>";
      }
      rows += "<div class='row clearfix'>" + cells + "</div>";
      cells = "";
    }
    $(this.$el).append(rows);
  };
})();
