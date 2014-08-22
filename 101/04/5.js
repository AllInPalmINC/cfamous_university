define(function(requires,exports,module){
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var StateModifier = require('famous/modifiers/StateModifier');
    var EventHandler = require('famous/core/EventHandler');

    var mainContext = Engine.createContext();

    var surfaceA, surfaceB;
    createSurfaces();

    var eventHandlerA = new EventHandler();
    var eventHandlerB = new EventHandler();

    surfaceA.on('click', function() {
        eventHandlerA.emit('hello');
        surfaceA.setContent('said hello');
    });

    eventHandlerB.subscribe(eventHandlerA);

    eventHandlerB.on('hello', function() {
        surfaceB.setContent('heard hello');
    });

    function createSurfaces() {
        surfaceA = new Surface({
            size: [100, 100],
            content: 'A<br>click me to say hello',
            properties: {
                color: 'white',
                textAlign: 'center',
                backgroundColor: '#FA5C4F'
            }
        });

        surfaceB = new Surface({
            size: [100, 100],
            content: 'B',
            properties: {
                color: 'white',
                textAlign: 'center',
                backgroundColor: '#FA5C4F'
            }
        });

        var modifierB = new StateModifier({
            origin: [1, 1]
        });

        mainContext.add(surfaceA);
        mainContext.add(modifierB).add(surfaceB);
    }
});