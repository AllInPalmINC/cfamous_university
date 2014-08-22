define(function(requires,exports,module){
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var mainContext = Engine.createContext();

    createSurface();
    createModifiedSurface();

    function createSurface() {
        var surface = new Surface({
            size: [100, 100],
            content: 'surface',
            properties: {
                color: 'white',
                textAlign: 'center',
                backgroundColor: '#FA5C4F'
            }
        });

        mainContext.add(surface);
    }

    function createModifiedSurface() {
        var modifiedSurface = new Surface({
            size: [100, 100],
            content: 'modified surface',
            properties: {
                color: 'white',
                textAlign: 'center',
                backgroundColor: '#FA5C4F'
            }
        });

        var stateModifier = new StateModifier({
            transform: Transform.translate(150, 100, 0)
        });

        mainContext.add(stateModifier).add(modifiedSurface);
    }

});