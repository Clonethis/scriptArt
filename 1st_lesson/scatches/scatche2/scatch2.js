const canvasSketch = require("canvas-sketch");
// inculding canvas libraries that are usefull in production
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1048, 1048],
};
const degToRad = (rad) => {
  return (rad / 180) * Math.PI;
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;

    let x, y;
    const num = 1;
    const radius = width * 0.3;
    // due to state management need to 'save()'
    // if i would like
    for (let i = 0; i < num; i++) {
      const slice = degToRad(360 / num);
      const angle = slice * i;

      x = cx + random.range(radius - 80, radius + 80) * Math.sin(angle);
      y = cy + random.range(radius - 80, radius + 80) * Math.cos(angle);

      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      // takes morphed element and changes its size
      context.scale(random.range(0.5, 2), random.range(0.7, 2));

      context.beginPath();
      context.rect(
        -w * random.range(0.1, 0.2),
        -h * random.range(0.5, 0.7),
        w,
        h
      );
      context.fill();
      context.restore();

      // creates outer circle -> all around ->
      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.beginPath();

      context.arc(
        0,
        0,
        random.range(radius - 70, radius),
        0,
        random.range(2, 17)
      );
      // context.lineWidth(random.range(1, 4));
      context.lineWidth = random.range(0.1, 3);
      context.stroke();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
