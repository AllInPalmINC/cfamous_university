define(function(requires,exports,module){
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');

    var mainContext = Engine.createContext();

    var firstSurface = new Surface({
        content: 'hello world'
    });

    firstSurface.setContent('<h1>HELLO WORLD</h1>');

    mainContext.add(firstSurface);
});