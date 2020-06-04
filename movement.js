var lastMove = "up";    

const move = (gameData) => {
    const head = gameData.you.head;
    const body = gameData.you.body;
    const food = gameData.board.food;
    const size = gameData.board.width;

    if (food) {
        if (head.x > food[0].x) {
            if (!willSelfCollide(head, body, size, "left")) {
                lastMove = "left";
                return "left";
            } else {
                lastMove = "right";
                return "right";
            }
        }
        if (head.x < food[0].x) {
            if (!willSelfCollide(head, body, size, "right")) {
                lastMove = "right";
                return "right";
            } else {
                lastMove = "left";
                return "left";
            }
        }
        if (head.y > food[0].x) {
            if (!willSelfCollide(head, body, size, "down")) {
                lastMove = "down";
                return "down";
            } else {
                lastMove = "up";
                return "up";
            }
        }
        if (head.y < food[0].x) {
            if (!willSelfCollide(head, body, size, "up")) {
                lastMove = "up";
                return "up";
            } else {
                lastMove = "down";
                return "down";
            }
        }
        return lastMove;
    } else {
        return lastMove;
    }
}

const willSelfCollide = (head, body, size, move) => {
    switch (move) {
        case "left":
            var newHeadLocation = { "x": head.x - 1, "y": head.y };
            if (containsObject(newHeadLocation, body) || newHeadLocation.x === 0) {
                return true;
            } else {
                return false;
            }
        case "right":
            var newHeadLocation = { "x": head.x + 1, "y": head.y };
            if (containsObject(newHeadLocation, body) || newHeadLocation.x === size) {
                return true;
            } else {
                return false;
            }
        case "up":
            var newHeadLocation = { "x": head.x, "y": head.y + 1 };
            if (containsObject(newHeadLocation, body) || newHeadLocation.y === 11) {
                return true;
            } else {
                return false;
            }
        case "down":
            var newHeadLocation = { "x": head.x, "y": head.y - 1 };
            if (containsObject(newHeadLocation, body) || newHeadLocation.y === 0) {
                return true;
            } else {
                return false;
            }
        default:
            return false;
    }
}

const containsObject = (obj, list) => {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}

module.exports = move