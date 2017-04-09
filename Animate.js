var easingEquations = require('./easing.js');

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

/**
 * animate, can animate any integer
 */
var Animate = function () {
    this.duration = 400;
    this.fps      = 60;
    this.interval = 1000/this.fps;
    this.ease     = 'easeInOutCubic';
};

Animate.prototype = {

    /**
     * easy mod
     * @param  {string} ease    easename
     * @return {object} this
     */
    setEase: function (ease) {
        this.ease = ease;
        return this;
    },

    /**
     * calc based on speed
     * initial = 0, target = 400, speed = 400 will result to one second
     * @param  {integer} initial initial value
     * @param  {integer} target  destination value
     * @param  {integer} speed   destination value
     * @return {object} this
     */
    setSpeed: function (initial, target, speed) {
        this.duration = Math.max(0.1, Math.min(Math.abs(initial - target) / speed, 0.8));
        return this;
    },

    /**
     * set custom duration
     * @return {object} this
     */
    setDuration: function (duration) {
        this.duration = duration;
        return this;
    },

    /**
     * get correct value for current interpolation
     * @param  {integer} initial initial
     * @param  {integer} target  target
     * @param  {integer} duration       animation duration left
     * @return {integer}         current
     */
    interpolation: function (initial, target, duration) {
        duration = duration || this.currentInt;
        return initial + ((target - initial) * duration);
    },

    /**
     * request animation frame with two callback
     * @param  {function} callback1 while animating
     * @param  {function} callback2 when is done
     * @return {void}
     */
    request: function (callback1, callback2) {
        this.callback1 = callback1;
        this.callback2 = callback2;
        this.start     = Date.now();
        this.loop();
        return this;
    },

    /**
     * loop function
     * @return {void}
     */
    loop: function  () {
        var delta       = this.getDelta();
        var progress    = this.getProgress(delta);
        this.currentInt = easingEquations[this.ease](progress);
        if (progress < 1 && delta > this.interval) {
            this.callback1(this.currentInt);
            requestAnimFrame(this.loop.bind(this));
        } else if (progress < 1 && delta < this.interval) {
            requestAnimFrame(this.loop.bind(this));
        } else {
            if (this.callback2) {
                this.callback2();
                this.start = 0;
            }
        }
    },

    /**
     * get current progresse
     * @param  {integer} delta delta
     * @return {integer}       current progress
     */
    getProgress: function (delta) {
        return delta / this.duration;
    },

    /**
     * get time since the beginning
     * @return {integer} time
     */
    getDelta: function () {
        return Date.now() - this.start;
    },

};

module.exports = Animate;
