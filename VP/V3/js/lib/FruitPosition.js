
function FruitPosition(reelIndex, fruitPositionIndex, fruitHeight, fruitWidth) {

    // constants - for future handling of variable size svgs.
    this._svgSourceViewPortWidth = 1000;
    this._svgSourceViewPortHeight = 1000;

    this.ReelIndex = reelIndex;
    this.FruitPositionIndex = fruitPositionIndex;

    this.FruitHeight = fruitHeight;
    this.FruitWidth = fruitWidth;

    var scaleTransformHeight = this.FruitHeight / this._svgSourceViewPortHeight;
    var scaleTransformWidth = this.ReelWidth / this._svgSourceViewPortWidth;

    var scaleTransform = scaleTransformHeight;
    if (scaleTransformWidth < scaleTransform) {
        scaleTransform = scaleTransformWidth;
    }

    this.DomUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    this.DomUse.setAttribute('id', 'fruitPosition_' + this.ReelIndex + '_' + this.FruitPositionIndex);

    this.DomGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.DomGroup.setAttribute('transform', 'translate(0,' + this.FruitPositionIndex * this.FruitHeight + '), scale(' + scaleTransform + ')');

    this.DomGroup.appendChild(this.DomUse);

    this.SetImageIndex(-1);
}

FruitPosition.prototype.SetImageIndex = function(index){

    this.Image = index;
    this.Href = '#fruitImage' + this.Image;
    this.DomUse.setAttributeNS('http://www.w3.org/1999/xlink', 'href', this.Href);
    return true;
}

FruitPosition.prototype.GetImageIndex = function(){
    return this.Image;
}

FruitPosition.prototype.GetImageHref = function () {
    return this.Href;
}