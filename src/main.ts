import Game from './game';
import './vendor';

function initGame(): void {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const game = new Game(canvas);
  game.createScene();
  game.start();
}

// initGame(); <- WebGL error on module reload if we do it this way
window.addEventListener('load', initGame);

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept(function accept() {
    const canvas = document.getElementById('canvas');
    // @ts-ignore
    // We need to do this because webgl errors otherwise on a hot reload
    canvas.parentNode.replaceChild(canvas.cloneNode(true), canvas);
    initGame();
  });
}
