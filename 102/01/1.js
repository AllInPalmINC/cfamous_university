define(function (require, exports, module) {
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var HeaderFooterLayout = require("famous/views/HeaderFooterLayout");
    var GridLayout = require("famous/views/GridLayout");
    var Modifier = require('famous/modifiers/StateModifier');
    var View = require('famous/core/View');


    var mainContext = Engine.createContext();

    var layout;

    createLayout();
    addHeader();
    addContent();
    addFooter();

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

    function addContent() {
        layout.content.add(createGrid( 'content', [2, 1] ));
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

    function createGrid( section, dimensions ) {
        var grid = new GridLayout({
            dimensions: dimensions
        });

        var views = [];
        grid.sequenceFrom(views);

        for(var i = 0; i < 8; i++) {
            var view = new View();

            var centerModifier = new Modifier({
                origin: [0.5, 0.5]
            });

            var surface = new Surface({
                content: section + ' ' + (i + 1),
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

        return grid;
    }

})
