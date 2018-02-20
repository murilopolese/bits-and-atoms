const http = require("http");

const led = 15;
let isLedOn = false;
digitalWrite(led, isLedOn);

const render = () => {
  return `
<html>
    <head>
        <script>
            window.onload = () => {
              const toggleLed = () => {
                fetch('/toggle')
                .then(r => r.text())
                .then((r) => {
                if(r === 'true') {
                document.body.style.background = 'yellow';
                } else {
                document.body.style.background = '';
                }
                });
              };
              document.body.addEventListener('click', toggleLed);
              document.body.addEventListener('touchstart', toggleLed);
            };
        </script>
    </head>
    <body></body>
</html>
`;
};

http.createServer((req, res) => {
  const requestUrl = url.parse(req.url, true);
  if (requestUrl.path === '/toggle') {
    isLedOn = !isLedOn;
    console.log('toggle', isLedOn);
    digitalWrite(led, isLedOn);
    res.writeHead(200);
    res.end(isLedOn);
  } else {
    res.writeHead(200);
    res.end(render());
  }
}).listen(80);
