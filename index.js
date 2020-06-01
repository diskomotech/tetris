const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const cellsHorizontal = 10;
const cellsVertical = 20;
// const width = window.innerWidth * 0.45;
// const height = window.innerHeight * 0.90;
const width = 300;
const height = 600;
// const unitLengthX = width / cellsHorizontal;
// const unitLengthY = height / cellsVertical;

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

// Square
const piece1 = Body.create({
    parts: [
      Bodies.rectangle(gridCentre - 15, startTop, oneCell, oneCell),
      Bodies.rectangle(gridCentre + 15, startTop, oneCell, oneCell),
      Bodies.rectangle(gridCentre - 15, startTop + oneCell, oneCell, oneCell),
      Bodies.rectangle(gridCentre  + 15, startTop + oneCell, oneCell, oneCell)
    ],
    label: 'piece'
  });

// Straight line
const piece2 = Body.create({
  parts: [
    Bodies.rectangle(gridCentre - 45, startTop, oneCell, oneCell),
    Bodies.rectangle(gridCentre - 15, startTop, oneCell, oneCell),
    Bodies.rectangle(gridCentre + 15, startTop, oneCell, oneCell),
    Bodies.rectangle(gridCentre  + 45, startTop, oneCell, oneCell)
  ],
  label: 'piece'
});

// L shape
const piece3 = Body.create({
  parts: [
    Bodies.rectangle(gridCentre - 15, startTop, oneCell, oneCell),
    Bodies.rectangle(gridCentre - 15, startTop * 3, oneCell, oneCell),
    Bodies.rectangle(gridCentre - 15, startTop * 5, oneCell, oneCell),
    Bodies.rectangle(gridCentre  + 15, startTop * 5, oneCell, oneCell)
  ],
  label: 'piece'
});

// Backwards L shape
const piece4 = Body.create({
  parts: [
    Bodies.rectangle(gridCentre + 15, startTop, oneCell, oneCell),
    Bodies.rectangle(gridCentre + 15, startTop * 3, oneCell, oneCell),
    Bodies.rectangle(gridCentre + 15, startTop * 5, oneCell, oneCell),
    Bodies.rectangle(gridCentre - 15, startTop * 5, oneCell, oneCell)
  ],
  label: 'piece'
});

// Upside down T
const piece5 = Body.create({
  parts: [
    Bodies.rectangle(gridCentre, startTop, oneCell, oneCell),
    Bodies.rectangle(gridCentre - 30, startTop * 3, oneCell, oneCell),
    Bodies.rectangle(gridCentre, startTop * 3, oneCell, oneCell),
    Bodies.rectangle(gridCentre + 30, startTop * 3, oneCell, oneCell)
  ],
  label: 'piece'
});

// S shape
const piece6 = Body.create({
  parts: [
    Bodies.rectangle(gridCentre, startTop, oneCell, oneCell),
    Bodies.rectangle(gridCentre + 30, startTop, oneCell, oneCell),
    Bodies.rectangle(gridCentre - 30, startTop * 3, oneCell, oneCell),
    Bodies.rectangle(gridCentre, startTop * 3, oneCell, oneCell)
  ],
  label: 'piece'
});

// Z shape
const piece7 = Body.create({
  parts: [
    Bodies.rectangle(gridCentre - 30, startTop, oneCell, oneCell),
    Bodies.rectangle(gridCentre, startTop, oneCell, oneCell),
    Bodies.rectangle(gridCentre, startTop * 3, oneCell, oneCell),
    Bodies.rectangle(gridCentre + 30, startTop * 3, oneCell, oneCell)
  ],
  label: 'piece'
});

World.add(world, piece1);

// Reduce physics on impact with floor

Events.on(engine, 'collisionStart', event => {
  event.pairs.forEach((collision) => {
    const labels = ['floor', 'piece'];

    if (
      labels.includes(collision.bodyA.label) &&
      labels.includes(collision.bodyB.parent.label)
      ) {
        world.bodies.forEach(body => Body.setStatic(body, true));
      }
  }) 
})
