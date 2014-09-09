define(function(requires,exports,module){
    var Engine        = require("famous/core/Engine");
    var Surface       = require("famous/core/Surface");
    var Transform     = require("famous/core/Transform");
    var Modifier      = require("famous/core/Modifier");

    var MouseSync     = require("famous/inputs/MouseSync");
    var TouchSync     = require("famous/inputs/TouchSync");
    var ScrollSync    = require("famous/inputs/ScrollSync");
    var GenericSync   = require("famous/inputs/GenericSync");

// register any necessary Syncs globally by {SYNC_ID : SYNC_CLASS}
    GenericSync.register({
        "mouse"  : MouseSync,
        "touch"  : TouchSync,
        "scroll" : ScrollSync
    });

    var Transitionable = require("famous/transitions/Transitionable");
    var SnapTransition = require("famous/transitions/SnapTransition");
    Transitionable.registerMethod("spring", SnapTransition);

    var position = new Transitionable([0, 0]);

// create a sync from the registered SYNC_IDs
// here we define default options for `mouse` and `touch` while
// scrolling sensitivity is scaled down
    var sync = new GenericSync({
        "mouse"  : {},
        "touch"  : {},
        "scroll" : {scale : .5}
    });

    var surface = new Surface({
        size : [200, 200],
        properties : {background : 'red'}
    });

// now surface's events are piped to `MouseSync`, `TouchSync` and `ScrollSync`
    surface.pipe(sync);

    sync.on('update', function(data){
        var currentPosition = position.get();
        position.set([
            currentPosition[0] + data.delta[0],
            currentPosition[1] + data.delta[1]
        ]);
    });

    sync.on('end', function(data){
        var velocity = data.velocity;
        position.set([0, 0], {
            method : 'spring',
            period : 150,
            velocity : velocity
        });
    });

    var positionModifier = new Modifier({
        transform : function(){
            var currentPosition = position.get();
            return Transform.translate(currentPosition[0], currentPosition[1], 0);
        }
    });

    var centerModifier = new Modifier({origin : [0.5, 0.5]});

    var mainContext = Engine.createContext();
    mainContext.add(centerModifier).add(positionModifier).add(surface);
});