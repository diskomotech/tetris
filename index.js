const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const cellsHorizontal = 10;
const cellsVertical = 20;
const width = window.innerWidth * 0.45;
const height = window.innerHeight * 0.90;

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