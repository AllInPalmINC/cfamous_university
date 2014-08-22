define(function(requires,exports,module){
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');

    var mainContext = Engine.createContext();

    var surface = new Surface({
        size: [undefined, 100],
        content: 'click me',
        properties: {
            color: 'white',
            textAlign: 'center',
            backgroundColor: '#FA5C4F'
        }
    });

    mainContext.add(surface);

    surface.on('click', function() {
        surface.setProperties({
            backgroundColor: '#878785'
        });
    });
});