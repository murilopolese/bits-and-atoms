const http = require('http');
const button = 15;
const led = 13;
const author = 'Suellen';
const message = Date.now();
const api = 'http://fabulous-api.herokuapp.com';

setWatch(
  () => {
    const url = `${api}/guestbook/create?author=${author}&message=${message}`;
    digitalWrite(led, 1);
    http.get(url, (res) => {
      res.on('close', () => {
        digitalWrite(led, 0);
      });
    });
  },
  button,
  { edge: 'rising', repeat: true, debounce: 100 }
);
