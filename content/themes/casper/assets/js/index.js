/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var app = {
            canvas: document.getElementById("fromtons-particles"),

            init: function() {
                this.bindUIActions();

                console.dir(this.canvas);

                this.registerCanvas();
            },

            registerCanvas: function() {
                // create an new instance of a pixi stage
                var stage = new PIXI.Stage(0x66FF99);

                var renderer = PIXI.autoDetectRenderer(this.canvas.clientWidth, this.canvas.clientHeight, { view: this.canvas, resolution: 2, transparent: true }, false, true);

                requestAnimationFrame( animate ); 

                var fromtons = [];
                for(var i = 0; i < 40; i++) { 
                    // create a new Sprite using the texture
                    var fromton = new PIXI.Sprite.fromImage('../assets/images/fromtons/'+Math.floor(Math.random()*4+1)+'.png');

                    // center the sprites anchor point
                    fromton.anchor.x = 0.5;
                    fromton.anchor.y = 0.5;

                    fromton.scale.x = 0.2;
                    fromton.scale.y = 0.2;

                    console.log(renderer);
                 
                    // move the sprite t the center of the screen
                    fromton.position.x = Math.floor(Math.random()*renderer.width/2);
                    fromton.position.y = Math.floor(Math.random()*renderer.height/2);

                    fromton.rotation = Math.random()*Math.PI;

                    fromton.velocity = {
                        x: (Math.random()*2-1)*0.5,
                        y: (Math.random()*2-1)*0.5,
                        rotation: (Math.random()*2-1)*0.01
                    };
                 
                    stage.addChild(fromton);
                    fromtons.push(fromton);
                }

                function animate() {
             
                    requestAnimationFrame( animate );
                    var fromton;
                    for(var i = 0; i < fromtons.length; i++) {
                        fromton = fromtons[i];

                        fromton.rotation += fromton.velocity.rotation;
                        fromton.position.x+=fromton.velocity.x;
                        fromton.position.y+=fromton.velocity.y;

                        if(fromton.position.x < -100) fromton.position.x = renderer.width/renderer.resolution+100;
                        if(fromton.position.x > renderer.width/renderer.resolution+100) fromton.position.x = -100;
                        if(fromton.position.y < -100) fromton.position.y = renderer.height/renderer.resolution+100;
                        if(fromton.position.y > renderer.height/renderer.resolution+100) fromton.position.y = -100;                 
                    }

                    // render the stage   
                    renderer.render(stage);
                }
            },

            bindUIActions: function() {
                this.registerCasper();
            },

            registerCasper: function() {
                var $postContent = $(".post-content");
                $postContent.fitVids();

                $(".scroll-down").arctic_scroll();

                /*$(".menu-button, .nav-cover, .nav-close").on("click", function(e){
                    e.preventDefault();
                    $("body").toggleClass("nav-opened nav-closed");
                });*/
            }
        };

        app.init();
    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };
})(jQuery);
