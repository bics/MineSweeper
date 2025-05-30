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
                    let hint = this.lookAround(row, column);
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
    lookAround(row, column)
    {
        let currentTile = [row, column];
        let observedTile = currentTile;
        let hintCount = 0;

        /* Look around clockwise relative from position*/
        //N
        lookUp(observedTile);
        if (isInBounds(observedTile) && this.PlayArea[observedTile[0]][observedTile[1]] == "x")
        {
            hintCount += 1;
        }

        //NE
        lookRight(observedTile);
        if (isInBounds(observedTile) && this.PlayArea[observedTile[0]][observedTile[1]] == "x")
        {
            hintCount += 1;
        }

        //E
        lookDown(observedTile);
        if (isInBounds(observedTile) && this.PlayArea[observedTile[0]][observedTile[1]] == "x")
        {
            hintCount += 1;
        }

        //SE
        lookDown(observedTile);
        if (isInBounds(observedTile) && this.PlayArea[observedTile[0]][observedTile[1]] == "x")
        {
            hintCount += 1;
        }

        //S
        lookLeft(observedTile);
        if (isInBounds(observedTile) && this.PlayArea[observedTile[0]][observedTile[1]] == "x")
        {
            hintCount += 1;
        }

        //SW
        lookLeft(observedTile);
        if (isInBounds(observedTile) && this.PlayArea[observedTile[0]][observedTile[1]] == "x")
        {
            hintCount += 1;
        }

        //W
        lookUp(observedTile);
        if (isInBounds(observedTile) && this.PlayArea[observedTile[0]][observedTile[1]] == "x")
        {
            hintCount += 1;
        }

        //NW
        lookUp(observedTile);
        if (isInBounds(observedTile) && this.PlayArea[observedTile[0]][observedTile[1]] == "x")
        {
            hintCount += 1;
        }

        return hintCount;
    }

    hasFlags()
    {
        return (this.Mines - this.FlaggedCount) > 0;
    }

}