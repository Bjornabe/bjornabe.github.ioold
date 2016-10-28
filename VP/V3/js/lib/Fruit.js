
function Fruit(index, millionOdds) {

    this.Index = index;
    this.Href = 'fruitImage' + index;
    this.MillionOdds = 0;
    if (millionOdds) this.MillionOdds = millionOdds;

};