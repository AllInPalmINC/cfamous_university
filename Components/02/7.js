define(function(requires,exports,module){
    var Engine = require("famous/core/Engine");
    var Surface = require("famous/core/Surface");
    var GridLayout = require("famous/views/GridLayout");

    var mainContext = Engine.createContext();

    var grid = new GridLayout({
        dimensions: [4, 2],
        transition: {
            curve: 'easeInOut',
            duration: 2000
        }
    });

    var surfaces = [];
    grid.sequenceFrom(surfaces);

    for(var i = 0; i < 8; i++) {
        surfaces.push(new Surface({
            content: "panel " + (i + 1),
            size: [undefined, undefined],
            properties: {
                backgroundColor: "hsl(" + (i * 360 / 8) + ", 100%, 50%)",
                color: "#404040",
                lineHeight: '100px',
                textAlign: 'center'
            }
        }));
    }

    mainContext.add(grid);

// Switch the size
    var toggle = false;
    Engine.on('click', function() {
        if (toggle) {
            grid.setOptions({dimensions: [4, 2]});
        }
        else {
            grid.setOptions({dimensions: [2, 4]});
        }

        toggle = !toggle;
    });
});