define(function(requires,exports,module){
    var Engine = require('famous/core/Engine');
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var mainContext = Engine.createContext();

    var viewSize = [undefined, 400];

// adding a view
    var view = new View();

    var bottomModifier = new StateModifier({
        origin: [0, 1]
    });

    mainContext.add(bottomModifier).add(view);

// creating a reference node in the view with size
    var sizeModifier = new StateModifier({
        size: viewSize
    });

    var sizeNode = view.add(sizeModifier);

// creating a background surface in the view
    var background = new Surface({
        classes: ['grey-bg']
    });

    var backModifier = new StateModifier({
        // positions the background behind the tab surface
        transform: Transform.behind
    });

// adding to reference node to get parent size
    sizeNode.add(backModifier).add(background);

// create a tab on the left
    var tab = new Surface({
        content: 'Feedback',
        size: [150, 50],
        classes: ['red-bg'],
        properties: {
            fontSize: '1.5em',
            lineHeight: '50px',
            textAlign: 'center'
        }
    });

    var tabOriginModifier = new StateModifier({
        origin: [0, 0.5]
    });

    sizeNode.add(tabOriginModifier).add(tab);
});