var  on = false;
setInterval(function() {
  on = !on;
  digitalWrite(15, on);
}, 500);