const button = 15;
const led = 13;
let on = false;

setWatch(
  () => {
    console.log('clicked');
    digitalWrite(led, on);
    on = !on;
  },
  button,
  { edge: 'rising', repeat: true, debounce: 50 }
);