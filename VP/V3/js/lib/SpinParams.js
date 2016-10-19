
function SpinParams() {
    this.Visible = 5;
    this.ReelBackgroundId = "reelBackgroundGrad";
    this.ReelSeperatorBackgroundId = "reelSeperatorBackground";
    this.NumberOfVisibleFruitsPerReel = 3;
    this.ReelSeperatorWith = 10;

    this.AvailableFruitImages = [
        new FruitImage(0),
        new FruitImage(1),
        new FruitImage(2),
        new FruitImage(3),
        new FruitImage(4),
    ];
}