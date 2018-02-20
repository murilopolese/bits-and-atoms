const http = require("http");
let counter = 0;
const render = (data) => {
  return `
<html>
<body>
<h1>Holy guacamole!</h1>
<p>You are the visitor number <strong>${data.counter}</strong></p>
<h2>Request</h2>
<p>And by the way, that was your request</p>
<code>
<pre>
${JSON.stringify(data.requestUrl)}
</pre>
</code>
</body>
</html>
`;
};

http.createServer((req, res) => {
  const requestUrl = url.parse(req.url, true);
  if (requestUrl.path === '/') {
    counter++;
  }

  res.writeHead(200);
  res.end(
    render({
      counter: counter, 
      requestUrl: requestUrl
    })
  );
}).listen(80);