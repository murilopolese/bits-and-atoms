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
loadModule('DHT11');

const http = require('http');
const DHT11 = require('DHT11');
const dht = DHT11.connect(15);

const api = 'http://fabulous-api.herokuapp.com';
const author = 'Suellen';
let message = '';
let interval = setInterval(
  () => {
    dht.read((a) => {
      console.log('logging');
      const light = analogRead(0);
      message = encodeURIComponent(`Temp is ${a.temp.toString()}, RH is ${a.rh.toString()} and light is ${light}`);
      const url = `${api}/guestbook/create?author=${author}&message=${message}`;
      http.get(url, () => {
        console.log('logged', author, a, light);
      });
    });
  },
  60*1000 // every minute
);
