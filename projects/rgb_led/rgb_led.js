const rgbLed = {
  red: 15,
  green: 13,
  blue: 12
};

const red = 0;
const green = 0;
const blue = 0;

const setColor = (data) => {
  console.log({
    red: (data.red/255),
    green: (data.green/255),
    blue: (data.blue/255)
  });
  analogWrite(rgbLed.red, (data.red/255));
  analogWrite(rgbLed.green, (data.green/255));
  analogWrite(rgbLed.blue, (data.blue/255));
};
setColor({
  red: red, 
  green: green, 
  blue: blue
});

const render = () => {
  return `<html>
  <header>
    <script>
      window.onload = () => {
        const hexToRgb = (hex) => {
            return {
                red: parseInt(hex.substr(1,2), 16),
                green: parseInt(hex.substr(3,2), 16),
                blue: parseInt(hex.substr(5,2), 16)
            };
        };
        const onChange = (e) => {
          const hex = e.srcElement.value;
          const rgb = hexToRgb(hex);
          const url = '/color?red='+rgb.red+'&green='+rgb.green+'&blue='+rgb.blue;
          fetch(url)
          .then(r => r.text())
          .catch(e => console.log(e));
        }
        const picker = document.querySelector('#colorPicker');
        picker.addEventListener('change', onChange);
      }
    </script>
  </header>
  <body>
    <input type="color" id="colorPicker">
  </body>
</html>
`;
};

const http = require('http');
http.createServer((req, res) => {
  const requestUrl = url.parse(req.url, true);
  if (requestUrl.pathname === '/color') {
    console.log(requestUrl.query);
    setColor(requestUrl.query);
    res.writeHead(200);
    res.end(true);
  } else {
    res.writeHead(200);
    res.end(render());
  }
}).listen(80);
