/* Magic Mirror
 * Node Helper: Buttons
 *
 * By ASCIIcat, Patrice Godard & Joseph Bethge
 * MIT Licensed.
 */

const connect = require('raspi-cap').connect;
const connectionPromise = connect({ resetPin: 0 });

const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
    // Subclass start method.
    start: function() {
        var self = this;
        console.log("Starting node helper for: " + self.name);

        this.loaded = false;
    },

    // Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
      console.log(notification);
        if (notification === 'BUTTON_CONFIG') {
            this.config = payload.config;

            this.intializeButtons();
        };
    },

    //init and setup touch event handlers
    intializeButtons: function() {
        console.log("intializeButtons");

        const self = this;

        if (self.loaded) {
            return;
        }

        self.buttons = self.config.buttons;

        for (var i = 0; i < self.buttons.length; i++) {
            console.log("Initialize button " + self.buttons[i].name + " on PIN " + self.buttons[i].pin);
            self.buttons[i].pressed = undefined;
        }

        self.loaded = true;

        // When it's ready, add a listener that emits
        // when a touch is registered
        console.log("Begin listening for button press.");
        connectionPromise.then(cap1188 => {
          console.log("Promise ready.");
          cap1188.on("change", function(evt) {
            // console.log(evt);
          });

          // listen for touch events
          cap1188.on("touch", function(pin) {
            console.log("pin touched: ", pin);
            // console.log(self.buttons[pin]);

            self.buttons[pin].pressed = new Date().getTime();
            self.sendSocketNotification("BUTTON_DOWN", {
     		         index: pin
              });
          });

          // listen for release events
          cap1188.on("release", function(pin) {
            console.log("pin released: ", pin);
            // console.log(self.buttons[pin]);
            var start = self.buttons[pin].pressed;
            var end = new Date().getTime();
            var time = end - start;

            self.buttons[pin].pressed = undefined;
            self.sendSocketNotification("BUTTON_UP", {
                index: pin,
                duration: time
            });
          });

          // cap1188.on(2, function(touched) {
          //   console.log("pin 2 is: ", touched ? "touched" : "released");
          // });

          cap1188.on("reset", function() {
            console.log("reset");
          });

          // cap1188.reset();
        }, console.error);

     }
});
