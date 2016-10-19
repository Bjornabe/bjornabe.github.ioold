
function FruitPosition(reel, index) {

    this.Index;
    this.Reel;

    this._fruitPositionDomElementGroup;
    this._fruitPositionDomElementUse;

    this.Construct = function () {

        this.Index = index;
        this.Reel = reel;

        this._fruitPositionDomElementGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

        var scaleTransformHeight = this.Reel.ReelsContainer.FruitHeight / 1000;
        var scaleTransformWidth = this.Reel.ReelsContainer.ReelWidth / 1000;

        var scaleTransform = scaleTransformHeight;
        if (scaleTransformWidth < scaleTransform)
        {
            scaleTransform = scaleTransformWidth;
        }

        this._fruitPositionDomElementGroup.setAttribute('transform', 'translate(0,' + this.Index * this.Reel.ReelsContainer.FruitHeight + '), scale(' + scaleTransformWidth + ')');

        this._fruitPositionDomElementUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        this._fruitPositionDomElementUse.setAttribute('id', 'fruitPosition_' + this.Reel.Index + '_' + this.Index);

        var randomIndex = Math.floor(Math.random() * 5);
        this.SetFruitIndex(randomIndex);

        //this._fruitPositionDomElementUse.setAttributeNS('http://www.w3.org/1999/xlink', 'href', "#fruitPlaceholder");
        //this._fruitPositionDomElementUse.setAttribute('fill', getRandomColor());

        this._fruitPositionDomElementGroup.appendChild(this._fruitPositionDomElementUse);

        /*
        this._fruitPositionDomElementGroup.setAttribute('transform', 'translate(0,' + this.Index * this.Reel.ReelsContainer.FruitHeight);
        fruit.setAttribute('width', fruitWidth);
        fruit.setAttribute('height', fruitHeight);
        fruit.setAttribute('fill', 'blue');
        fruit.setAttribute('fill-opacity', '0.3');

                this._fruitPositionDomElement.setAttribute('x', 0);
        this._fruitPositionDomElement.setAttribute('y', this.Index * this.Reel.ReelsContainer.FruitHeight);
        this._fruitPositionDomElement.setAttribute('width', this.Reel.ReelsContainer.ReelWidth);
        this._fruitPositionDomElement.setAttribute('height', this.Reel.ReelsContainer.FruitHeight);
        

        */

        this.Reel.ReelFruitGroupDom.appendChild(this._fruitPositionDomElementGroup);
    }

    this.Destroy = function () {
        this._fruitPositionDomElement.parentElement.removeChild(this._fruitPositionDomElement);
        this._fruitPositionDomElement = undefined;
    }

    this.SetFruitIndex = function(index)
    {
        this.Index = index;
        this._fruitPositionDomElementUse.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#fruitImage' + index);
    }
    this.GetFruitIndex = function () {
        return this.Index;
    }

    this.Construct();

    function getRandomColor() {
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += '0123456789ABCDEF'[Math.floor(Math.random() * 16)];
        }
        return color;
    }
};