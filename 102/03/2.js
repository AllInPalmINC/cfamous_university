define(function (require, exports, module) {
    var Engine         = require("famous/core/Engine");
    var Surface        = require("famous/core/Surface");
    var Transform      = require("famous/core/Transform");
    var Modifier       = require("famous/core/Modifier");
    var MouseSync      = require("famous/inputs/MouseSync");
    var Transitionable = require("famous/transitions/Transitionable");

// define the position state with a Transitionable
// position.get() returns the current position state
    var position = new Transitionable([0,0]);
    var sync = new MouseSync();

    var surface = new Surface({
        size : [200,200],
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

    sync.on('end', function(){
        // transition the position back to [0,0] with a bounce
        position.set([0,0], {curve : 'easeOutBounce', duration : 300});
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

})
