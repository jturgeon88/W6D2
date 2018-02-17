const View = require('./ttt-view.js');
const Game = require('../../../jQuery_ttt/node_solution/game');

$( () => {
  // Your code here
  const rootEl = $('.ttt');     //.ttt refers to the class name in the figure tag in the index.html
  const game = new Game();
  new View(game, rootEl);
});
