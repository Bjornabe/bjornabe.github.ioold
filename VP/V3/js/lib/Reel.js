
function Reel(reelsContainer, index) {

    var self = this;

    this.Index;
    this.ReelsContainer;

    this.ReelX;
    this.SpinController;

    this._reelBackgroundDom;
    this._reelSeperatorDom;
    this.ReelFruitGroupDom;
    this.ReelFruitGroupDomTransformY;

    this.SpinYDistance;

    this._fruitPositions = [];

    this.Construct = function () {

        this.Index = index;
        this.ReelsContainer = reelsContainer;
        
        this.ReelX = this.ReelsContainer.ReelsContainerX + (this.Index * this.ReelsContainer.ReelWidth);

        this._BuildReelBackground();

        this._BuildReelSeperator();

        this._BuildVisibleFruitContainer();

        this.SpinYDistance = _SpinYDistance;

        this.SpinController = new SpinController(self);
    }

    this._BuildReelBackground = function () {

        this._reelBackgroundDom = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this._reelBackgroundDom.setAttribute('id', 'reelBackground' + this.Index);
        this._reelBackgroundDom.setAttribute('x', this.ReelX);
        this._reelBackgroundDom.setAttribute('y', this.ReelsContainer.ReelsContainerY);
        this._reelBackgroundDom.setAttribute('width', this.ReelsContainer.ReelWidth);
        this._reelBackgroundDom.setAttribute('height', this.ReelsContainer.ReelsHeight);
        this._reelBackgroundDom.setAttribute('fill', 'url(#' + this.ReelsContainer.Settings.ReelBackgroundId + ')');
        this._reelBackgroundDom.setAttribute('fill-opacity', '1');

        this.ReelsContainer.ReelsContainerElement.appendChild(this._reelBackgroundDom);
    }

    this._BuildReelSeperator = function () {

        if (this.Index > 0 && (this.Index < this.ReelsContainer.Settings.NumberOfReels))
        {
            this._reelSeperatorDom = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            this._reelSeperatorDom.setAttribute('id', 'reelSeperator' + this.Index);
            this._reelSeperatorDom.setAttribute('x', this.ReelX + (this.Index * this.ReelsContainer.ReelWidth) - (this.ReelsContainer.Settings.ReelSeperatorWith / 2));
            this._reelSeperatorDom.setAttribute('y', this.ReelsContainer.ReelsContainerY);
            this._reelSeperatorDom.setAttribute('width', this.ReelsContainer.Settings.ReelSeperatorWith);
            this._reelSeperatorDom.setAttribute('height', this.ReelsContainer.ReelsHeight);
            this._reelSeperatorDom.setAttribute('fill', 'url(#' + this.ReelsContainer.Settings.ReelSeperatorBackgroundId + ')');
            this._reelSeperatorDom.setAttribute('fill-opacity', '1');

            this.ReelsContainer.ReelsContainerElement.appendChild(this._reelSeperatorDom);
        }
    }

    this._BuildVisibleFruitContainer = function () {

        this.ReelFruitGroupDom = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this.ReelFruitGroupDom.setAttribute('id', 'reelController' + this.Index);
        this.ReelFruitGroupDom.setAttribute('x', this.ReelsContainer.ReelsContainerX);
        this.ReelFruitGroupDom.setAttribute('y', this.ReelsContainer.ReelsContainerY);
        this.ReelFruitGroupDomTransformY = (this.ReelsContainer.ReelsContainerY - this.ReelsContainer.FruitHeight);
        this.ReelFruitGroupDom.setAttribute('transform', 'translate(' + this.ReelX + ',' + this.ReelFruitGroupDomTransformY + ')');

        this.ReelsContainer.ReelsContainerElement.appendChild(this.ReelFruitGroupDom);

        for (var x = 0; x < this.ReelsContainer.Settings.NumberOfVisibleFruitsPerReel + 1; x++) {
            this._fruitPositions.push(new FruitPosition(this, x));
        }

    }

    this._currentY;

    function _SpinYDistance(pixelDistance, nextFruitIndex)
    {
        log('In _SpinYDistance');
        log('this._currentY = ' + this._currentY);
        if(!this._currentY)
        {
            this._currentY = this.ReelFruitGroupDomTransformY;
        }

        var newY = this._currentY + pixelDistance;
        if (newY >= this.ReelsContainer.ReelsContainerY)
        {
            
            // move fruits down
            for (var x = this.ReelsContainer.Settings.NumberOfVisibleFruitsPerReel; x > 0; x--)
            {
                this._fruitPositions[x].SetFruitIndex(this._fruitPositions[x - 1].GetFruitIndex());
            }

            // setup new fruit
            this._fruitPositions[0].SetFruitIndex(nextFruitIndex);
            
            // move back a Y length
            newY = newY - this.ReelsContainer.FruitHeight;
        }

        this.ReelFruitGroupDom.setAttribute('transform', 'translate(' + this.ReelX + ',' + newY + ')');
        this._currentY = newY;

        return newY;
    }

    this.Destroy = function () {

        this.SpinController.Destroy();

        this._reelBackgroundDom.parentElement.removeChild(this._reelBackgroundDom);

        if (_reelSeperatorDom)
        {
            this._reelSeperatorDom.parentElement.removeChild(this._reelSeperatorDom);
        }

    }

    this.Construct();
};