define(function (require, exports, module) {

    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');

    var mainContext = Engine.createContext();

    var firstSurface = new Surface({
        size: [200,undefined],
        content: 'Famo.us中文社区',
        properties: {
            color: 'white',
            textAlign: 'center',
            backgroundColor: '#FA5C4F',
            fontSize:'40px',
            borderRadius:'15px'
        }
    });

    mainContext.add(firstSurface);
});