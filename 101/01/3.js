define(function(requires,exports,module){
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');

    var mainContext = Engine.createContext();

    var firstSurface = new Surface({
        content: 'hello world',
        properties: {
            color: 'white',
            textAlign: 'center',
            backgroundColor: '#FA5C4F'
        }
    });

    mainContext.add(firstSurface);

});