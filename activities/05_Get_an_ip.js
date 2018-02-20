const wifi = require('Wifi');
const ssid = 'Tropical-Iceland';
const password = 'Coconut-Water';

wifi.connect(
  ssid,
  { password: password },
  (error) => {
    if (error) {
      console.log('error', error);
    }
    console.log(wifi.getIP());
  }
);