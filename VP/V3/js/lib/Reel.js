function Reel(index, reelWidth, reelHeight, numberOfVisibleFruitsPerReel, reelsContainerX, reelsContainerY) {

    this.Index = index;
    this.ReelWidth = reelWidth;
    this.ReelHeight = reelHeight;

    this.NumberOfVisibleFruitsPerReel = numberOfVisibleFruitsPerReel;

    this.ReelsContainerX = reelsContainerX;
    this.ReelsContainerY = reelsContainerY;

    this.FruitHeight = reelHeight / numberOfVisibleFruitsPerReel;
    
    this.ReelX = this.ReelsContainerX + (this.Index * this.ReelWidth);

    this._requestAnimationFrame = window.requestAnimationFrame;
};