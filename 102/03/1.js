define(function (require, exports, module) {
    var Engine     = require("famous/core/Engine");
    var Surface    = require("famous/core/Surface");
    var Transform  = require("famous/core/Transform");
    var Modifier   = require("famous/core/Modifier");
    var MouseSync  = require("famous/inputs/MouseSync");

// the position state
    var position = [0, 0];

// create a Sync to listen to mouse events
    var sync = new MouseSync();

    var surface = new Surface({
        size : [200, 200],
        properties : {background : 'red'}
    });

// Surface provides events that the sync listens to
    surface.pipe(sync);

// Syncs have `start`, `update` and `end` events.
// On `update` we increment the position state of the surface based
// on the change in x- and y- displacements
    sync.on('update', function(data){
        position[0] += data.delta[0];
        position[1] += data.delta[1];
    });

// this modifier reads from the position state to create a translation
// Transform that is applied to the surface
    var positionModifier = new Modifier({
        transform : function(){
            return Transform.translate(position[0], position[1], 0);
        }
    });

// a modifier that centers the surface
    var centerModifier = new Modifier({origin : [0.5, 0.5]});

// define the scene graph
    var mainContext = Engine.createContext();
    mainContext
        .add(centerModifier)
        .add(positionModifier)
        .add(surface);
})
