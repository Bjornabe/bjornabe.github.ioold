function FruitParams(row, image, annimation) {

    this.Row = row;
    this.Image = image;
    this.Animation = annimation;

}

function ReelParams(column, fruitParams) {

    this.Column = column;
    this.FruitParams = fruitParams;

}

function SpinParams(){

    this.NumberOfPlayers = Math.floor((Math.random() * 10) + 1);
    this.Feature = undefined;
    this.Reels = [];
    this.WinMultiple = 0.5;
    this.Animations = [];
};


function ServerTestStub(numberOfReels, numberOfFruitsPerReel)
{
    this.TotalFuitsAvailable = 5;
    this.NumberOfReels = numberOfReels;
    this.NumberOfFruitsPerReel = numberOfFruitsPerReel;

    this.GetNextSpin = function ()
    {
        var newSpin = new SpinParams();

        for (var col = 0; col < this.NumberOfReels; col++)
        {
            //var reel = new ReelParams(col, )
            //newSpin.Reels.push(new )

            var fruitParams = [];
            for(var row = 0; row < this.NumberOfFruitsPerReel; row++)
            {
                var fruitImage = Math.floor((Math.random() * this.TotalFuitsAvailable) + 1);
                fruitParams.push(new FruitParams(row, fruitImage, 0));
            }
            var reel = new ReelParams(col, fruitParams);
            newSpin.Reels.push(reel);
        }

        return newSpin;
    }
}

(function () {

    function onKeyPress(e)
    {
        log(e);

        if(e.charCode == 100)
        {
            destroy();
        }

        if(e.charCode == 98)
        {
            build();
        }

        if(e.charCode == 115)
        {
            var nextSpin = serverTestStub.GetNextSpin();
            spin(nextSpin);
        }

        if (e.charCode == 120)
        {
            //var nextSpin = serverTestStub.GetNextSpin();
            spin1(nextSpin);
        }
    }

    



    window.addEventListener('keypress', onKeyPress, false);

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

    var numberOfReels = 3;
    var numberOfVisibleFruitsPerReel = 3;
    var numberOfNonVisibleFruitsPerReel = 3;

    var reelSeperatorWidth = 5;

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // INIT

    var serverTestStub = new ServerTestStub(numberOfReels, numberOfVisibleFruitsPerReel + numberOfNonVisibleFruitsPerReel);

    // Get Dimensions
    var reelPaper = document.getElementById(reelPaperElementId);
    if (reelPaper === 'undefined') {
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
    if (goldenBoard === 'undefined') {
        log(`Unable to find goldenBoard elementId {goldenBoardElementId}`); return;
    }





    function spin1() {

        for (var x = 0; x < numberOfReels; x++) {

            var translateYStart = (((0 - numberOfVisibleFruitsPerReel + 1) * fruitHeight) + ((0 - numberOfVisibleFruitsPerReel + 1) * fruitHeightMargin)) * -1;
            var translateYDestination = (((totalFruits - numberOfVisibleFruitsPerReel + 1) * fruitHeight) + ((totalFruits - numberOfVisibleFruitsPerReel + 1) * fruitHeightMargin)) * -1;
            var translateX = reelPaperX + (x * fruitWidth);

            var reelGroup = document.getElementById(`reelGroup${x}`);
            var currentMatrix = reelGroup.getCTM();


            if (reelGroup.transform.baseVal.getItem(0) === 'undefined')
            {
                var transformObject = svgElement.createSVGTransform();
                reelGroup.transform.baseVal.appendItem(transformObject);
            }

            /*
            TweenLite.to(
                reelGroup,
                1.68 * (x + 1) * 3,
                {
                    y: fruitHeight,
                    ease: Power4.easeOut
                });
            */

            var a = `translate(${translateX},${reelPaperY})`;
            var b = `translate(${translateX},${reelPaperY + 500})`;

            reelGroup.animate([
                { transform: `translate(${translateX}px,${reelPaperY}px)` },
                { transform: `translate(${translateX}px,${reelPaperY + 500}px   )` }
            ], {
                duration: 4000, //milliseconds
                easing: 'ease-in-out', //'linear', a bezier curve, etc.
                delay: 10, //milliseconds
                iterations: Infinity, //or a number
                direction: 'alternate', //'normal', 'reverse', etc.
                fill: 'forwards' //'backwards', 'both', 'none', 'auto'
            });
        }
    }

    function spin(spinParams)
    {
        (function(){

            SetFuitImages();

            function SetFuitImages()
            {
                for (var x = 0; x < spinParams.Reels.length; x++) {
                    for (var y = 0; y < spinParams.Reels[x].FruitParams.length; y++) {

                        var fruitImage = document.getElementById(`reel${spinParams.Reels[x].Column}fruit${spinParams.Reels[x].FruitParams[y].Row}`);
                        fruitImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#fruitImage${spinParams.Reels[x].FruitParams[y].Image}`);
                        fruitImage = undefined;
                    }
                }
            }
        })();
    }

    function destroy() {

        (function(){
            var reelsContainer = document.getElementById('reelsContainer');
            if (reelsContainer) {
                var parent = reelsContainer.parentNode;
                parent.removeChild(reelsContainer);
                var newReelsContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                newReelsContainer.setAttribute('id', 'reelsContainer');
                parent.appendChild(newReelsContainer);
            }
        })();
    }

    function build(){

        (function(){
            log('In _CreateFruitContainers()');

            setupTemplates();

            var reelsContainer = document.getElementById('reelsContainer');

            for (var reelNumber = 0; reelNumber < numberOfReels; reelNumber++) {
                // Create background for wheel
                var reelBackground = createNewReelBackground(reelNumber);
                reelsContainer.appendChild(reelBackground);

                if (reelNumber > 0 && reelNumber < numberOfReels) {
                    var reelSeperator = createNewReelSeperator(reelNumber);
                    reelsContainer.appendChild(reelSeperator);
                }

                // Create a group for the fruits
                var newReelGroup = createNewReelGroup(reelNumber);

                // Create fruits
                for (var fruitNumber = 0; fruitNumber < (numberOfVisibleFruitsPerReel + numberOfNonVisibleFruitsPerReel) ; fruitNumber++) {
                    log(`Creating reel${reelNumber}fruit${fruitNumber}`);

                    var newFruitBounds = createBaseFruitBounds(reelNumber, fruitNumber);
                    newReelGroup.appendChild(newFruitBounds);
                }

                reelsContainer.appendChild(newReelGroup);
            }

        })();

        function setupTemplates()
        {
            return (function () {
                var fruitContainers = document.getElementsByClassName('fruitContainer');
                for(var x = 0; x < fruitContainers.length; x++){
                    fruitContainers[x].setAttribute('width', fruitWidth);
                    fruitContainers[x].setAttribute('height', fruitHeight);
                }
            })();
        }

        function createNewReelBackground(reelNumber) {
            return (function(){
                var reel = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

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
            return (function(){
                var reelSeperator = document.createElementNS("http://www.w3.org/2000/svg", "rect");

                reelSeperator.setAttribute('id', `reelSeperator${reelNumber}`);

                reelSeperator.setAttribute('x', (reelPaperX + (reelNumber * fruitWidth)) - (reelSeperatorWidth / 2));
                reelSeperator.setAttribute('y', reelPaperY);
                reelSeperator.setAttribute('width', reelSeperatorWidth);
                reelSeperator.setAttribute('height', reelPaperHeight);
                reelSeperator.setAttribute('fill', 'url(#reelSeperatorBackground)');

                log(reelSeperator);
                return reelSeperator;
            })();
        }

        function createNewReelGroup(reelNumber) {
            return (function(){
                var reelGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");

                reelGroup.setAttribute('id', `reelGroup${reelNumber}`);

                var translateX = reelPaperX + (reelNumber * fruitWidth);

                reelGroup.setAttribute('transform', `translate(${translateX}, ${reelPaperY})`);

                log(reelGroup);
                return reelGroup;
            })();
        }

        function createBaseFruitBounds(reelNumber, fruitNumber) {
            return (function(){
                var fruitCoord = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                var translateY = (((fruitNumber - numberOfVisibleFruitsPerReel + 1) * fruitHeight) + ((fruitNumber - numberOfVisibleFruitsPerReel + 1) * fruitHeightMargin)) * -1;
                fruitCoord.setAttribute('transform', `translate(0, ${translateY})`);

                log(fruitCoord);

                /*
                var fruit = document.createElementNS("http://www.w3.org/2000/svg", "use");
                fruit.setAttributeNS('http://www.w3.org/1999/xlink', 'href', "#fruitPlaceholder");

                fruit.setAttribute('width', fruitWidth);
                fruit.setAttribute('height', fruitHeight);
                fruit.setAttribute('fill', 'blue');
                fruit.setAttribute('fill-opacity', '0.3');
                */

                var fruitAspect = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                fruitAspect.setAttribute('width', fruitWidth);
                fruitAspect.setAttribute('height', fruitHeight);
                fruitAspect.setAttribute('viewBox', '0 0 1000 1000');

                log(fruitAspect);
                fruitCoord.appendChild(fruitAspect);

                var fruit = document.createElementNS('http://www.w3.org/2000/svg', 'use');
                fruit.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#fruitPlaceholder');
                fruit.setAttribute('id', `reel${reelNumber}fruit${fruitNumber}`);

                log(fruit);
                fruitAspect.appendChild(fruit);

                return fruitCoord;
            })();
        }
    }
}());