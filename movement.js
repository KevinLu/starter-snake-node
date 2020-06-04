var lastMove = "up";

const move = (gameData) => {
    const head = gameData.you.head;
    const body = gameData.you.body;
    const food = gameData.board.food;
    const size = gameData.board.width;
    var closestFood = food[0];
    var dist = calculateDistance(closestFood, head);

    if (food) {
        food.forEach(f => {
            var newDist = calculateDistance(f, head);
            if (newDist < dist) {
                closestFood = f;
                dist = newDist;
            }
        });
        if (head.x > closestFood.x) {
            if (!willSelfCollide(head, body, size, "left")) {
                lastMove = "left";
                return "left";
            } else {
                lastMove = "right";
                return "right";
            }
        }
        if (head.x < closestFood.x) {
            if (!willSelfCollide(head, body, size, "right")) {
                lastMove = "right";
                return "right";
            } else {
                lastMove = "left";
                return "left";
            }
        }
        if (head.y > closestFood.x) {
            if (!willSelfCollide(head, body, size, "down")) {
                lastMove = "down";
                return "down";
            } else {
                lastMove = "up";
                return "up";
            }
        }
        if (head.y < closestFood.x) {
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

const calculateDistance = (p1, p2) => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

module.exports = move