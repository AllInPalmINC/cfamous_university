define(function (require, exports, module) {
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var HeaderFooterLayout = require("famous/views/HeaderFooterLayout");

    var mainContext = Engine.createContext();

    var layout = new HeaderFooterLayout({
        headerSize: 100,
        footerSize: 50
    });

    layout.header.add(new Surface({
        content: "Header",
        classes: ["red-bg"],
        properties: {
            lineHeight: "100px",
            textAlign: "center"
        }
    }));

    layout.content.add(new Surface({
        content: "Content",
        classes: ["grey-bg"],
        properties: {
            lineHeight: '400px',
            textAlign: "center"
        }
    }));

    layout.footer.add(new Surface({
        content: "Footer",
        classes: ["red-bg"],
        properties: {
            lineHeight: "50px",
            textAlign: "center"
        }
    }));

    mainContext.add(layout);
})
