
function Fruit(index, millionOdds) {

    this.Index
    this.Href;
    this.MillionOdds;

    this.Construct = function()
    {
        this.Index = index;
        this.MillionOdds = millionOdds;
        this.Href = 'fruitImage' + index;
    }

    this.Destroy = function()
    {
        
    }

    this.Construct();
};