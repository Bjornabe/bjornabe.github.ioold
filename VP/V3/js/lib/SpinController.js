
function SpinController(reel) {

    this.Reel = reel;

    this.IsSpinning = false;
    
}

SpinController.prototype.Spin = function (spinParams, onSpinComplete) {
    var self = this;

    requestAnimationFrame(function (timestamp) {

        if (!self.start) {
            self.start = timestamp;
            self.totalTimeMilliseconds = spinParams.EaseInDurationMilliseconds + spinParams.SpinDurationMilliseconds + spinParams.EaseOutDurationMilliseconds;
            self.lastY = self.Reel.ReelFruitGroupDomTransformY;
            self.lastTimestamp = 0;
        }

        self.totalMillisecondsElapsed = timestamp - self.start;
        self.stepMillisecondsElapsed = timestamp - self.lastTimestamp;
        self.lastTimestamp = timestamp;

        if (self.totalMillisecondsElapsed < spinParams.EaseInDurationMilliseconds) {
            // easing in
            var percentageEased = self.totalMillisecondsElapsed / spinParams.EaseInDurationMilliseconds;
            var yDistance = Bezier.cubicBezier(spinParams.EaseInBezier[0], spinParams.EaseInBezier[1], spinParams.EaseInBezier[2], spinParams.EaseInBezier[3], percentageEased, spinParams.EaseInDurationMilliseconds);
            log('easing in - ' + self.totalMillisecondsElapsed + ' : ' + percentageEased + ' : ' + yDistance);


            var yIncrease = self.stepMillisecondsElapsed * spinParams.MaxSpeedPxPerMs * yDistance;
            //var yIncrease = self.stepMillisecondsElapsed * spinParams.MaxSpeedPxPerMs;
            var randomIndex = Math.floor(Math.random() * 5);
            self.lastY = self.Reel.SpinYDistance(yIncrease, randomIndex);
            //log('self.lastY' + self.lastY);

            //var cubic - bezier(.05, 0, .93, .2)

            //render(easing(p));

        }
        else {
            if (self.totalMillisecondsElapsed > spinParams.SpinDurationMilliseconds + spinParams.EaseInDurationMilliseconds) {
                // easing out

                var easeOutProgress = self.totalMillisecondsElapsed - spinParams.SpinDurationMilliseconds + spinParams.EaseInDurationMilliseconds

                var percentageEased = easeOutProgress / spinParams.EaseOutDurationMilliseconds;
                log('easing out - ' + self.totalMillisecondsElapsed + ' : ' + percentageEased);
            }
            else {
                // in totalMillisecondsElapsed
                //log('self.stepMillisecondsElapsed' + self.stepMillisecondsElapsed);
                //log('self.stepMillisecondsElapsed' + self.stepMillisecondsElapsed);

                var yIncrease = self.stepMillisecondsElapsed * spinParams.MaxSpeedPxPerMs;
                var randomIndex = Math.floor(Math.random() * 5);
                self.lastY = self.Reel.SpinYDistance(yIncrease, randomIndex);
                //log('self.lastY' + self.lastY);
            }
        }

        log(self.totalMillisecondsElapsed);
        if (self.totalMillisecondsElapsed <= self.totalTimeMilliseconds) {
            self.Spin(spinParams, onSpinComplete);
        }
        else {
            if (onSpinComplete) {
                onSpinComplete();
            }
        }
    });
};