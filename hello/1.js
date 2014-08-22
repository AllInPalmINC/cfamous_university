define(function (require, exports, module) {

    var Engine        = require('famous/core/Engine');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Easing        = require('famous/transitions/Easing');
    var Lightbox      = require('famous/views/Lightbox');

    var mainContext = Engine.createContext();

    var device, lightbox;
    var slides = [];
    var index = 0;

    var lightboxOptions = {
        inOpacity: 1,
        outOpacity: 1,
        inTransform: Transform.translate(320,0, 0),
        outTransform: Transform.translate(-320, 0, 1),
        inTransition: { duration: 400, curve: Easing.outBack },
        outTransition: { duration: 150, curve: Easing.easeOut }
    };

    //createDevice();
    createSlides();
    createLightbox();

    /*function createDevice() {
     var deviceOptions = {
     type: 'iphone',
     height: window.innerHeight - 100
     };

     device = new DeviceView(deviceOptions);

     var deviceModifier = new StateModifier({
     size: device.getSize(),
     origin: [0.5, 0.5]
     });

     mainContext.add(deviceModifier).add(device);
     }
     */
    function createSlides() {
        var slideContent = [
            '<img src="http://launch.famo.us/fu-assets/hello/slide1.png" width="100%">',
            '<img src="http://launch.famo.us/fu-assets/hello/slide2.png" width="100%">',
            '<img src="http://launch.famo.us/fu-assets/hello/slide3.png" width="100%">'];

        var background = new Surface({
            properties: {
                backgroundColor: '#FA5C4F'
            }
        });

        mainContext.add(background);

        for (var i = 0; i < slideContent.length; i++) {
            var slide = new Surface({
                content: slideContent[i],
                properties: {
                    color: 'white',
                    lineHeight: '200%',
                    textAlign: 'center',
                    fontSize: '36px',
                    cursor: 'pointer'
                }
            });

            slide.on('click', showNextSlide);

            slides.push(slide);
        }
    }

    function createLightbox() {
        lightbox = new Lightbox(lightboxOptions);
        mainContext.add(lightbox);
        lightbox.show(slides[0]);
    }

    function showNextSlide() {
        index++;
        if(index >= slides.length) index = 0;
        lightbox.show(slides[index]);
    }


});