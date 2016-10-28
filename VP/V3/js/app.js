
var settings = {
    NumberOfReels: 5,
    ReelBackgroundId: "reelBackgroundGrad",
    ReelSeperatorBackgroundId: "reelSeperatorBackground",
    NumberOfVisibleFruitsPerReel : 3,
    ReelSeperatorWith: 10,
    AvailableFruits : [
        new Fruit(0, 1000000 / 5),
        new Fruit(1, 1000000 / 5),
        new Fruit(2, 1000000 / 5),
        new Fruit(3, 1000000 / 5),
        new Fruit(4, 1000000 / 5)
    ]
}

var reelsContainerElement = document.getElementById('reelsContainer');

var reelsSizeElement = document.getElementById('borderInline');

var newReelsContainer = new ReelsContainer(settings, reelsContainerElement, reelsSizeElement);


var spinParams1 = {
    EaseInDurationMilliseconds: 0,
    SpinDurationMilliseconds: 1860,
    MaxVelocity: 1.2,

    AccelForcePerMillisecond: 0.0075,
    DecelForce: 0.5
}

var spinParams2 = {
    EaseInDurationMilliseconds: 168,
    SpinDurationMilliseconds: 2160,
    MaxVelocity: 1.2,

    AccelForcePerMillisecond: 0.0075,
    DecelForce: 0.5
}

var spinParams3 = {
    EaseInDurationMilliseconds: 252,
    SpinDurationMilliseconds: 2640,
    MaxVelocity: 1.2,

    AccelForcePerMillisecond: 0.0075,
    DecelForce: 0.5
}

var spinParams4 = {
    EaseInDurationMilliseconds: 336,
    SpinDurationMilliseconds: 3120,
    MaxVelocity: 1.2,

    AccelForcePerMillisecond: 0.0075,
    DecelForce: 0.5
}

var spinParams5 = {
    EaseInDurationMilliseconds: 420,
    SpinDurationMilliseconds: 3600,
    MaxVelocity: 1.2,

    AccelForcePerMillisecond: 0.0075,
    DecelForce: 0.5
}

var hasStarted = false;
window.addEventListener("keypress", function(event){

    log(event);
    if(event.charCode == 32)
    {
        spinToggle();
    }
});


document.getElementById("spin").addEventListener("click", spinToggle);

document.getElementById("fullscreen").addEventListener("click", toggleFullScreen);

function spinToggle()
{
    if (!hasStarted) {
        hasStarted = true;

        newReelsContainer.Reels[0].Spin(spinParams1);
        newReelsContainer.Reels[1].Spin(spinParams2);
        newReelsContainer.Reels[2].Spin(spinParams3);
        newReelsContainer.Reels[3].Spin(spinParams4);
        newReelsContainer.Reels[4].Spin(spinParams5);
    }
    else {
        hasStarted = false;

        newReelsContainer.Reels[0].forcedStop = true;
        newReelsContainer.Reels[1].forcedStop = true;
        newReelsContainer.Reels[2].forcedStop = true;
        newReelsContainer.Reels[3].forcedStop = true;
        newReelsContainer.Reels[4].forcedStop = true;
    }
}

function toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
    else {
        cancelFullScreen.call(doc);
    }
}

