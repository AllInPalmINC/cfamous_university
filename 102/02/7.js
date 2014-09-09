define(function(requires,exports,module){
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var Modifier = require('famous/core/Modifier');

    var mainContext = Engine.createContext();

    var surface = new Surface({
        size: [100, 100],
        properties: {
            backgroundColor: '#FA5C4F'
        }
    });

    var modifier = new Modifier({
        origin: [0.5,0.5],
        align: [0.5,0.5],
    });

    mainContext.add(modifier).add(surface);

// assigns the transform property of the modifier
// as the argument of .transformFrom()
    modifier.transformFrom(rotate);

    var angle = 0;
    function rotate() {
        angle += 0.01;
        return Transform.rotateZ(angle);
    }
});