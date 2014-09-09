define(function(requires,exports,module){
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var Transitionable = require('famous/transitions/Transitionable');

    var mainContext = Engine.createContext();

// creating a transitionable with an array value
// to store the align and origin state
    var alignOrigin = new Transitionable([0, 0]);

    var surface = new Surface({
        size: [undefined, 100],
        properties: {
            backgroundColor: '#FA5C4F'
        }
    });

    var modifier = new Modifier({
        align: function() {
            // Transition align from [0, 0] and [0, 1]
            return alignOrigin.get();
        },
        origin: function() {
            // Transition origin from [0, 0] and [0, 1]
            return alignOrigin.get();
        }
    });

    mainContext.add(modifier).add(surface);

// transitioning the alignOrigin state
    alignOrigin.set([0, 1], {
        duration: 1000,
        curve: 'easeInOut'
    });


});