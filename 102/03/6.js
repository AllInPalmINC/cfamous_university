define(function(requires,exports,module){
    var Engine     = require("famous/core/Engine");
    var Surface    = require("famous/core/Surface");
    var Transform  = require("famous/core/Transform");
    var Modifier   = require("famous/core/Modifier");

    var Transitionable = require("famous/transitions/Transitionable");
    var SnapTransition = require("famous/transitions/SnapTransition");
    Transitionable.registerMethod("snap", SnapTransition);

    var GenericSync = require("famous/inputs/GenericSync");
    var MouseSync   = require("famous/inputs/MouseSync");
    var TouchSync   = require("famous/inputs/TouchSync");

// register sync classes globally for later use in GenericSync
    GenericSync.register({
        "mouse" : MouseSync,
        "touch" : TouchSync
    });

// lesson default parameters
    var DISPLACEMENT_LIMIT = 100;
    var DISPLACEMENT_PEEK = 50;
    var DISPLACEMENT_THRESHOLD = 50;
    var VELOCITY_THRESHOLD = 0.2;
    var SURFACE_SIZE = [undefined, 100];

    var position = new Transitionable(0);

// funnel both mouse and touch input into a GenericSync
// and only read from the x-displacement
    var sync = new GenericSync(
        ["mouse", "touch"],
        {direction : GenericSync.DIRECTION_Y}
    );

    var background = new Surface({
        size : SURFACE_SIZE,
        properties : {background : '#404040'}
    });

    var draggableSurface = new Surface({
        size : SURFACE_SIZE,
        properties : {background : '#FA5c4F'}
    });

    var textSurface = new Surface({
        size : SURFACE_SIZE,
        content : '↑',
        properties : {
            color: '#404040',
            fontSize : '60px',
            lineHeight : SURFACE_SIZE[1] + 'px',
            textAlign : 'center',
            pointerEvents : 'none'
        }
    });

    draggableSurface.pipe(sync);

    sync.on('update', function(data){
        var currentPosition = position.get();
        var delta = data.delta;

        if (currentPosition + delta < DISPLACEMENT_LIMIT) {
            // move right until past the edge
            position.set(currentPosition + delta);
        }
        else{
            // otherwise, clamp at edge
            position.set(DISPLACEMENT_LIMIT);
        }

        if (currentPosition + delta < -DISPLACEMENT_PEEK) position.set(-DISPLACEMENT_PEEK);
    });

    sync.on('end', function(data){
        var currentPosition = position.get();
        var velocity = data.velocity;

        if (currentPosition > DISPLACEMENT_THRESHOLD || velocity > VELOCITY_THRESHOLD) {
            // transition right if the displacement, or velocity is above
            // the appropriate threshold
            position.set(DISPLACEMENT_LIMIT, {
                method   : 'snap',
                period   : 200,
                velocity : velocity
            });
        }
        else {
            // otherwise transition back to 0
            position.set(0, {
                method   : 'snap',
                period   : 200,
                velocity : velocity
            });
        }
    });

    var positionModifier = new Modifier({
        transform : function(){
            return Transform.translate(0,position.get(),0);
        }
    });

    var rotationModifier = new Modifier({
        size: SURFACE_SIZE,
        origin: [0.5, 0.5],
        align: [0.5, 0.5],
        transform : function(){
            var angle = Math.PI * (position.get() / DISPLACEMENT_LIMIT);
            return Transform.rotateZ(angle);
        }
    });

    var centerModifier = new Modifier({
        size: SURFACE_SIZE,
        origin : [0.5,0],
        align: [0.5, 0]
    });

// define the scene graphq1
    var mainContext = Engine.createContext();
// var centerNode = mainContext.add(centerModifier);
// centerNode.add(background);
    mainContext.add(background);

    var moveableNode = mainContext.add(positionModifier);
    moveableNode.add(draggableSurface);
    moveableNode.add(centerModifier).add(rotationModifier).add(textSurface);
});