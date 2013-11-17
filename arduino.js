var five = require("johnny-five"),
    board = new five.Board();



board.on("ready", function() {

  var enablePin = new five.Pin(11),
      in1 = new five.Pin(4),
      in2 = new five.Pin(7),
      forward = true;

  var forward = function() {
    in1.high();
    in2.low();
  };

  var backward = function() {
    in1.high();
    in2.low();
  };


  enablePin.high();

  // in1.high();
  // in2.low();


  // var pot = ;

  new five.Sensor("I0").scale(0, 180).on("change", function() {
    console.log(this.value);
  });


  board.loop(1000, function() {

    // if (forward) {
    //   in1.low();
    //   in2.high();
    // } else {
    //   in1.high();
    //   in2.low();
    // }

    forward = !forward;
  });

});



// void loop()
// {
//   digitalWrite(in1A, HIGH);
//   digitalWrite(in2A, LOW);
//   digitalWrite(enablePin, HIGH);
//   delay(5000);
//   digitalWrite(enablePin, LOW);
//   delay(2000);
//   digitalWrite(in1A, LOW);
//   digitalWrite(in2A, HIGH);
//   digitalWrite(enablePin, HIGH);
//   delay(5000);
//   digitalWrite(enablePin, LOW);
//   delay(2000);
// }
