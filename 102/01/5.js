define(function(requires,exports,module){
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
    var View = require('famous/core/View');
    var GridLayout = require("famous/views/GridLayout");
    var Modifier = require('famous/modifiers/StateModifier');

    var mainContext = Engine.createContext();

    var layout;

    createLayout();
    addHeader();
    addFooter();
    addContent();

    function createLayout() {
        layout = new HeaderFooterLayout({
            headerSize: 100,
            footerSize: 50
        });

        mainContext.add(layout);
    }

    function addHeader() {
        layout.header.add(new Surface({
            content: "Header",
            classes: ["grey-bg"],
            properties: {
                lineHeight: "100px",
                textAlign: "center"
            }
        }));
    }

    function addFooter() {
        layout.footer.add(new Surface({
            content: "Footer",
            classes: ["grey-bg"],
            properties: {
                lineHeight: "50px",
                textAlign: "center"
            }
        }));
    }

    function addContent() {
        var grid = new GridLayout({
            dimensions: [2, 1]
        });

        var views = [];
        grid.sequenceFrom(views);

        for(var i = 0; i < 2; i++) {
            var view = new View();

            var centerModifier = new Modifier({
                origin: [0.5, 0.5]
            });

            var surface = new Surface({
                content: 'content' + (i + 1),
                size: [100, 100],
                classes: ['red-bg'],
                properties: {
                    color: 'white',
                    textAlign: 'center',
                    lineHeight: '100px'
                }
            });

            view.add(centerModifier).add(surface);

            views.push(view);
        }

        layout.content.add(grid);
    }
});