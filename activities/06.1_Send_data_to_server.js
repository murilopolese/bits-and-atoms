const http = require('http');

const api = 'http://fabulous-api.herokuapp.com';
const author = encodeURIComponent('Suellen');
const message = encodeURIComponent(`My favourite number is ${Math.random()}`);
const url = `${api}/guestbook/create?author='${author}'&message='${message}'`;

http.get(url, function(res) {
  let content = '';
  let obj;
  res.on('data', function(data) {
    content += data;
  });
  res.on('close', function(data) {
    obj = JSON.parse(content);
    console.log(obj);
  });
});