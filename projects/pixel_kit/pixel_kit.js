const green = [255, 0, 0];
const red = [0, 255, 0];
const blue = [0, 0, 255];

const np = require('neopixel');
const pin = 4;
let pixels = new Uint8ClampedArray(128*3);
for (let i = 0; i < pixels.length; i++) {
  pixels[i] = 0;
}

const drawPixel = (x, y, color) => {
  const _y = (16 * 3) * y;
  const _x = x * 3;
  const _p = _y + _x;
  pixels[_p] = color[0];
  pixels[_p+1] = color[1];
  pixels[_p+2] = color[2];
  np.write(pin, pixels);
};

drawPixel(2, 2, red);