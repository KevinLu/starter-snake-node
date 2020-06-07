var lastMove = "up";

const move = (gameData) => {
    const myId = gameData.you.id;
    const snakes = gameData.board.snakes;
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
            console.log("\x1b[35m", `Attemping to move LEFT to (${closestFood.x}, ${closestFood.y})`);
            if (!willCollide(myId, snakes, head, body, size, "left")) {
                lastMove = "left";
                return "left";
            }
        }
        if (head.x < closestFood.x) {
            console.log("\x1b[35m", `Attemping to move RIGHT to (${closestFood.x}, ${closestFood.y})`);
            if (!willCollide(myId, snakes, head, body, size, "right")) {
                lastMove = "right";
                return "right";
            }
        }
        if (head.x === closestFood.x) {
            console.log("\x1b[35m", 'Head on same x coord as food');
            if (head.y > closestFood.y) {
                if (!willCollide(myId, snakes, head, body, size, "down")) {
                    lastMove = "down";
                    return "down";
                }
            }
            if (head.y < closestFood.y) {
                if (!willCollide(myId, snakes, head, body, size, "up")) {
                    lastMove = "up";
                    return "up";
                }
            }
        }

        if (head.y > closestFood.y) {
            console.log("\x1b[35m", `Attemping to move DOWN to (${closestFood.x}, ${closestFood.y})`);
            if (!willCollide(myId, snakes, head, body, size, "down")) {
                lastMove = "down";
                return "down";
            }
        }
        if (head.y < closestFood.y) {
            console.log("\x1b[35m", `Attemping to move UP to (${closestFood.x}, ${closestFood.y})`);
            if (!willCollide(myId, snakes, head, body, size, "up")) {
                lastMove = "up";
                return "up";
            }
        }
        if (head.y === closestFood.y) {
            console.log("\x1b[35m", 'Head on same y coord as food');
            if (head.x > closestFood.x) {
                if (!willCollide(myId, snakes, head, body, size, "left")) {
                    lastMove = "left";
                    return "left";
                }
            }
            if (head.x < closestFood.x) {
                if (!willCollide(myId, snakes, head, body, size, "right")) {
                    lastMove = "right";
                    return "right";
                }
            }
        }
    }
}

const willCollide = (myId, snakes, head, body, size, move) => {
    switch (move) {
        case "left":
            var leftLoc = { "x": head.x - 1, "y": head.y };
            if (containsObject(leftLoc, body) || leftLoc.x === -1 || collideWithOtherSnakes(myId, leftLoc, snakes)) {
                console.log('\x1b[36m%s\x1b[0m', `WILL COLLIDE IF ${move}`);
                return true;
            } else {
                return false;
            }
        case "right":
            var rightLoc = { "x": head.x + 1, "y": head.y };
            if (containsObject(rightLoc, body) || rightLoc.x === size + 1 || collideWithOtherSnakes(myId, rightLoc, snakes)) {
                console.log('\x1b[36m%s\x1b[0m', `WILL COLLIDE IF ${move}`);
                return true;
            } else {
                return false;
            }
        case "up":
            var upLoc = { "x": head.x, "y": head.y + 1 };
            if (containsObject(upLoc, body) || upLoc.y === size + 1 || collideWithOtherSnakes(myId, upLoc, snakes)) {
                console.log('\x1b[36m%s\x1b[0m', `WILL COLLIDE IF ${move}`);
                return true;
            } else {
                return false;
            }
        case "down":
            var downLoc = { "x": head.x, "y": head.y - 1 };
            if (containsObject(downLoc, body) || downLoc.y === -1 || collideWithOtherSnakes(myId, downLoc, snakes)) {
                console.log('\x1b[36m%s\x1b[0m', `WILL COLLIDE IF ${move}`);
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
        if (obj.x === list[i].x && obj.y === list[i].y) {
            return true;
        }
    }

    return false;
}

const collideWithOtherSnakes = (myId, head, snakes) => {
    var i;
    for (i = 0; i < snakes.length; i++) {
        if (snakes[i].id != myId) {
            var j;
            for (j = 0; j < snakes[i].body.length; j++) {
                if (head.x === snakes[i].body[j].x && head.y === snakes[i].body[j].y) {
                    return true;
                }
            }
        }
    }

    return false;
}

const calculateDistance = (p1, p2) => {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
}

module.exports = move