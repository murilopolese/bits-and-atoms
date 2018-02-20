const loadModule = (moduleName, callback) => {
  require("http").get("http://www.espruino.com/modules/"+moduleName+".js", function(res) {
    var contents = "";
    res.on('data', function(data) { contents += data; });
    res.on('close', function() { 
      Modules.addCached(moduleName, contents); 
      if (callback) callback();
    });
  }).on('error', function(e) {
    console.log("ERROR", e);
  });
};
loadModule('servo');

const http = require('http');
const servo = require('servo');
const s = servo.connect(15);
let timeout1;
let timeout2;

const bang = () => {
  s.move(0);
  timeout1 = setTimeout(() => {
    s.move(1);
    timeout2 = setTimeout(() => {
      s.move(0);
    }, 500);
  }, 200);
};

const render = () => {
  return`<html>
  <header>
    <script>
      window.onload = () => {
        const bang = () => {
          fetch('/bang');
        }
        document.body.addEventListener('click', bang);
        document.body.addEventListener('touchstart', bang);
      }
    </script>
  </header>
  <body>
    <h1>Click to bang</h1>
  </body>
</html>
`;
};

http.createServer((req, res) => {
  const requestUrl = url.parse(req.url, true);
  if (requestUrl.pathname === '/bang') {
    bang();
    res.writeHead(200);
    res.end(true);
  } else {
    res.writeHead(200);
    res.end(render());
  }
}).listen(80);