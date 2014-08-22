define(function (require, exports, module) {

    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Easing = require('famous/transitions/Easing');

    var mainContext = Engine.createContext();

    var surface = new Surface({
        size: [100, 100],
        content: 'click me to halt',
        properties: {
            color: 'white',
            textAlign: 'center',
            backgroundColor: '#FA5C4F'
        }
    });

    var stateModifier = new StateModifier({
        origin: [0.5, 0]
    });

    mainContext.add(stateModifier).add(surface);

    stateModifier.setTransform(
        Transform.translate(0, 300, 0),
        { duration : 8000, curve: 'linear' }
    );

    surface.on('click', function() {
        stateModifier.halt();
        surface.setContent('halted');
    });
});