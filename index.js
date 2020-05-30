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

const unit = Bodies.rectangle(gridCentre - 15, 15, oneCell, oneCell, {
  render: {
    fillStyle: 'red'
  }
});
const unit2 = Bodies.rectangle(gridCentre + 15, 15, oneCell, oneCell, {
  render: {
    fillStyle: 'red'
  }
});
const unit3 = Bodies.rectangle(gridCentre - 15, 45, oneCell, oneCell, {
  render: {
    fillStyle: 'red'
  }
});
const unit4 = Bodies.rectangle(gridCentre  + 15, 45, oneCell, oneCell, {
  render: {
    fillStyle: 'red'
  }
});

// Combination function

const combined = Body.create({
  parts: [unit, unit2, unit3, unit4],
  // isStatic: true
});
World.add(world, combined);
