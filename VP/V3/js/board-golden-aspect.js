var screen = document.getElementById('body');
var center = document.getElementById('center');
var paper = document.getElementById('goldenBoard');

function Resize()
{
    //log('Resize()');

    (function ResizeFunction() {
        //log('ResizeFunction()');

        var goldenHeight = parseInt(center.offsetWidth / 1.61803398875);
        var goldenWidth = parseInt(center.offsetHeight * 1.61803398875);

        //log('goldenHeight : ' + goldenHeight);
        //log('goldenWidth  : ' + goldenWidth);
        //log('height : ' + center.offsetHeight);
        //log('width  : ' + center.offsetWidth);

        if (center.offsetHeight <= goldenHeight)
        {
            //log('setting width');
            paper.setAttribute('style', 'width:' + goldenWidth + 'px;height:99.99%;');
            //center.setAttribute('style', 'margin-left:' + (screen.offsetWidth - goldenWidth) / 2 + 'px');   
        }
        else
        {
            //log('setting height');
            paper.setAttribute('style', 'height:' + goldenHeight + 'px;width:99.99%;');
            //center.setAttribute('style', 'margin-top:' + (screen.offsetHeight - goldenHeight) / 2 + 'px');
        }
    })();

}

window.addEventListener('resize', Resize);

Resize();