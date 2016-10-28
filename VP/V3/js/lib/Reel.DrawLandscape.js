Reel.prototype.DrawLandscape = function (reelsContainerElement, settings) {

    this._fruitPositions = [];

    this.ReelFruitGroupDomTransformY = (this.ReelsContainerY - this.FruitHeight);

    // Build up the background..
    this._reelBackgroundDom = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    this._reelBackgroundDom.setAttribute('id', 'reelBackground' + this.Index);
    this._reelBackgroundDom.setAttribute('x', this.ReelX);
    this._reelBackgroundDom.setAttribute('y', this.ReelsContainerY);
    this._reelBackgroundDom.setAttribute('width', this.ReelWidth);
    this._reelBackgroundDom.setAttribute('height', this.ReelHeight);
    this._reelBackgroundDom.setAttribute('fill', 'url(#' + settings.ReelBackgroundId + ')');
    this._reelBackgroundDom.setAttribute('fill-opacity', '1');

    reelsContainerElement.appendChild(this._reelBackgroundDom);

    // Build up the seperator..
    if (this.Index < settings.NumberOfReels - 1) {

        this._reelSeperatorDom = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this._reelSeperatorDom.setAttribute('id', 'reelSeperator' + this.Index);
        this._reelSeperatorDom.setAttribute('x', (this.ReelX + this.ReelWidth) - (settings.ReelSeperatorWith / 2));
        this._reelSeperatorDom.setAttribute('y', this.ReelsContainerY);
        this._reelSeperatorDom.setAttribute('width', settings.ReelSeperatorWith);
        this._reelSeperatorDom.setAttribute('height', this.ReelHeight);
        this._reelSeperatorDom.setAttribute('fill', 'url(#' + settings.ReelSeperatorBackgroundId + ')');
        this._reelSeperatorDom.setAttribute('fill-opacity', '1');

        reelsContainerElement.appendChild(this._reelSeperatorDom);
    }


    // Build up the fruit group..
    this.ReelFruitGroupDom = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.ReelFruitGroupDom.setAttribute('id', 'reelController' + this.Index);
    this.ReelFruitGroupDom.setAttribute('x', this.ReelX);
    this.ReelFruitGroupDom.setAttribute('y', this.ReelFruitGroupDomTransformY);
    this.ReelFruitGroupDom.setAttribute('transform', 'translate(' + this.ReelX + ',' + this.ReelFruitGroupDomTransformY + ')');

    for (var x = 0; x < this.NumberOfVisibleFruitsPerReel + 1; x++) {

        //  reelIndex, fruitPositionIndex, fruitHeight, fruitWidth
        var newFruitPosition = new FruitPosition(this.Index, x, this.FruitHeight, this.ReelWidth);
        this._fruitPositions.push(newFruitPosition);
        this.ReelFruitGroupDom.appendChild(newFruitPosition.DomGroup);
    }

    reelsContainerElement.appendChild(this.ReelFruitGroupDom);
}