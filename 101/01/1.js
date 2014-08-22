define(function (require, exports, module) {

    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');

    var mainContext = Engine.createContext();

    var firstSurface = new Surface({
        content: 'hello world'
    });

    mainContext.add(firstSurface);
});