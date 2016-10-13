(function () {
    
    log('well here we are.. the start..');

    log('wonder how this is going to work?');

    log('never done a game before - always boring enterprise business middle management shite - if ( approved date = today ) BOLLOCKS');

    log('lets give this a try');

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Header

    var goldenBoardElementId = 'goldenBoard';
    var reelPaperElementId = 'borderInline';

    var reelClassName = 'cReel';
    var fruitClassName = 'cFruit';

    var numberOfReels = 5;
    var numberOfVisibleFruitsPerReel = 3;
    var numberOfNonVisibleFruitsPerReel = 1;

    var reelSeperatorWidth = 5;

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // INIT

    // Get Dimensions
    var reelPaper = document.getElementById(reelPaperElementId);
    if (reelPaper == undefined) {
        log(`Unable to find reelPaper elementId {reelPaperElementId}`); return;
    }

    var reelPaperWidth = parseInt(reelPaper.getAttribute('width'), 10);
    var reelPaperHeight = parseInt(reelPaper.getAttribute('height'), 10);
    var reelPaperX = parseInt(reelPaper.getAttribute('x'), 10);
    var reelPaperY = parseInt(reelPaper.getAttribute('y'), 10);

    var fruitWidth = reelPaperWidth / numberOfReels;
    var fruitHeight = reelPaperHeight / numberOfVisibleFruitsPerReel;
    var fruitHeightMargin = 0;

    var totalFruits = numberOfVisibleFruitsPerReel + numberOfNonVisibleFruitsPerReel;

    //


    var goldenBoard = document.getElementById(goldenBoardElementId);
    if (goldenBoard == undefined) {
        log(`Unable to find goldenBoard elementId {goldenBoardElementId}`); return;
    }

    drawReelsAndFruits();

    function drawReelsAndFruits() {

        (function () {

            log('In _CreateFruitContainers()');

            var reelContainer = document.getElementById('reelsContainer');

            for (var reelNumber = 0; reelNumber < numberOfReels; reelNumber++) {

                // Create background for wheel
                var reelBackground = createNewReelBackground(reelNumber);
                reelContainer.appendChild(reelBackground);

                if (reelNumber > 0 && reelNumber < numberOfReels) {
                    var reelSeperator = createNewReelSeperator(reelNumber);
                    reelContainer.appendChild(reelSeperator);
                }

                // Create a group for the fruits
                var newReelGroup = createNewReelGroup(reelNumber);

                // Create fruits
                for (var fruitNumber = 0; fruitNumber < (numberOfVisibleFruitsPerReel + numberOfNonVisibleFruitsPerReel) ; fruitNumber++) {
                    log(`Creating reel${reelNumber}fruit${fruitNumber}`);

                    var newFruitBounds = createBaseFruitBounds(reelNumber, fruitNumber);
                    newReelGroup.appendChild(newFruitBounds);
                }

                reelContainer.appendChild(newReelGroup);
            }
        })();

        function createNewReelBackground(reelNumber) {
            return (function () {
                var reel = document.createElementNS("http://www.w3.org/2000/svg", "rect");

                reel.setAttribute('id', `reelBackground${reelNumber}`);

                reel.setAttribute('x', reelPaperX + (reelNumber * fruitWidth));
                reel.setAttribute('y', reelPaperY);

                reel.setAttribute('width', fruitWidth);
                reel.setAttribute('height', reelPaperHeight);
                reel.setAttribute('fill', 'url(#reelBackgroundGrad)');
                reel.setAttribute('fill-opacity', '1');

                log(reel);
                return reel;
            })();
        }

        function createNewReelSeperator(reelNumber) {
            return (function () {
                var reelSeperator = document.createElementNS("http://www.w3.org/2000/svg", "rect");

                reelSeperator.setAttribute('id', `reelSeperator${reelNumber}`);

                reelSeperator.setAttribute('x', (reelPaperX + (reelNumber * fruitWidth)) - (reelSeperatorWidth / 2));
                reelSeperator.setAttribute('y', reelPaperY);
                reelSeperator.setAttribute('width', reelSeperatorWidth)
                reelSeperator.setAttribute('height', reelPaperHeight)
                reelSeperator.setAttribute('fill', 'url(#reelSeperatorBackground)');

                log(reelSeperator);
                return reelSeperator;
            })();
        }

        function createNewReelGroup(reelNumber) {
            return (function () {

                var reelGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");

                reelGroup.setAttribute('id', `reelGroup${reelNumber}`);

                var translateX = reelPaperX + (reelNumber * fruitWidth);

                reelGroup.setAttribute('transform', `translate(${translateX}, ${reelPaperY})`);

                log(reelGroup);
                return reelGroup;
            })();
        }

        function createBaseFruitBounds(reelNumber, fruitNumber) {
            return (function () {
                var fruitBounds = document.createElementNS("http://www.w3.org/2000/svg", "g");

                fruitBounds.setAttribute('id', `reel${reelNumber}fruit${fruitNumber}`);

                var translateY = (((fruitNumber - numberOfVisibleFruitsPerReel + 1) * fruitHeight) + ((fruitNumber - numberOfVisibleFruitsPerReel + 1) * fruitHeightMargin)) * -1;
                fruitBounds.setAttribute('transform', `translate(0, ${translateY})`);

                //var translateY = (((fruitNumber - numberOfVisibleFruitsPerReel + 1) * fruitHeight) + ((fruitNumber - numberOfVisibleFruitsPerReel + 1) * fruitHeightMargin)) * -1;
                //reelGroup.setAttribute('transform', `translate(0, ${translateY})`);
                log(fruitBounds);

                //var fruit = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                var fruit = document.createElementNS("http://www.w3.org/2000/svg", "use");
                fruit.setAttribute('xlink:href', "url(#fruitPlaceholder)");
                fruit.setAttribute('width', fruitWidth);
                fruit.setAttribute('height', fruitHeight);
                fruit.setAttribute('fill', 'blue');
                fruit.setAttribute('fill-opacity', '0.3');

                fruitBounds.appendChild(fruit);

                return fruitBounds;
            })();
        }

    }

    function placeRandomFruits()
    {
        for (var reelNumber = 0; reelNumber < numberOfReels; reelNumber++) {
            // Create fruits
            for (var fruitNumber = 0; fruitNumber < (numberOfVisibleFruitsPerReel + numberOfNonVisibleFruitsPerReel) ; fruitNumber++) {
                log(`Creating reel${reelNumber}fruit${fruitNumber}`);
            }

            reelContainer.appendChild(newReelGroup);
        }
    }

})();