# Anime-js

```Js
require('./Animate.js');

var initial = 0; // initial value
var target = 2400; // target value
var easing = 'bounce'; // easing style
var duration = 500; // duration in ms


var myAnimation = new Animate();

myAnimation
    .setDuration(duration) // 500 ms (optionnal)
    .setEase(easing) // easing style (optionnal)
    .request(function () {
        window.scrollTo(0, myAnimation.interpolation(initial, target)); // animation
    }, function () {
        window.scrollTo(0, scrollTargetY); // callback when its done
    });
