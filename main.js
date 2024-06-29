/*
@title: Swamps and Walls
@author: Aditi Ranjan
*/

const player = "p";
const obstacle = "o";
const goal = "g";
const swamp = "x";

setLegend(
  [player, bitmap`
................
................
......CCCCC.....
......33333.....
....CCCCCCCCC...
......08880.00..
....000C8C0.0...
....0.0888000...
...00.05550.....
.....008880.....
.....088880.....
.....088800.....
.....00000......
......0.0.......
.....00.00......
................`],
  [obstacle, bitmap`
................
................
000000000000000.
0CCCCCC0CCCCCC0.
0CCCCCC0CCCCCC0.
0CCCCCC0CCCCCC0.
0CCCCCC0CCCCCC0.
000000000000000.
0CCCCCC0CCCCCC0.
0CCCCCC0CCCCCC0.
0CCCCCC0CCCCCC0.
0CCCCCC0CCCCCC0.
000000000000000.
................
................
................`],
  [goal, bitmap`
................
................
...00000.000000.
...044000004440.
...044D444D4440.
...044D444D4440.
...044D444D4440.
...044D444D4440.
...000044400000.
...0..00000.....
...0............
...0............
...0............
...0............
...0............
...0............`],
  [swamp, bitmap`
................
................
................
................
................
................
.....FFFFFFFF...
.FFFFFFFFFFFFF..
...FFFFFFFFFFFF.
..FFFFFFFFFFF...
FFFFFFFFFFF.....
....FFFFFFFFFF..
...FFFFFFFFF....
................
................
................`]
);

setSolids([player, obstacle]);

let level = 0;
const levels = [
  map`
p.x...o...o...o.
o...x...x.......
...o.o...o..o...
.o........x.....
.o.....o....o...
....o...x.......
.o...o....o...o.
.o..o..x.....x..
....x...o...x...
.x.x...x..o.....
..o...o.o..ox..o
o.......x...o.o.
..o.x.o......go.`
];


setMap(levels[level]);

setPushables({
  [player]: []
});


onInput("w", () => {
  getFirst(player).y -= 1;
  checkCollision();
});

onInput("a", () => {
  getFirst(player).x -= 1;
  checkCollision();
});

onInput("s", () => {
  getFirst(player).y += 1;
  checkCollision();
});

onInput("d", () => {
  getFirst(player).x += 1;
  checkCollision();
});


function checkCollision() {
  
  const playerPos = getFirst(player);
  const goalPos = getFirst(goal);

  // Check if player collides with an obstacle
  const isCollidingWithObstacle = getTile(playerPos.x, playerPos.y).some(sprite => sprite.type === swamp);
  
  if (isCollidingWithObstacle) {
    addText("You Died!", { x: 4, y: 4, color: color`3` });
    setTimeout(() => setMap(levels[level]), 1000); // Reset the level after a short delay
    return;
  }

  // Check if player reaches the goal
  if (playerPos.x === goalPos.x && playerPos.y === goalPos.y) {
    level++;
    
    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      addText("You Win!", { x: 4, y: 4, color: color`3` });
    }
    
  }
}
