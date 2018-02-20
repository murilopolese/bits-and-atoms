// reset(true);
const setup = () => {
  const wifi = require('Wifi');
  const ssid = 'Tropical-Iceland';
  const password = 'Suellen2018';
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
};

E.on('init', setup);
save();