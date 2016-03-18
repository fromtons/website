/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var app = {
            stage: null,
            animating: false,
            fromtons: [],
            renderer: null,
            canvas: document.getElementById("fromtons-particles"),

            init: function() {
                this.bindUIActions();
                this.registerCanvas();

                $(window).on('resize', this.registerCanvas.bind(this));
            },

            registerCanvas: function() {
                // create an new instance of a pixi stage
                if(!this.stage) this.stage = new PIXI.Stage(0x66FF99);
                else for (var i = this.stage.children.length - 1; i >= 0; i--) {	this.stage.removeChild(this.stage.children[i]);};
                this.renderer = PIXI.autoDetectRenderer(this.canvas.clientWidth, this.canvas.clientHeight, { view: this.canvas, resolution: 2, transparent: true }, false, true);
                if(!this.animating) requestAnimationFrame( animate.bind(this) );

                this.fromtons = [];

                var nbOfParticles;
                if(window.innerWidth > 1024) nbOfParticles = 60;
                else if(window.innerWidth > 640) nbOfParticles = 40;
                else nbOfParticles = 20;

                for(var i = 1; i <= nbOfParticles; i++) {
                    // create a new Sprite using the texture
                    var fromton = new PIXI.Sprite.fromImage('../assets/images/fromtons/'+(i%20)+'.png');

                    // center the sprites anchor point
                    fromton.anchor.x = 0.5;
                    fromton.anchor.y = 0.5;

                    fromton.scale.x = 0.2;
                    fromton.scale.y = 0.2;

                    // move the sprite t the center of the screen
                    fromton.position.x = Math.floor(Math.random()*this.renderer.width/2);
                    fromton.position.y = Math.floor(Math.random()*this.renderer.height/2);

                    fromton.rotation = Math.random()*Math.PI;

                    fromton.velocity = {
                        x: (Math.random()*2-1)*0.5,
                        y: (Math.random()*2-1)*0.5,
                        rotation: (Math.random()*2-1)*0.01
                    };

                    this.stage.addChild(fromton);
                    this.fromtons.push(fromton);
                }

                function animate() {
                    this.animating=true;
                    requestAnimationFrame( animate.bind(this) );
                    var fromton;
                    for(var i = 0; i < this.fromtons.length; i++) {
                        fromton = this.fromtons[i];

                        fromton.rotation += fromton.velocity.rotation;
                        fromton.position.x+=fromton.velocity.x;
                        fromton.position.y+=fromton.velocity.y;

                        if(fromton.position.x < -100) fromton.position.x = this.renderer.width/this.renderer.resolution+100;
                        if(fromton.position.x > this.renderer.width/this.renderer.resolution+100) fromton.position.x = -100;
                        if(fromton.position.y < -100) fromton.position.y = this.renderer.height/this.renderer.resolution+100;
                        if(fromton.position.y > this.renderer.height/this.renderer.resolution+100) fromton.position.y = -100;
                    }

                    // render the stage
                    this.renderer.render(this.stage);
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
