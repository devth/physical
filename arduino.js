// Arduino
var five = require("johnny-five"),
    board = new five.Board(),
    // Leap motion
    webSocket = require('ws'),
    ws = new webSocket('ws://127.0.0.1:6437');

board.on("ready", function() {

  var enablePin = 11;
  this.pinMode(enablePin, five.Pin.PWM);
  // var enablePin = new five.Pin(11),
  var in1 = new five.Pin(4),
      in2 = new five.Pin(7),
      isForward = true;

  var forward = function() {
    in1.high();
    in2.low();
  };
  var backward = function() {
    in1.low();
    in2.high();
  };

  in1.high();
  in2.low();

  new five.Sensor("I0").scale(0, 255).on("change", function() {
    var val = this.value;
    var pinValue;
    if (val < 128) {
      forward();
      pinValue = (255 - (val * 2));
    } else {
      backward();
      pinValue = (val - 128) * 2;
    }

    console.log(this.value, pinValue);
    board.analogWrite(enablePin, pinValue);
  });

  var handleFrame = function(frame) {
    if (frame.hands && frame.hands.length > 0) {
      var hand = frame.hands[0],
          palmX = hand.palmPosition[0],
          min = -250,
          max = 250;
      if (palmX > min && palmX < max) {
        var pinValue;
        if (palmX < 0) {
          backward();
          pinValue = -palmX;
        } else {
          forward();
          pinValue = palmX;
        }
        console.log(pinValue);
        board.analogWrite(enablePin, pinValue);
      }
    }
  };

  ws.on('message', function(data, flags) {
    handleFrame(JSON.parse(data));
  });


  // board.loop(1000, function() {
    // if (isforward) {
    //   in1.low();
    //   in2.high();
    // } else {
    //   in1.high();
    //   in2.low();
    // }
    // isforward = !isforward;
  // });
});
