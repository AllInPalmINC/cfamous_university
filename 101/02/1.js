define(function(requires,exports,module){
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');

    var mainContext = Engine.createContext();

    var firstSurface = new Surface({
        size: [100, 100],
        properties: {
            backgroundColor: '#FA5C4F'
        }
    });

    mainContext.add(firstSurface);
});