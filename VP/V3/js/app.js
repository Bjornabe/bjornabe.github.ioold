
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


var spinParams = {
    EaseInBezier: [.11, -.09, .4, -.02],
    EaseOutType: new Bezier.cubicBezier(1, 1, 0, 0),
    EaseInDurationMilliseconds: 1000,
    SpinDurationMilliseconds: 4000,
    EaseOutDurationMilliseconds: 300,
    MaxSpeedPxPerMs: 2
}

newReelsContainer.Reels[0].SpinController.Spin(spinParams);
newReelsContainer.Reels[1].SpinController.Spin(spinParams);
newReelsContainer.Reels[2].SpinController.Spin(spinParams);
newReelsContainer.Reels[3].SpinController.Spin(spinParams);
newReelsContainer.Reels[4].SpinController.Spin(spinParams);
