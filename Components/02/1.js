define(function (require, exports, module) {
    var Engine = require("famous/core/Engine");
    var Surface = require("famous/core/Surface");
    var GridLayout = require("famous/views/GridLayout");

    var mainContext = Engine.createContext();

    var grid = new GridLayout();

    var surface = new Surface({
        content: "I am a Surface",
        size: [undefined, undefined],
        properties: {
            backgroundColor: "red",
            color: "#404040",
            textAlign: 'center'
        }
    });

    grid.sequenceFrom([surface]);

    mainContext.add(grid);
})
