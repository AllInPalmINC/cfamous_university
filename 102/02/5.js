define(function(requires,exports,module){
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var Transitionable = require('famous/transitions/Transitionable');
    var Easing = require('famous/transitions/Easing');

// App parameters
    var HEIGHT = 75;
    var WIDTH = 150;
    var TRANSITION = { duration: 700, curve: Easing.outBounce };

// Storing toggle state
    var state = new Transitionable(0);
    var isToggled = false;

// Create context
    var mainContext = Engine.createContext();

// Modifier to center renderables
    var centerModifier = new Modifier({
        size: [WIDTH, HEIGHT],
        align: [0.5, 0.5],
        origin: [0.5, 0.5]
    });

    var mainNode = mainContext.add(centerModifier);


// Create renderables
    var greenBackground = new Surface({
        size: [WIDTH, HEIGHT],
        properties: {
            backgroundColor: 'limegreen',
            border: '1px solid gray',
            borderRadius: HEIGHT + 'px'
        }
    });

    var redBackground = new Surface({
        size: [WIDTH, HEIGHT],
        properties: {
            backgroundColor: '#FA5C4F',
            border: '1px solid gray',
            borderRadius: HEIGHT + 'px'
        }
    });

    var toggleSwitch = new Surface({
        size: [HEIGHT, HEIGHT],
        content: 'click',
        properties: {
            textAlign: 'center',
            lineHeight: HEIGHT + 'px',
            backgroundColor: '#EEE',
            border: '1px solid gray',
            borderRadius: HEIGHT + 'px',
            cursor: 'pointer',
            zIndex: 1
        }
    });

// Create modifiers to crossfade background color between
// red and green on toggle and move the toggle button
    var greenModifier = new Modifier({
        // toggle between 0 and 1
        opacity: function() {
            return state.get();
        }
    });

    var redModifier = new Modifier({
        // toggle between 1 and 0
        opacity: function() {
            return 1 - state.get();
        }
    });

    var toggleModifier = new Modifier({
        // toggle between 0 and right x-position
        transform: function() {
            var xPos = state.get() * (WIDTH - HEIGHT);
            return Transform.translate(xPos, 0, 0);
        }
    });

// Add modifiers and renderales to context
    mainNode.add(greenModifier).add(greenBackground);
    mainNode.add(redModifier).add(redBackground);
    mainNode.add(toggleModifier).add(toggleSwitch);


// Listen for click event and toggle state
    toggleSwitch.on('click', toggleState);

// Toggle state between 0 and 1
    function toggleState() {
        // Halts current animation if active
        if(state.isActive()) state.halt();
        // Sets end transition state
        if(isToggled) state.set(0, TRANSITION);
        else state.set(1, TRANSITION);

        isToggled = !isToggled;
    }
});