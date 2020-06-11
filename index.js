const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const cellsHorizontal = 10;
const cellsVertical = 20;
// const width = window.innerWidth * 0.45;
// const height = window.innerHeight * 0.90;
const width = 300;
const height = 600;
const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    width,
    height
  }
});
Render.run(render);
Runner.run(Runner.create(), engine);

world.gravity.y = 0;
world.bounds = {
  min: {
    x: 0,
    y: -Infinity
  },
  max: {
    x: width,
    y: height
  }
}

// Walls

const walls = [
  Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 2, height, { isStatic: true })
];
World.add(world, walls);

// Pieces

const oneCell = 30;
const gridCentre = width / 2;
const startTop = oneCell / 2;
const frictionStatic = 10;

// Square
const piece1 = Body.create({
    parts: [
      Bodies.rectangle(gridCentre - 15, startTop, oneCell, oneCell),
      Bodies.rectangle(gridCentre + 15, startTop, oneCell, oneCell),
      Bodies.rectangle(gridCentre - 15, startTop + oneCell, oneCell, oneCell),
      Bodies.rectangle(gridCentre  + 15, startTop + oneCell, oneCell, oneCell)
    ],
    frictionStatic
  });

// Straight line
const piece2 = Body.create({
  parts: [
    Bodies.rectangle(gridCentre - 45, startTop, oneCell, oneCell),
    Bodies.rectangle(gridCentre - 15, startTop, oneCell, oneCell),
    Bodies.rectangle(gridCentre + 15, startTop, oneCell, oneCell),
    Bodies.rectangle(gridCentre  + 45, startTop, oneCell, oneCell)
  ],
  label: 'straight',
  frictionStatic
});

// L shape
const piece3 = Body.create({
  parts: [
    Bodies.rectangle(gridCentre - 15, startTop, oneCell, oneCell),
    Bodies.rectangle(gridCentre - 15, startTop * 3, oneCell, oneCell),
    Bodies.rectangle(gridCentre - 15, startTop * 5, oneCell, oneCell),
    Bodies.rectangle(gridCentre  + 15, startTop * 5, oneCell, oneCell)
  ],
  frictionStatic
});

// Backwards L shape
const piece4 = Body.create({
  parts: [
    Bodies.rectangle(gridCentre + 15, startTop, oneCell, oneCell),
    Bodies.rectangle(gridCentre + 15, startTop * 3, oneCell, oneCell),
    Bodies.rectangle(gridCentre + 15, startTop * 5, oneCell, oneCell),
    Bodies.rectangle(gridCentre - 15, startTop * 5, oneCell, oneCell)
  ],
  frictionStatic
});

// Upside down T
const piece5 = Body.create({
  parts: [
    Bodies.rectangle(gridCentre, startTop, oneCell, oneCell),
    Bodies.rectangle(gridCentre - 30, startTop * 3, oneCell, oneCell),
    Bodies.rectangle(gridCentre, startTop * 3, oneCell, oneCell),
    Bodies.rectangle(gridCentre + 30, startTop * 3, oneCell, oneCell)
  ],
  frictionStatic
});

// S shape
const piece6 = Body.create({
  parts: [
    Bodies.rectangle(gridCentre, startTop, oneCell, oneCell),
    Bodies.rectangle(gridCentre + 30, startTop, oneCell, oneCell),
    Bodies.rectangle(gridCentre - 30, startTop * 3, oneCell, oneCell),
    Bodies.rectangle(gridCentre, startTop * 3, oneCell, oneCell)
  ],
  frictionStatic
});

// Z shape
const piece7 = Body.create({
  parts: [
    Bodies.rectangle(gridCentre - 30, startTop, oneCell, oneCell),
    Bodies.rectangle(gridCentre, startTop, oneCell, oneCell),
    Bodies.rectangle(gridCentre, startTop * 3, oneCell, oneCell),
    Bodies.rectangle(gridCentre + 30, startTop * 3, oneCell, oneCell)
  ],
  frictionStatic
});

const piecesArray = [piece1, piece2, piece3, piece4, piece5, piece6, piece7];

const randomPiece = (arr) => {
  const index = Math.floor(Math.random() * 7);
  return arr[index];
}

let activePiece = randomPiece(piecesArray);

World.add(world, activePiece);

// Create event to replace gravity effect on pieces

let counter = 0;

Events.on(engine, 'afterUpdate', event => {
  const { x, y } = activePiece.position;
  const currentYBounds = activePiece.bounds.max.y;
  counter += 1;

  // Every 1 second
  if (counter >= 60 && currentYBounds <= height - 1) {
    Body.setPosition(activePiece, { x, y: y + unitLengthY });
    counter = 0;
  }
})

// Special case to handle straight line piece and floor collision

Events.on(engine, 'beforeUpdate', event => {
  const { x, y } = activePiece.position;
  const currentYBounds = activePiece.bounds.max.y;

  if (currentYBounds >= height - 0.5 && activePiece.parent.label === 'straight') {
    Body.setPosition(activePiece, { x, y: height - (unitLengthY * 2) });
    Body.setStatic(activePiece, true);
  }
})

// Keyboard controls

document.addEventListener('keydown', event => {
  const { x, y } = activePiece.position;
  if (event.keyCode === 38) {
    Body.rotate(activePiece.parent, 11);
  }
  if (event.keyCode === 40) {
    Body.rotate(activePiece.parent, -11);
  }
  if (activePiece.bounds.min.x > 1 && event.keyCode === 37) {
    Body.setPosition(activePiece, { x: x - unitLengthX, y});
  }
  if (activePiece.bounds.max.x <= width - (unitLengthX / 2) && event.keyCode === 39) {
    Body.setPosition(activePiece, { x: x + unitLengthX, y});
  }
})