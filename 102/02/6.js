define(function(requires,exports,module){
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var Modifier = require('famous/core/Modifier');
    var Transitionable = require('famous/transitions/Transitionable');
    var Easing = require('famous/transitions/Easing');

    var mainContext = Engine.createContext();
    mainContext.setPerspective(1000);

// state variables
    var defaultAngle = -Math.PI/3;
    var size = [300, 400];
    var angle = new Transitionable(defaultAngle);
    var isToggled = false;

// create red card surface
    var surface = new Surface({
        size: size,
        content: 'Click Me',
        properties: {
            fontSize: '26px',
            paddingTop: '40px',
            color: 'white',
            textAlign: 'center',
            backgroundColor: '#FA5C4F',
            cursor: 'pointer'
        }
    });

// rotates red card surface and circle
    var rotationModifier = new Modifier({
        size: size,
        origin: [0.5, 0.5],
        align: [0.5, 0.5],
        transform: function() {
            return Transform.rotateY(angle.get());
        }
    });

    var mainNode = mainContext.add(rotationModifier);

    mainNode.add(surface);

    var circle = new Surface({
        size : [200, 200],
        properties : {
            backgroundColor: 'white',
            borderRadius: '100px',
            pointerEvents : 'none',
            zIndex: 1
        }
    });

// scales circle based on angle of rotation
    var circleScaleModifier = new Modifier({
        origin: [0.5, 0.5],
        align: [0.5, 0.5],
        transform: function() {
            var scale = Math.cos(angle.get());
            return Transform.scale(scale, scale, 1);
        }
    });

// positions circle above red card surface
    var circleLayerModifier = new Modifier({
        transform: Transform.translate(0, 0, 1)
    });

    mainNode.add(circleScaleModifier).add(circleLayerModifier).add(circle);

    surface.on('click', toggle);

// toggles angle
    function toggle() {
        var targetAngle = isToggled ? defaultAngle : -defaultAngle;

        // halts the transitionable transition if animation
        // is in progress
        if (angle.isActive()) angle.halt();

        angle.set(targetAngle, { duration: 2000, curve: 'easeInOut' });
        isToggled = !isToggled;
    }

});