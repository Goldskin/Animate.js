/*
MIT License

Copyright (c) 2017 Charles Strube

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

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
     * ease mod
     * @param  {string} ease    easename
     * @return {object} this
     */
    setEase: function (ease) {
        this.ease = ease;
        return this;
    },

    /**
     * set fps
     * @param  {integer} fps
     * @return {object} this
     */
    setFps: function (fps) {
        this.fps = fps;
        return this;
    },

    /**
     * calc based on speed
     * initial = 0, target = 400, speed = 400 will result to one second
     * @param  {integer} initial initial value
     * @param  {integer} target  destination value
     * @param  {integer} speed   units per second
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
        duration = duration || this.currentIntWithEase;
        return initial + ((target - initial) * duration);
    },

    /**
     * get current progresse
     * @param  {integer} delta delta
     * @return {integer}       current progress
     */
    getProgress: function () {
        return this.getDelta() / this.duration;
    },

    /**
     * get time since the beginning
     * @return {integer} time
     */
    getDelta: function () {
        return Date.now() - this.start;
    },

    /**
     * get epsilon (time since the last time)
     * @param  {integer} now current date
     * @return {interger}    time left
     */
    getEpsilon: function (now) {
        this.epsilon = now - this.then;
        return this.epsilon;
    },

    /**
     * check if is new frame
     * @return {boolean}
     */
    isNewFrame: function (now) {
        return this.getEpsilon(now) > this.interval;
    },

    /**
     * update then if the frame is complete
     * @param  {integer} now current date
     * @return {integer}     new date
     */
    updateFraming: function (now) {
        this.then = now - (this.epsilon % this.interval);
        return this.then;
    },

    /**
     * request animation frame with two callback
     * @param  {function} callback1 while animating
     * @param  {function} callback2 when is done
     * @return {void}
     */
    request: function (callback1, callback2) {

        // get callbacks
        this.callback1 = callback1;
        this.callback2 = callback2;

        // get initial start
        this.start     = Date.now();

        // get time for interval
        this.then      = Date.now();
        this.loop();
        return this;
    },

    /**
     * loop function
     * @return {void}
     */
    loop: function  () {

        // current
        var now = Date.now();

        // if last time > interval
        if (this.isNewFrame(now)) {

            // refresh time
            this.updateFraming(now);

            // ================= drawing =================
            // get progress with ease
            var progress            = this.getProgress();
            this.currentIntWithEase = easingEquations[this.ease](progress);

            // if progress is between 0 and 1
            if (progress < 1) {
                if (this.callback1) this.callback1(this.currentIntWithEase);
            }

            // animation is done
            else {
                if (this.callback2) this.callback2();
                this.start = 0;
                return this;
            }
        }
        requestAnimFrame(this.loop.bind(this));
    }

};

module.exports = Animate;
