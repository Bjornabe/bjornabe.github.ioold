
function ReelsContainer(settings, reelsContainerElement, reelsSizeElement) {

    this.Settings;
    this.ReelsContainerElement;
    this.ReelsSizingElement;

    this.ReelsTotalWidth;
    this.ReelsHeight;

    this.ReelsContainerX;
    this.ReelsContainerY;

    this.ReelWidth;
    this.FruitHeight;

    this.Reels = [];

    this.Construct = function () {

        this.Settings = settings;
        this.ReelsContainerElement = reelsContainerElement;
        this.ReelsSizingElement = reelsSizeElement;

        this.ReelsTotalWidth = parseInt(this.ReelsSizingElement.getAttribute('width'), 10);
        this.ReelsHeight = parseInt(this.ReelsSizingElement.getAttribute('height'), 10);

        this.ReelsContainerX = parseInt(this.ReelsSizingElement.getAttribute('x'), 10);
        this.ReelsContainerY = parseInt(this.ReelsSizingElement.getAttribute('y'), 10);

        this.ReelWidth = this.ReelsTotalWidth / this.Settings.NumberOfReels;
        this.FruitHeight = this.ReelsHeight / this.Settings.NumberOfVisibleFruitsPerReel;

        for (var x = 0; x < this.Settings.NumberOfReels; x++) {
            // index, reelWidth, reelHeight, numberOfVisibleFruitsPerReel, reelsContainerX, reelsContainerY
            var newReel = new Reel(x, this.ReelWidth, this.ReelsHeight, this.Settings.NumberOfVisibleFruitsPerReel, this.ReelsContainerX, this.ReelsContainerY);
            this.Reels.push(newReel);
            newReel.DrawLandscape(this.ReelsContainerElement, this.Settings);
        }
    }

    this.Destroy = function () {
        for (var x = 0; x < this.Reels; x++) {
            this.Reels[x].Destroy();
        }
    }

    this.Construct();
};