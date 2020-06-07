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
    x: -Infinity,
    y: -Infinity
  },
  max: {
    x: Infinity,
    y: 600
  }
}

// Walls

const walls = [
  Bodies.rectangle(width / 2, height, width, 2, { isStatic: true, label: 'floor' }),
  Bodies.rectangle(0, height / 2, 2, height, { isStatic: true, label: 'side' }),
  Bodies.rectangle(width, height / 2, 2, height, { isStatic: true, label: 'side' })
];
World.add(world, walls);

// Pieces

const oneCell = 30;
const gridCentre = width / 2;
const startTop = oneCell / 2;
const label = 'piece';
const frictionStatic = 10;

// Square
const piece1 = Body.create({
    parts: [
      Bodies.rectangle(gridCentre - 15, startTop, oneCell, oneCell),
      Bodies.rectangle(gridCentre + 15, startTop, oneCell, oneCell),
      Bodies.rectangle(gridCentre - 15, startTop + oneCell, oneCell, oneCell),
      Bodies.rectangle(gridCentre  + 15, startTop + oneCell, oneCell, oneCell)
    ],
    label,
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
  label,
  frictionStatic,
});

// L shape
const piece3 = Body.create({
  parts: [
    Bodies.rectangle(gridCentre - 15, startTop, oneCell, oneCell),
    Bodies.rectangle(gridCentre - 15, startTop * 3, oneCell, oneCell),
    Bodies.rectangle(gridCentre - 15, startTop * 5, oneCell, oneCell),
    Bodies.rectangle(gridCentre  + 15, startTop * 5, oneCell, oneCell)
  ],
  label,
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
  label,
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
  label,
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
  label,
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
  label,
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

  // if(currentYBounds >= height - 0.5) {
  //   Body.setPosition(activePiece, { x, y: height - (unitLengthY * 2) });
  //   // Body.setInertia(activePiece, 50000);
  //   // Body.setMass(activePiece, 1000000);
  //   Body.setStatic(activePiece, true);
  // }

  // Every 1 second
  if (counter >= 60 && currentYBounds <= height - 1) {
    Body.setPosition(activePiece, { x, y: y + unitLengthY });
    counter = 0;
  }
})

// Reduce physics on impact with floor

// Events.on(engine, 'collisionStart', event => {
//   event.pairs.forEach((collision) => {
//     const labels = ['floor', 'piece'];

//     if (
//       labels.includes(collision.bodyA.label) &&
//       labels.includes(collision.bodyB.parent.label)
//       ) {
//         world.bodies.forEach(body => {
//           Body.setInertia(body, 50000);
//           Body.setMass(body, 1000000);
//         });
//         world.bodies.forEach(body => {
//           setTimeout(() => Body.setStatic(body, true), 1000)
//         }); 
//       }
//   }) 
// })

// Reduce physics on impact with sides

// Events.on(engine, 'collisionStart', event => {
//   event.pairs.forEach((collision) => {
//     const labels = ['side', 'piece'];

//     if (
//       labels.includes(collision.bodyA.label) &&
//       labels.includes(collision.bodyB.parent.label)
//       ) {
//         world.bodies.forEach(body => {
//           Body.setInertia(body, 50000);
//           Body.setMass(body, 50);
//         });
//       }
//   }) 
// })

// Keyboard controls

document.addEventListener('keydown', event => {
  const { x, y } = activePiece.position;
  if (event.keyCode === 38) {
    Body.rotate(activePiece, 82);
  }
  if (event.keyCode === 40) {
    Body.rotate(activePiece, -82);
  }
  if (event.keyCode === 37) {
    Body.setPosition(activePiece, { x: x - unitLengthX, y});
  }
  if (event.keyCode === 39) {
    Body.setPosition(activePiece, { x: x + unitLengthX, y});
  }
})