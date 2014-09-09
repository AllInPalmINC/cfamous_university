define(function (require, exports, module) {
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Easing = require('famous/transitions/Easing');

    var mainContext = Engine.createContext();

    var surface = new Surface({
        properties: {
            backgroundColor: '#FA5C4F'
        }
    });

    var stateModifier = new StateModifier({
        size: [200, 200],
        origin: [0.5, 0.5],
        align: [0.5, 0.5],
        // sets initial x- and y-scale to be 0
        transform: Transform.scale(0, 0, 1),
        // sets inital opacity to 0
        opacity: 0
    });

    mainContext.add(stateModifier).add(surface);

// animates x- and y-scale to 1
    stateModifier.setTransform(
        Transform.scale(1, 1, 1),
        { duration : 2000, curve: Easing.outBack }
    );

// animates opacity to 1
    stateModifier.setOpacity(1, {
        duration: 2000, curve: Easing.outBack
    });

})
