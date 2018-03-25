# Anime-js

```Js
require('./Animate.js');

var initial = 0;    // initial value
var target  = 100;  // target value

var myAnimation = new Animate();

myAnimation
    .request(function () {
        console.log(myAnimation.interpolation(initial, target)); // animation
    }, function () {
        console.log('done'); // callback
    });
```

```Js
require('./Animate.js');

var initial  = Window.scrollY;  // initial value
var target   = 2400;            // target value
var easing   = 'bounce';        // easing style
var fps      = 60;              // frames per second
var duration = 500;             // duration in ms


var myAnimation = new Animate();

myAnimation
    .setDuration(duration)  // 500 ms (optionnal)
    .setEase(easing)        // easing style (optionnal)
    .setFps(fps)            // frames per second (optionnal)
    .request(function () {
        window.scrollTo(0, myAnimation.interpolation(initial, target)); // animation
    });
```
