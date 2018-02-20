const url = 'http://jservice.io/api/random';
const http = require('http');

http.get(url, function(res) {
  let content = '';
  let obj;
  res.on('data', function(data) {
    content += data;
  });
  res.on('close', function(data) {
    obj = JSON.parse(content);
    console.log(obj[0].question);
    console.log(obj[0].answer);
  });
});