//const createGrid = require('./grid');
var myId;
var snakes;
var head;
var body;
var tail;
var food;
var size;
var length;
var moves;
var closestFood;
var dist;
var health;

var ate = false;
var lastMove = "up";
const DIRECTIONS = ['up', 'right', 'down', 'left'];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const move = (gameData) => {
    //const Grid = createGrid(gameData);
    //console.log(Grid);

    const turn = gameData.turn;
    myId = gameData.you.id;
    snakes = gameData.board.snakes;
    head = gameData.you.head;
    body = gameData.you.body;
    tail = body[body.length - 1];
    food = gameData.board.food;
    size = gameData.board.width;
    length = gameData.you.length;
    moves = possibleMoves(head);
    closestFood = food[0];
    dist = calculateDistance(closestFood, head);
    health = gameData.you.health;

    /*if ((food && health < 50) || length > 6) {
        food.forEach(f => {
            var newDist = calculateDistance(f, head);
            if (newDist < dist && isThisFoodSafe(closestFood, gameData.you, snakes)) {
                closestFood = f;
                dist = newDist;
                ate = true;
            }
        });
    } else if (!ate && length < 7) {
        closestFood = { x: 10 - length + 4, y: 2 + length + 4 };
    } else {
        closestFood = tail;
        ate = false;
    }*/

    if (food) {
        food.forEach(f => {
            var newDist = calculateDistance(f, head);
            if (newDist < dist && isThisFoodSafe(closestFood, gameData.you, snakes)) {
                closestFood = f;
                dist = newDist;
                ate = true;
            }
        });
    } else {
        const randDir = DIRECTIONS[getRandomInt(0, 3)];
        closestFood = moves[randDir];
    }
    makeMove();
    // Check if any space is safe even if there's no food
    for (let d of DIRECTIONS) {
        if (!willCollide(myId, snakes, head, body, size, d)) {
            moves[d].safe = true;
        }
    }
    var finalMove = 'up';
    for (let d of DIRECTIONS) {
        let m = moves[d];
        if (m.safe && m.hasFood) {
            finalMove = m.dir;
            break;
        } else if (m.safe) {
            finalMove = m.dir;
        }
    }
    console.log(moves);
    return finalMove;
}

const makeMove = () => {
    if (head.x > closestFood.x) {
        moves.left.hasFood = true;
        console.log("\x1b[35m%s\x1b[0m", `Attemping to move LEFT to (${closestFood.x}, ${closestFood.y})`);
        if (!willCollide(myId, snakes, head, body, size, "left")) {
            moves.left.safe = true;
        }
    }
    if (head.x < closestFood.x) {
        moves.right.hasFood = true;
        console.log("\x1b[35m%s\x1b[0m", `Attemping to move RIGHT to (${closestFood.x}, ${closestFood.y})`);
        if (!willCollide(myId, snakes, head, body, size, "right")) {
            moves.right.safe = true;
        }
    }
    if (head.x === closestFood.x) {
        console.log("\x1b[35m%s\x1b[0m", 'Head on same x coord as food');
        if (head.y > closestFood.y) {
            moves.down.hasFood = true;
            if (!willCollide(myId, snakes, head, body, size, "down")) {
                moves.down.safe = true;
            }
        }
        if (head.y < closestFood.y) {
            moves.up.hasFood = true;
            if (!willCollide(myId, snakes, head, body, size, "up")) {
                moves.up.safe = true;
            }
        }
    }

    if (head.y > closestFood.y) {
        moves.down.hasFood = true;
        console.log("\x1b[35m%s\x1b[0m", `Attemping to move DOWN to (${closestFood.x}, ${closestFood.y})`);
        if (!willCollide(myId, snakes, head, body, size, "down")) {
            moves.down.safe = true;
        }
    }
    if (head.y < closestFood.y) {
        moves.up.hasFood = true;
        console.log("\x1b[35m%s\x1b[0m", `Attemping to move UP to (${closestFood.x}, ${closestFood.y})`);
        if (!willCollide(myId, snakes, head, body, size, "up")) {
            moves.up.safe = true;
        }
    }
    if (head.y === closestFood.y) {
        console.log("\x1b[35m%s\x1b[0m", 'Head on same y coord as food');
        if (head.x > closestFood.x) {
            moves.left.hasFood = true;
            if (!willCollide(myId, snakes, head, body, size, "left")) {
                moves.left.safe = true;
            }
        }
        if (head.x < closestFood.x) {
            moves.right.hasFood = true;
            if (!willCollide(myId, snakes, head, body, size, "right")) {
                moves.right.safe = true;
            }
        }
    }
}

const possibleMoves = (head) => {
    return {
        up: { dir: 'up', x: head.x, y: head.y - 1, safe: false, hasFood: false },
        right: { dir: 'right', x: head.x + 1, y: head.y, safe: false, hasFood: false },
        down: { dir: 'down', x: head.x, y: head.y + 1, safe: false, hasFood: false },
        left: { dir: 'left', x: head.x - 1, y: head.y, safe: false, hasFood: false },
    };
}

const predictNextMove = (snake) => {
    const head = snake.body[0];
    const neck = snake.body[1];

    var dx = head.x - neck.x;
    var dy = head.y - neck.y;

    return { x: head.x + dx, y: head.y + dy }
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
        if (snakes[i].id !== myId) {
            const prediction = predictNextMove(snakes[i]);
            var j;
            for (j = 0; j < snakes[i].body.length; j++) {
                if ((head.x === snakes[i].body[j].x && head.y === snakes[i].body[j].y) ||
                    (head.x === snakes[i].head.x && head.y === snakes[i].head.y) ||
                    (head.x === prediction.x && head.y === prediction.y)
                    // ||
                    //(head.x === snakes[i].head.x + 1 && head.y === snakes[i].head.y) ||
                    //(head.x === snakes[i].head.x - 1 && head.y === snakes[i].head.y) ||
                    //(head.x === snakes[i].head.x && head.y === snakes[i].head.y + 1) ||
                    //(head.x === snakes[i].head.x + 1 && head.y === snakes[i].head.y - 1)
                    ) {
                    return true;
                }
            }
        }
    }

    return false;
}

const isThisFoodSafe = (foodLoc, me, snakes) => {
    var locationsNearFood = possibleMoves(foodLoc);
    for (let d of DIRECTIONS) {
        var loc = locationsNearFood[d];
        for (let s of snakes) {
            if (me.id !== s.id && me.head.x === loc.x && me.head.y === loc.y && s.length >= me.length) {
                console.log("\x1b[31m%s\x1b[0m", "FOOD NOT SAFE: " + `(${foodLoc.x}, ${foodLoc.y})`);
                return false;
            }
        }
    }

    return true;
}

const calculateDistance = (p1, p2) => {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
}

module.exports = move