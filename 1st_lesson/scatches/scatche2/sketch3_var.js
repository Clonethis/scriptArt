const canvasSketch = require("canvas-sketch");
const { hexToRGBA } = require("canvas-sketch-util/color");
// inculding canvas libraries that are usefull in production
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
  // this updates every s 60*
  // it is same as commented code bellow
  //   animate: true,
};
// const animate=() =>{
//   requestAnimationFrame();
// };
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
const sketch = ({ width, height }) => {
  const agents = [];
  for (let i = 0; i <= 30; i++) {
    // console.log("hey joi I am running", agents);
    const x = random.range(0, width);
    const y = random.range(0, height);

    // pushing new 'agent' into agents array
    agents.push(new Agent(x, y, width, height));
  }
  return ({ context, width, height }) => {
    // context.fillStyle = "grey";
    // context.fillRect(0, 0, width, height);

    // iteration through list that renders elements on page
    agents.forEach((agent) => {
      //   console.log("Iaw drawing", agent);
      agent.draw(context);
    });
  };
};
canvasSketch(sketch, settings);
class Vector {
  constructor(x, y) {
    this.newposx = x;
    this.newposx = y;
  }
}

class Agent {
  constructor(x, y) {
    this.posx = x;
    this.posy = y;

    this.radius = random.range(1, 80);
  }
  draw(context) {
    // console.log("Draw is running context: ", context);

    context.lineWidth = 4;

    context.fillStyle = randomColor();
    context.strokeStyle = randomColor();
    context.beginPath();
    context.translate();
    console.log(
      "vector: ",
      new Vector(random.rangeFloor(0, 1080), random.rangeFloor(0, 1080)).newposx
    );
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    // console.log("context.fillStyle : ", context);
    context.fill();
    context.stroke();
  }
}
