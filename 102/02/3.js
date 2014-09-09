define(function(requires,exports,module){
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var Easing = require('famous/transitions/Easing');

    var Transitionable = require('famous/transitions/Transitionable');
    var Modifier = require('famous/core/Modifier');

    var mainContext = Engine.createContext();

// creates new transitionable with initial value of 0
    var transitionable = new Transitionable(0);

    var surface = new Surface({
        properties: {
            backgroundColor: '#FA5C4F'
        }
    });

// modifiers allow us to specify functions for each property
// these functions are called once every tick
    var modifier = new Modifier({
        size: [200, 200],
        origin: [0.5, 0.5],
        align: [0.5, 0.5],
        transform: function() {
            // cache the value of transitionable.get()
            // to optimize for performance
            var scale = transitionable.get();
            return Transform.scale(scale, scale, 1);
        },
        opacity: function() {
            return transitionable.get();
        }
    });

    mainContext.add(modifier).add(surface);

// transitioning the transitionable from 0 to 1 with the
// transition definition
    transitionable.set(1, {
        duration: 2000, curve: Easing.outBack
    });

});