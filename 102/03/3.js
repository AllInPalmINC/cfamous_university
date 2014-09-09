define(function(requires,exports,module){
    var Engine      = require("famous/core/Engine");
    var Surface     = require("famous/core/Surface");
    var Transform   = require("famous/core/Transform");
    var Modifier    = require("famous/core/Modifier");
    var MouseSync   = require("famous/inputs/MouseSync");

    var Transitionable = require("famous/transitions/Transitionable");
    var SnapTransition = require("famous/transitions/SnapTransition");
    Transitionable.registerMethod("spring", SnapTransition);

    var position = new Transitionable([0, 0]);
    var sync = new MouseSync();

    var surface = new Surface({
        size : [200, 200],
        properties : {background : 'red'}
    });

    surface.pipe(sync);

    sync.on('update', function(data){
        var currentPosition = position.get();
        position.set([
            currentPosition[0] + data.delta[0],
            currentPosition[1] + data.delta[1]
        ]);
    });

    sync.on('end', function(data){
        // bounce-back to [0,0], but this time, taking into account the
        // user's velocity
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