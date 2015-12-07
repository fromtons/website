/**
 * RENDERER CONTROLLER
 *
 * This is the main manager of the canvas *
 * Launches PIXI, manage the assets, etc. *
 *  
 * @param wrapperId
 * @constructor
 */
var RendererController = function () {
    // Launch PIXI
    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { view: document.getElementById(wrapperId), resolution: 2 }, false, true);

    // Set the state to idle by default
    this.setState('idle');
    
    // ASSETS MANAGEMENT
    var scope = this;
    global.assetsLoader = new PIXI.AssetLoader([
        // "img/ball.png",       
    ]).on('onComplete', function() {
        requestAnimationFrame(scope.update.bind(scope));
    });
    global.assetsLoader.load();
};

/**
 * Allows to change the current state of the canvas *
 * @param state
 */
RendererController.prototype.setState = function(state) {
    if(this.state) this.state.onDestroy();

    switch (state) {
        case 'idle':
        default:
            this.state = new IdleController();
            break;
    }
    
};

/**
 * Main loop, calling the current state update function *
 */
RendererController.prototype.update = function () {
    this.state.update();
    
    this.renderer.render(this.state.stage);
    requestAnimationFrame(this.update.bind(this));
}