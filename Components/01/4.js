define(function(requires,exports,module){
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var HeaderFooterLayout = require("famous/views/HeaderFooterLayout");
    var StateModifier=require("famous/modifiers/StateModifier");

    var mainContext = Engine.createContext();

    var layout = new HeaderFooterLayout({
        headerSize: 100,
        footerSize: 50
    });

    layout.header.add(new Surface({
        content: "Header",
        classes: ["red-bg"],
        properties: {
            textAlign: "center"
        }
    }));

    layout.content.add(new Surface({
        content: "Content",
        classes: ["grey-bg"],
        properties: {
            textAlign: "center"
        }
    }));

    layout.footer.add(new Surface({
        content: "Footer",
        classes: ["red-bg"],
        properties: {
            textAlign: "center"
        }
    }));

    var stateModifier = new StateModifier({
        size: [400, 400]
    });

    mainContext.add(stateModifier).add(layout);


});