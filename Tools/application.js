// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
    new GameManager(20,20, KeyboardInputManager, HTMLActuator);
  });
  