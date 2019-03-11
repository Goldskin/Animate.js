# Anime-js

```Js
require('./Animate.js');

const initial = 0;    // initial value
const target  = 100;  // target value

const myAnimation = new Animate();

myAnimation.request(function () {
    console.log(myAnimation.interpolation(initial, target)); // animation
});
```

```Js
require('./Animate.js');

const initial  = Window.scrollY;  // initial value
const target   = 2400;            // target value
const easing   = 'bounce';        // easing style
const fps      = 60;              // frames per second
const duration = 500;             // duration in ms


const myAnimation = new Animate();

myAnimation
    .setDuration(duration)  // 500 ms (optionnal)
    .setEase(easing)        // easing style (optionnal)
    .setFps(fps)            // frames per second (optionnal)
    .request(() => {
        window.scrollTo(0, myAnimation.interpolation(initial, target)); // animation
    })
    .callback(() => console.log('over'));
```
