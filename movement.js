const move = (gameData) => {
    const head = gameData.you.head;
    const body = gameData.you.body;
    const food = gameData.board.food;

    if (food) {
        if (head.x > food[0].x) {
            if (!willSelfCollide(head, body, "left")) {
                return "left";
            } else {
                return "right";
            }
        }
        if (head.x < food[0].x) {
            if (!willSelfCollide(head, body, "right")) {
                return "right";
            } else {
                return "left";
            }
        }
        if (head.y > food[0].x) {
            if (!willSelfCollide(head, body, "down")) {
                return "down";
            } else {
                return "up";
            }
        }
        if (head.y < food[0].x) {
            if (!willSelfCollide(head, body, "up")) {
                return "up";
            } else {
                return "down";
            }
        }
        return "down";
    } else {
        return "down";
    }
}

const willSelfCollide = (head, body, move) => {
    switch (move) {
        case "left":
            var newHeadLocation = { "x": head.x - 1, "y": head.y };
            if (containsObject(newHeadLocation, body)) {
                return true;
            } else {
                return false;
            }
        case "right":
            var newHeadLocation = { "x": head.x + 1, "y": head.y };
            if (containsObject(newHeadLocation, body)) {
                return true;
            } else {
                return false;
            }
        case "up":
            var newHeadLocation = { "x": head.x, "y": head.y + 1 };
            if (containsObject(newHeadLocation, body)) {
                return true;
            } else {
                return false;
            }
        case "down":
            var newHeadLocation = { "x": head.x, "y": head.y - 1 };
            if (containsObject(newHeadLocation, body)) {
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