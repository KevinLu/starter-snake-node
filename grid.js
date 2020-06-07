function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = createArray.apply(this, args);
    }

    return arr;
}

const createGrid = (gameData) => {
    const height = gameData.board.height;
    const width = gameData.board.width;
    const head = gameData.you.head;
    const body = gameData.you.body;
    const snakes = gameData.board.snakes;
    var Grid = createArray(width, height);

    var i, j;
    for (i = height - 1; i >= 0; i--) {
        for (j = 0; j < width; j++) {
            if (i === head.y && j === head.x) {
                Grid[i][j] = 'H';
            } else {
                Grid[i][j] = ' ';
            }
        }
    }

    return Grid;
}

module.exports = createGrid;
