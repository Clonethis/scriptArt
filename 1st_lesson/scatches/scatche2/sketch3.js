const canvasSketch = require("canvas-sketch");
// inculding canvas libraries that are usefull in production
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [2080, 2080],
  // this updates every s 60*
  // it is same as commented code bellow
  animate: true,
};
// const animate = () => {
//   requestAnimationFrame(animate);
// };
// animate();
const sketch = ({ width, height }) => {
  const agents = [];
  for (let i = 0; i <= 4; i++) {
    // console.log("hey joi I am running", agents);
    const x = random.range(500, width - 500);
    const y = random.range(500, height - 500);

    // pushing new 'agent' into agents array
    agents.push(new Agent(x, y));
  }
  return ({ context, width, height }) => {
    // context.fillStyle = "white";
    // context.lineWidth = 9;
    // context.fillRect(0, 0, width, height);

    // iteration through list that renders elements on page
    agents.forEach((agent) => {
      // animate();
      agent.update();
      agent.bounce(width, height);
      agent.draw(context);
    });
  };
};
const randomColor = () => {
  let hexColor = "#";
  let basicChars = "0123456789ABCDEF";
  for (let i = 0; i <= 5; i++) {
    // console.log("basicChars: ", basicChars[5]);
    hexColor += basicChars[random.rangeFloor(0, 15)];
  }
  //   console.log("hex color:", hexColor);
  //   hexColor = "FFFFFF";

  return hexColor;
};
canvasSketch(sketch, settings);
// new class for describing 'Agents' behavior
class Vector {
  constructor(x, y) {
    // 'x' that is passed down behaves also like a property of 'Vetor'
    this.x = x;
    this.y = y;
  }
}
class Agent {
  constructor(x, y) {
    this.color = randomColor();
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-2, 3), random.range(-2, 3));
    this.line = random.range(19, 50);
    this.radius = random.range(4, 189);
  }
  bounce(width, height) {
    if (this.pos.x <= this.radius || this.pos.x >= width - this.radius) {
      this.vel.x *= -1;
      this.color = randomColor();
    }
    if (this.pos.y <= this.radius || this.pos.y >= height - this.radius) {
      this.vel.y *= -1;
      this.color = randomColor();
    }
  }
  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.lineWidth = this.line;
    context.strokeStyle = randomColor();
    context.fillStyle = this.color;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, 2 * Math.PI);
    // context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.Pi * 2);
    // context.fill();
    // context.stroke();
    // console.log("i am drawing", this.radius);
    // console.log("this pos x: ", this.pos.y, this.pos.y);
    // context.rect(0, 0, this.radius, this.radius);
    context.stroke();
    // context.restore();
    context.restore();
  }
}
