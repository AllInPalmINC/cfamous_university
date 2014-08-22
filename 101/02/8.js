define(function(requires,exports,module){
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var mainContext = Engine.createContext();

    var surface = new Surface({
        size: [100, 100],
        properties: {
            color: 'white',
            backgroundColor: '#FA5C4F'
        }
    });

    var modifier = new StateModifier({
        align: [0.5, 0.5],
        // apply an origin below
        // origin:
        transform: Transform.rotateZ(Math.PI/6)
    });

    mainContext.add(modifier).add(surface);
});