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
  Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 2, height, { isStatic: true })
];
World.add(world, walls);

// Pieces

const oneCell = 30;
const gridCentre = width / 2;

// Square
const piece1 = Body.create({
    parts: [
      Bodies.rectangle(gridCentre - 15, 15, oneCell, oneCell),
      Bodies.rectangle(gridCentre + 15, 15, oneCell, oneCell),
      Bodies.rectangle(gridCentre - 15, 45, oneCell, oneCell),
      Bodies.rectangle(gridCentre  + 15, 45, oneCell, oneCell)
    ]
  });

// Straight line
const piece2 = Body.create({
  parts: [
    Bodies.rectangle(gridCentre - 45, 15, oneCell, oneCell),
    Bodies.rectangle(gridCentre - 15, 15, oneCell, oneCell),
    Bodies.rectangle(gridCentre + 15, 15, oneCell, oneCell),
    Bodies.rectangle(gridCentre  + 45, 15, oneCell, oneCell)
  ]
});

World.add(world, piece2);