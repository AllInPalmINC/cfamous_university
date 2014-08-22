define(function(requires,exports,module){
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Transform = require('famous/core/Transform');

    var mainContext = Engine.createContext();

    var translateModifierOne = new StateModifier({
        transform: Transform.translate(200, 0, 0)
    });

    var translateModifierTwo = new StateModifier({
        transform: Transform.translate(200, 0, 0)
    });

    var rotateModifierOne = new StateModifier({
        transform: Transform.rotateZ(Math.PI/4)
    });

    var rotateModifierTwo = new StateModifier({
        transform: Transform.rotateZ(Math.PI/4)
    });

    var redSurface = new Surface({
        size: [100, 100],
        classes: ['red-bg']
    });

    var greySurface = new Surface({
        size: [100, 100],
        classes: ['grey-bg']
    });

    mainContext
        .add(translateModifierOne)
        .add(rotateModifierOne)
        .add(redSurface);

    mainContext
        .add(rotateModifierTwo)
        .add(translateModifierTwo)
        .add(greySurface);
});