export class GameField
{
    DimensionRow;
    DimensionColumn;

    PlayArea = [];
    Mines;
    RevealedCount;
    FlaggedCount;

    constructor(row,column)
    {
        this.DimensionRow = row;
        this.DimensionColumn = column;

        this.Mines = 0;
        this.RevealedCount = 0;
        this.FlaggedCount = 0;
    }

    fillPlayArea()
    {
        for (let i = 0; i < this.DimensionRow; i++)
        {
            let row = [];
            for (let j = 0; j < this.DimensionColumn; j++)
            {
                row[j] = "-1";
            }
            this.PlayArea.push(row);
        }
    }

    /** Place mines in tiles where there are no mines present already */
    placeMines(mineCount)
    {
        this.Mines = parseInt(this.DimensionRow * this.DimensionColumn * mineCount);
        if (this.PlayArea)
        {
            for (let i = 0; i < this.Mines; i++)
            {
                let notPlaced = true;
                while (notPlaced)
                {
                    let randomRow = parseInt(Math.random() * (this.PlayArea.length));
                    let randomColumn = parseInt(Math.random() * (this.PlayArea[0].length));
                    if (this.PlayArea[randomRow][randomColumn] < 0) 
                    {
                        this.PlayArea[randomRow][randomColumn] = "x";
                        notPlaced = false
                    }
                }
            }

        }
    }

    /** Place hints on tiles with no mines */
    placeHints()
    {
        for (let row = 0; row < this.DimensionRow; row++)
        {
            for (let column = 0; column < this.DimensionColumn; column++)
            {
                if (this.PlayArea[row][column] != "x")
                {
                    let hint = this.returnHintAmount(row, column);
                    if (hint == 0)
                    {
                        this.PlayArea[row][column] = " ";
                    }
                    else
                    {
                        this.PlayArea[row][column] = hint;
                    }
                }
            }
        }
    }

    /** Return mine count around tile */
    returnHintAmount(row, column)
    {
        let hintCount = 0;
        let neighbourValues = this.getNeighbourTiles([row, column]);
        for (let i = 0; i < neighbourValues.length; i++)
        {
            if (neighbourValues[i][1] == "x")
            {
                hintCount += 1;
            }
        }

        return hintCount;
    }

    hasFlags()
    {
        return (this.Mines - this.FlaggedCount) > 0;
    }

    getNeighbourTiles(position)
    {
        let observedTile = position;
        let neighbourTiles = [];

        /* Look around clockwise relative from position*/
        //N
        this.lookUp(observedTile);
        if (this.isInBounds(observedTile))
        {
            neighbourTiles.push([observedTile[0]+ "-" + observedTile[1], this.PlayArea[observedTile[0]][observedTile[1]]]);
        }

        //NE
        this.lookRight(observedTile);
        if (this.isInBounds(observedTile))
        {
            neighbourTiles.push([observedTile[0]+ "-" + observedTile[1], this.PlayArea[observedTile[0]][observedTile[1]]]);
        }

        //E
        this.lookDown(observedTile);
        if (this.isInBounds(observedTile))
        {
            neighbourTiles.push([observedTile[0]+ "-" + observedTile[1], this.PlayArea[observedTile[0]][observedTile[1]]]);
        }

        //SE
        this.lookDown(observedTile);
        if (this.isInBounds(observedTile))
        {
            neighbourTiles.push([observedTile[0]+ "-" + observedTile[1], this.PlayArea[observedTile[0]][observedTile[1]]]);
        }

        //S
        this.lookLeft(observedTile);
        if (this.isInBounds(observedTile))
        {
            neighbourTiles.push([observedTile[0]+ "-" + observedTile[1], this.PlayArea[observedTile[0]][observedTile[1]]]);
        }

        //SW
        this.lookLeft(observedTile);
        if (this.isInBounds(observedTile))
        {
            neighbourTiles.push([observedTile[0]+ "-" + observedTile[1], this.PlayArea[observedTile[0]][observedTile[1]]]);
        }

        //W
        this.lookUp(observedTile);
        if (this.isInBounds(observedTile))
        {
            neighbourTiles.push([observedTile[0]+ "-" + observedTile[1], this.PlayArea[observedTile[0]][observedTile[1]]]);
        }

        //NW
        this.lookUp(observedTile);
        if (this.isInBounds(observedTile))
        {
            neighbourTiles.push([observedTile[0]+ "-" + observedTile[1], this.PlayArea[observedTile[0]][observedTile[1]]]);
        }
        
        return neighbourTiles;

    }

    isInBounds(observedTile)
    {
        if (observedTile[0] < 0)
        {
            return false;
        }
        if (observedTile[0] > this.PlayArea.length - 1)
        {
            return false;
        }
        if (observedTile[1] > this.PlayArea[0].length - 1)
        {
            return false;
        }
        if (observedTile[1] < 0)
        {
            return false;
        }
        return true;
    }

    lookUp(observedTile)
    {
        observedTile[0] = observedTile[0] - 1;
    }

    lookDown(observedTile)
    {
        observedTile[0] = observedTile[0] + 1;

    }

    lookLeft(observedTile)
    {
        observedTile[1] = observedTile[1] - 1;
    }

    lookRight(observedTile)
    {
        observedTile[1] = observedTile[1] + 1;
    }

}