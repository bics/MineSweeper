
let gameField;

function createField()
{

    console.clear();
    //Remove previous playfield container
    clearField();
    //Create interactable game field container
    createGameField();


    let gridSelectors = document.getElementsByName("grid-selector");

    for (let i = 0; i < gridSelectors.length; i++)
    {
        if (gridSelectors[i].checked)
        {
            let grid = gridSelectors[i].value.split("*");
            gameField = new GameField(grid[0], grid[1]);
        }
    }


    gameField.fillPlayArea();

    let mineSelectors = document.getElementsByName("mine-count-selector");

    for (let i = 0; i < mineSelectors.length; i++)
    {
        if (mineSelectors[i].checked)
        {
            //Place mines and create hints
            gameField.placeMines(mineSelectors[i].value)
        }
    }
    
    document.getElementById("remaining").innerHTML = parseInt(gameField.Mines);


    gameField.placeHints();

    console.log(gameField.PlayArea);

    // Create actual game field
    for (let i = 0; i < gameField.DimensionRow; i++)
    {
        createTileRow(i);
        for (let j = 0; j < gameField.DimensionColumn; j++)
        {
            let tile = new Tile(i,j);
            tile.createTile();
        }
    }

    revealedCount = 0;
    flaggedCount = 0;
    document.getElementById("flagbox").checked = false;
}

class GameField
{
    DimensionRow;
    DimensionColumn;

    PlayArea = [];
    Mines;
    revealedCount;
    FlaggedCount;

    constructor(row,column)
    {
        this.DimensionRow = row;
        this.DimensionColumn = column;

        this.Mines = 0;
        this.revealedCount = 0;
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

/** Create container row for playfield */
function createTileRow(rowNumber)
{

    let div = document.createElement("div");

    div.classList.add("game-row");
    div.id = "game-row-" + rowNumber;

    document.getElementById("game-field").appendChild(div);
}

/** Creating div container for field */
function createGameField()
{
    let div = document.createElement("div");
    div.id = "game-field";

    document.getElementById("game-main").appendChild(div);
}


/** Left mouse click to interact with the game area
 * Radio button to enable flagging, otherwise reveal tiles
 */
function tileClick(element)
{

    if (document.getElementById("flagbox").checked)
    {
        flagTile(element);
    }
    else
    {
        revealTile(element);
    }
}

/** Reveal tiles neighbouring hints if there are as many flags as current hints */
function hintClick(element)
{
    let position = element?.id?.split('-');
    let row = parseInt(position[0]);
    let column = parseInt(position[1]);
    let hintCount = playArea[row][column];
    let flaggedTilesCount = 0;

    let currentTile = [row, column];
    let observedTile = currentTile;

    //N
    lookUp(observedTile);
    if (isInBounds(observedTile) && document.getElementById(observedTile[0] + "-" + observedTile[1]).classList.contains("flagged"))
    {
        flaggedTilesCount += 1;
    }
    if (flaggedTilesCount == hintCount)
    {
        revealNeighbourTiles(element);
        return;
    }

    //NE
    lookRight(observedTile);
    if (isInBounds(observedTile) && document.getElementById(observedTile[0] + "-" + observedTile[1]).classList.contains("flagged"))
    {
        flaggedTilesCount += 1;
    }
    if (flaggedTilesCount == hintCount)
    {
        revealNeighbourTiles(element);
        return;
    }

    //E
    lookDown(observedTile);
    if (isInBounds(observedTile) && document.getElementById(observedTile[0] + "-" + observedTile[1]).classList.contains("flagged"))
    {
        flaggedTilesCount += 1;
    }
    if (flaggedTilesCount == hintCount)
    {
        revealNeighbourTiles(element);
        return;
    }

    //SE
    lookDown(observedTile);
    if (isInBounds(observedTile) && document.getElementById(observedTile[0] + "-" + observedTile[1]).classList.contains("flagged"))
    {
        flaggedTilesCount += 1;
    }
    if (flaggedTilesCount == hintCount)
    {
        revealNeighbourTiles(element);
        return;
    }

    //S
    lookLeft(observedTile);
    if (isInBounds(observedTile) && document.getElementById(observedTile[0] + "-" + observedTile[1]).classList.contains("flagged"))
    {
        flaggedTilesCount += 1;
    }
    if (flaggedTilesCount == hintCount)
    {
        revealNeighbourTiles(element);
        return;
    }

    //SW
    lookLeft(observedTile);
    if (isInBounds(observedTile) && document.getElementById(observedTile[0] + "-" + observedTile[1]).classList.contains("flagged"))
    {
        flaggedTilesCount += 1;
    }
    if (flaggedTilesCount == hintCount)
    {
        revealNeighbourTiles(element);
        return;
    }

    //W
    lookUp(observedTile);
    if (isInBounds(observedTile) && document.getElementById(observedTile[0] + "-" + observedTile[1]).classList.contains("flagged"))
    {
        flaggedTilesCount += 1;
    }
    if (flaggedTilesCount == hintCount)
    {
        revealNeighbourTiles(element);
        return;
    }

    //NW
    lookUp(observedTile);
    if (isInBounds(observedTile) && document.getElementById(observedTile[0] + "-" + observedTile[1]).classList.contains("flagged"))
    {
        flaggedTilesCount += 1;
    }
    if (flaggedTilesCount == hintCount)
    {
        revealNeighbourTiles(element);
        return;
    }


}

/* When pointing at hints, hover neighbour tiles*/
function hoverTiles(element) 
{
    let position = element.id.split("-");
    let observedTile = [parseInt(position[0]),parseInt(position[1])];

    //N
    lookUp(observedTile)
    if (isInBounds(observedTile) && !isFlagged(observedTile) && !isRevealed(observedTile))
    {
        document.getElementById(observedTile[0] + "-" + observedTile[1]).classList.add("tile-hover");
    }

    //NE
    lookRight(observedTile)
    if (isInBounds(observedTile) && !isFlagged(observedTile) && !isRevealed(observedTile))
    {
        document.getElementById(observedTile[0] + "-" + observedTile[1]).classList.add("tile-hover");
    }

    //E
    lookDown(observedTile)
    if (isInBounds(observedTile) && !isFlagged(observedTile) && !isRevealed(observedTile))
    {
        document.getElementById(observedTile[0] + "-" + observedTile[1]).classList.add("tile-hover");
    }

    //SE
    lookDown(observedTile)
    if (isInBounds(observedTile) && !isFlagged(observedTile) && !isRevealed(observedTile))
    {
        document.getElementById(observedTile[0] + "-" + observedTile[1]).classList.add("tile-hover");
    }

    //S
    lookLeft(observedTile)
    if (isInBounds(observedTile) && !isFlagged(observedTile) && !isRevealed(observedTile))
    {
        document.getElementById(observedTile[0] + "-" + observedTile[1]).classList.add("tile-hover");
    }

    //SW
    lookLeft(observedTile)
    if (isInBounds(observedTile) && !isFlagged(observedTile) && !isRevealed(observedTile))
    {
        document.getElementById(observedTile[0] + "-" + observedTile[1]).classList.add("tile-hover");
    }

    //W
    lookUp(observedTile)
    if (isInBounds(observedTile) && !isFlagged(observedTile) && !isRevealed(observedTile))
    {
        document.getElementById(observedTile[0] + "-" + observedTile[1]).classList.add("tile-hover");
    }

    //NW
    lookUp(observedTile)
    if (isInBounds(observedTile) && !isFlagged(observedTile) && !isRevealed(observedTile))
    {
        document.getElementById(observedTile[0] + "-" + observedTile[1]).classList.add("tile-hover");
    }

}

function deHoverTiles(element)
{
    let position = element.id.split("-");
    let observedTile = [parseInt(position[0]),parseInt(position[1])];

    //N
    lookUp(observedTile)
    if (isInBounds(observedTile) && !isFlagged(observedTile) && !isRevealed(observedTile))
    {
        document.getElementById(observedTile[0] + "-" + observedTile[1]).classList.remove("tile-hover");
    }

    //NE
    lookRight(observedTile)
    if (isInBounds(observedTile) && !isFlagged(observedTile) && !isRevealed(observedTile))
    {
        document.getElementById(observedTile[0] + "-" + observedTile[1]).classList.remove("tile-hover");
    }

    //E
    lookDown(observedTile)
    if (isInBounds(observedTile) && !isFlagged(observedTile) && !isRevealed(observedTile))
    {
        document.getElementById(observedTile[0] + "-" + observedTile[1]).classList.remove("tile-hover");
    }

    //SE
    lookDown(observedTile)
    if (isInBounds(observedTile) && !isFlagged(observedTile) && !isRevealed(observedTile))
    {
        document.getElementById(observedTile[0] + "-" + observedTile[1]).classList.remove("tile-hover");
    }

    //S
    lookLeft(observedTile)
    if (isInBounds(observedTile) && !isFlagged(observedTile) && !isRevealed(observedTile))
    {
        document.getElementById(observedTile[0] + "-" + observedTile[1]).classList.remove("tile-hover");
    }

    //SW
    lookLeft(observedTile)
    if (isInBounds(observedTile) && !isFlagged(observedTile) && !isRevealed(observedTile))
    {
        document.getElementById(observedTile[0] + "-" + observedTile[1]).classList.remove("tile-hover");
    }

    //W
    lookUp(observedTile)
    if (isInBounds(observedTile) && !isFlagged(observedTile) && !isRevealed(observedTile))
    {
        document.getElementById(observedTile[0] + "-" + observedTile[1]).classList.remove("tile-hover");
    }

    //NW
    lookUp(observedTile)
    if (isInBounds(observedTile) && !isFlagged(observedTile) && !isRevealed(observedTile))
    {
        document.getElementById(observedTile[0] + "-" + observedTile[1]).classList.remove("tile-hover");
    }

}

function isFlagged(position)
{
    return document.getElementById(position[0] + "-" + position[1]).classList.contains("flagged");
}

function isRevealed(position)
{
    return document.getElementById(position[0] + "-" + position[1]).classList.contains("revealed");
}

/** Replace interactive tile with non-iteractable */
function revealTile(element, isGameOver = false)
{
    if (element?.classList.contains("revealed"))
    {
        return;
    }
    if (element?.classList.contains("flagged") && !isGameOver)
    {
        return;
    }
    let position = element?.id?.split('-');
    let row = parseInt(position[0]);
    let column = parseInt(position[1]);

    let p = createPElement(row, column);

    if (isGameOver)
    {
        if (!isNotMine(row, column))
        {
            if (element?.classList.contains("flagged"))
            {
                addCorrectFlag(p);
            }
        }
        element.replaceWith(p);
        return;
    }

    switch (gameField.PlayArea[row][column])
    {
        case "x":
            addHit(p);
            element.replaceWith(p);
            gameOver();
            break;
        case " ":
            element.replaceWith(p);
            revealEmptyTiles(row, column);
            break;
        default:
            element.replaceWith(p);
            break;
    }

    revealedCount += 1;
    isGameEnded();

}

function revealNeighbourTiles(element)
{
    let position = element?.id?.split('-');
    let row = parseInt(position[0]);
    let column = parseInt(position[1]);

    let currentTile = [row, column];
    let observedTile = currentTile;

    //N
    lookUp(observedTile);
    if (isInBounds(observedTile))
    {
        revealTile(document.getElementById(observedTile[0] + "-" + observedTile[1]));
    }

    //NE
    lookRight(observedTile);
    if (isInBounds(observedTile))
    {
        revealTile(document.getElementById(observedTile[0] + "-" + observedTile[1]));
    }

    //E
    lookDown(observedTile);
    if (isInBounds(observedTile))
    {
        revealTile(document.getElementById(observedTile[0] + "-" + observedTile[1]));
    }

    //SE
    lookDown(observedTile);
    if (isInBounds(observedTile))
    {
        revealTile(document.getElementById(observedTile[0] + "-" + observedTile[1]));
    }

    //S
    lookLeft(observedTile);
    if (isInBounds(observedTile))
    {
        revealTile(document.getElementById(observedTile[0] + "-" + observedTile[1]));
    }

    //SW
    lookLeft(observedTile);
    if (isInBounds(observedTile))
    {
        revealTile(document.getElementById(observedTile[0] + "-" + observedTile[1]));
    }

    //W
    lookUp(observedTile);
    if (isInBounds(observedTile))
    {
        revealTile(document.getElementById(observedTile[0] + "-" + observedTile[1]));
    }

    //NW
    lookUp(observedTile);
    if (isInBounds(observedTile))
    {
        revealTile(document.getElementById(observedTile[0] + "-" + observedTile[1]));
    }

}

/** Reveal all tiles when game finished or stepped on mine */
function revealAll()
{
    for (let row = 0; row < playArea.length; row++)
    {
        for (let column = 0; column < playArea[0].length; column++)
        {
            let element = document.getElementById(row + "-" + column);
            revealTile(element, true);
        }
    }
}

function createPElement(row, column)
{
    let p = document.createElement("p");
    p.id = row + "-" + column;
    let pNode = document.createTextNode(gameField.PlayArea[row][column]);
    p.appendChild(pNode);
    p.classList.add("tile");
    p.classList.add("revealed");

    if (isNotMine(row, column) && gameField.PlayArea[row][column] != " ")
    {
        p.classList.add("hint-" + gameField.PlayArea[row][column]);
        let onMouseOver = document.createAttribute("onmouseover");
        onMouseOver.value = "hoverTiles(this)";
        p.setAttributeNode(onMouseOver);
        let onMouseLeave = document.createAttribute("onmouseleave");
        onMouseLeave.value = "deHoverTiles(this)";
        p.setAttributeNode(onMouseLeave);
    }

    if (!isNotMine(row, column))
    {
        p.innerHTML = "";
        p.classList.add("tile-mine");
    }

    let onclickNode = document.createAttribute("onclick");
    onclickNode.value = "hintClick(this)";
    p.setAttributeNode(onclickNode);

    return p;

}

function addHit(element)
{
    if (element)
    {
        element.classList.add("hit");
    }
}

function addCorrectFlag(element)
{
    if (element)
    {
        element.classList.add("hit-correct");
    }
}

/** Cycle through all neighbour tiles, and reveal recursively
 * Current limit with 2 mines is 62*62 with occasional overflow
 */
function revealEmptyTiles(row, column)
{
    let currentTile = [row, column];
    let observedTile = currentTile;

    //N
    lookUp(observedTile);
    if (isInBounds(observedTile) && isNotMine(observedTile[0], observedTile[1]))
    {
        revealTile(document.getElementById(observedTile[0] + "-" + observedTile[1]));
    }

    //NE
    lookRight(observedTile);
    if (isInBounds(observedTile) && isNotMine(observedTile[0], observedTile[1]))
    {
        revealTile(document.getElementById(observedTile[0] + "-" + observedTile[1]));
    }

    //E
    lookDown(observedTile);
    if (isInBounds(observedTile) && isNotMine(observedTile[0], observedTile[1]))
    {
        revealTile(document.getElementById(observedTile[0] + "-" + observedTile[1]));
    }

    //SE
    lookDown(observedTile);
    if (isInBounds(observedTile) && isNotMine(observedTile[0], observedTile[1]))
    {
        revealTile(document.getElementById(observedTile[0] + "-" + observedTile[1]));
    }

    //S
    lookLeft(observedTile);
    if (isInBounds(observedTile) && isNotMine(observedTile[0], observedTile[1]))
    {
        revealTile(document.getElementById(observedTile[0] + "-" + observedTile[1]));
    }

    //SW
    lookLeft(observedTile);
    if (isInBounds(observedTile) && isNotMine(observedTile[0], observedTile[1]))
    {
        revealTile(document.getElementById(observedTile[0] + "-" + observedTile[1]));
    }

    //W
    lookUp(observedTile);
    if (isInBounds(observedTile) && isNotMine(observedTile[0], observedTile[1]))
    {
        revealTile(document.getElementById(observedTile[0] + "-" + observedTile[1]));
    }

    //NW
    lookUp(observedTile);
    if (isInBounds(observedTile) && isNotMine(observedTile[0], observedTile[1]))
    {
        revealTile(document.getElementById(observedTile[0] + "-" + observedTile[1]));
    }


}

function isNotMine(row, column)
{
    return gameField.PlayArea[row][column] != "x";
}

function gameOver()
{
    revealAll();
    document.getElementById("reset-button").style.backgroundImage = "url('assets/images/lose-face.png')";
    endGame("You lost!");
}

function isGameEnded() 
{
    let dimension = gameField.PlayArea[0].length * playArea.length;
    if (dimension == gameField.revealedCount + gameField.Mines)
    {
        endGame("You won!");
        revealAll();
        document.getElementById("reset-button").style.backgroundImage = "url('assets/images/win-face.png')";
        flagRemaining();
        return true;
    }

    return false;
}

function flagRemaining()
{
    for (let row = 0; row < playArea.length; row++)
    {
        for (let column = 0; column < playArea[0].length; column++)
        {
            if (!document.getElementById(row + "-" + column).classList.contains("flagged") && !document.getElementById(row + "-" + column).classList.contains("revealed"))
            {
                flagTile(document.getElementById(row + "-" + column));
            }
        }
    }
}

function endGame(message)
{
    let p = document.createElement("p");
    let pNode = document.createTextNode(message);
    p.id = "end-game-message";
    p.appendChild(pNode);

    document.getElementById("game-footer").appendChild(p);
}

/** Remove generated field */
function clearField()
{
    let field = document.getElementById("game-field");
    if (field)
    {
        field.remove();
    }
    let message = document.getElementById("end-game-message");
    if (message)
    {
        message.remove();
    }
    
    document.getElementById("reset-button").style.backgroundImage = "url('assets/images/game-face.png')";

    playArea = [];
}

/** Place or remove flag from element */
function flagTile(element)
{
    if (element.classList.contains("flagged"))
    {
        element.innerHTML = "";
        element.classList.remove("flagged");
        flaggedCount--;
        updateRemaining();
        return;
    }

    if (gameField.hasFlags())
    {
        gameField.FlaggedCount++;
        element.classList.add("flagged");
        updateRemaining();
    }
}

function updateRemaining()
{
    document.getElementById("remaining").innerHTML = parseInt(gameField.Mines - gameField.FlaggedCount);
}



function isInBounds(observedTile)
{
    if (observedTile[0] < 0)
    {
        return false;
    }
    if (observedTile[0] > gameField.PlayArea.length - 1)
    {
        return false;
    }
    if (observedTile[1] > gameField.PlayArea[0].length - 1)
    {
        return false;
    }
    if (observedTile[1] < 0)
    {
        return false;
    }
    return true;
}


function lookUp(observedTile)
{
    observedTile[0] = observedTile[0] - 1;
}

function lookDown(observedTile)
{
    observedTile[0] = observedTile[0] + 1;

}

function lookLeft(observedTile)
{
    observedTile[1] = observedTile[1] - 1;
}

function lookRight(observedTile)
{
    observedTile[1] = observedTile[1] + 1;
}

class Tile
{
    constructor(row, column)
    {
        this.row = row;
        this.column = column;
        this.Tile = row + "-" + column;
    }

    /**Creating tiles for game area
    * p element as a background, button on face
    */
    createTile()
    {

        let button = document.createElement("button");
        let buttonNode = document.createTextNode(" ");
        let onclickNode = document.createAttribute("onclick");
        onclickNode.value = "tileClick(this)";
        button.classList.add("tile");
        button.classList.add("tile-button");
        button.setAttributeNode(onclickNode);
        button.id = this.Tile;

        button.appendChild(buttonNode);

        document.getElementById("game-row-" + this.row).appendChild(button);

    }
}




