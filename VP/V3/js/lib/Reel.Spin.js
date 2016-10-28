Reel.prototype.Spin = function (spinParams, onSpinComplete) {

    var self = this;

    self._requestAnimationFrame.call(window, function (timestamp) {

        if (!self.start) {
            self.start = timestamp;
            self.lastTimestamp = timestamp;
            self.lastVelocity = 0.1;
            self.currentY = self.ReelFruitGroupDomTransformY;
            self.stop = false;

            self.SetFruitImageIndex(0);

            self.finalFruitImageIndexes = [6, 6, 6];
            self.finalFruitsDrawn = 0;

            self.forcedStop = false;
        }

        self.totalMillisecondsElapsed = timestamp - self.start;
        self.stepMillisecondsElapsed = timestamp - self.lastTimestamp;
        self.lastTimestamp = timestamp;

        if (self.totalMillisecondsElapsed >= spinParams.EaseInDurationMilliseconds && self.stepMillisecondsElapsed > 0) {   // Initial sleep done


            // -- -- -- calculate new velocity -- -- --
            //
            var newVelocity = self.lastVelocity;
            var distanceMoved = 0;

            // foreach millisecond passed
            for (var m = 0; m < self.stepMillisecondsElapsed; m++)
            {
                // get accelerated velocity
                newVelocity = newVelocity + (newVelocity * spinParams.AccelForcePerMillisecond);
                if (newVelocity > spinParams.MaxVelocity) {
                    newVelocity = spinParams.MaxVelocity;
                }
                // get the distance moved :)
                distanceMoved = distanceMoved + newVelocity;
            }

            var numberOfFruitsMovedInTimeWindow = distanceMoved / self.FruitHeight;

            var newY = self.currentY + distanceMoved;
            var stepsTaken = 0;
            if (newY >= self.ReelsContainerY) {

                
                // move fruits down
                self.ShiftDownFruitImages(numberOfFruitsMovedInTimeWindow); 

                // move back a fruit height length
                stepsTaken = Math.floor(numberOfFruitsMovedInTimeWindow) + 1;
                newY = newY - (self.FruitHeight * stepsTaken);

                if ((self.totalMillisecondsElapsed >= (spinParams.EaseInDurationMilliseconds + spinParams.SpinDurationMilliseconds)) || self.forcedStop) {

                    //log(self.totalMillisecondsElapsed + ':' + self);

                    // we should be trying to stop.
                    // we have just reset the reel and .
                    // we have shifted all fruits down.
                    // we might have already shifted a result fruit a long way away

                    if(self.finalFruitsDrawn == self.NumberOfVisibleFruitsPerReel)
                    {
                        self.stop = true;
                        newY = self.ReelFruitGroupDomTransformY;
                    }
                    else
                    {
                        self.SetFruitImageIndex(0);
                        self.finalFruitsDrawn = self.finalFruitsDrawn + 1;
                    }
                }
            }

            self.ReelFruitGroupDom.setAttribute('transform', 'translate(' + self.ReelX + ',' + newY + ')');
            self.currentY = newY;
            self.lastVelocity = newVelocity;
        }

        if (!self.stop) {
            fruitsAdded = 0;
            self.Spin(spinParams, onSpinComplete);
        }
        else {
            self.start = undefined;
        }
    });
};


Reel.prototype.SetFruitImageIndex = function(fruitIndex, imageIndex)
{
    if (imageIndex === undefined)
    {
        imageIndex = Math.floor(Math.random() * 7);
    }
    this._fruitPositions[fruitIndex].SetImageIndex(imageIndex);
};

Reel.prototype.GetFruitImageIndex = function (fruitIndex) {

    return this._fruitPositions[fruitIndex].GetImageIndex();
};

Reel.prototype.ShiftDownFruitImages = function(numberOfShifts, imageIndexNewFruit)
{
    for (var shifts = 0; shifts < numberOfShifts; shifts++) {
        for (var x = this.NumberOfVisibleFruitsPerReel; x > 0; x--) {

            this.SetFruitImageIndex(x, this.GetFruitImageIndex(x - 1))
        }
        this.SetFruitImageIndex(0);
    }
    this.SetFruitImageIndex(0, imageIndexNewFruit);
}