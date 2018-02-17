class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;

    this.bindEvents();
    this.setupBoard();
  }

  bindEvents() {
    this.$el.on("click", "li", ( e => {
      const $square = $(e.currentTarget);
      this.makeMove($square);
    }));
  }

  makeMove($square) {
    const pos = $square.data("pos");
    const currentPlayer = this.game.currentPlayer; //returns a string of either 'x' or 'o'

    try {
      this.game.playMove(pos);
    } catch (e) {
      alert("This " + e.msg.toLowerCase());
      return;
    }

    $square.addClass(currentPlayer);

    if (this.game.isOver()) {
      //cleanup click handlers.
      this.$el.off("click");
      this.$el.addClass("game-over");

      const winner = this.game.winner();
      const $figcaption = $("<figcaption>");

      if (winner) {
        this.$el.addClass(`winner-${winner}`);
        $figcaption.html(`You win, ${winner}!!! ...unless your name is Lizzy, in which case you lose all the time always forever.`);
      } else {
        $figcaption.html("It's a draw! You both suck");
      }

      this.$el.append($figcaption);
    }
  }

  setupBoard() {
    const $ul = $("<ul>");    //create html ul element
    $ul.addClass("group");    //give that new element a class .group

    //iterate through rows creating
    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
      for (let colIdx = 0; colIdx < 3; colIdx++) {
        let $li = $("<li>");    // create html li element
        $li.data("pos", [rowIdx, colIdx]);  // give that li element attribute of row, col

        // tie the li to the ul
        $ul.append($li);  
      }
    }

    this.$el.append($ul);
  }
}



module.exports = View;
