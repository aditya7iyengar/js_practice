function createSpiral(size) {
  var spiral = [],
      row = true;

  for (var i = 0; i < size; i++) {
    spiral.push(new Array(size + 1).join(row ? '1' : '0').split('').map(parseFloat));
    row = false;
  }

  return spiral;
}

var spiralize = function(size) {
  var spiral = createSpiral(size),
      x = 0,
      // Start on the top right
      y = size - 1,
      num = size - 1,
      dir = 'down',
      numDir = 0,
      mv = 0;

  while (num > 0) {
    switch (dir) {
      case 'down':
        x++;
        fillSpiral('left');
        break;
      case 'left':
        y--;
        fillSpiral('up');
        break;
      case 'up':
        x--;
        fillSpiral('right');
        break;
      case 'right':
        y++;
        fillSpiral('down');
        break;
    }
  }

  return spiral;

  function fillSpiral(nextDir) {
    mv++;
    spiral[x][y] = 1;
    if (mv === num) {
      if (mv === 1) {
        num = 0;
      }

      mv = 0;
      dir = nextDir;
      numDir++;

      if (numDir !== 0 && numDir % 2 === 0) {
        num -= 2;
      }
    }
  }
}
