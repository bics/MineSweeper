let playArea = [];
let mines;
let revealedCount;
let flaggedCount;

function createField(dimensionRow, dimensionColumn)
{

    console.clear();
    //Remove previous playfield container
    clearField();
    //Create interactable game field container
    createGameField();


    //Fill playarea variable
    for (let i = 0; i < dimensionRow; i++)
    {
        let row = [];
        for (let j = 0; j < dimensionColumn; j++)
        {
            row[j] = "-1";
        }
        playArea.push(row);
    }

    //Place mines and create hints
    placeMines(12);


    for (let i = 0; i < dimensionRow; i++)
    {
        for (let j = 0; j < dimensionColumn; j++)
        {
            placeHints(i, j);
        }
    }

    // Create actual game field
    for (let i = 0; i < dimensionRow; i++)
    {
        createTileRow(i);
        for (let j = 0; j < dimensionColumn; j++)
        {
            createTile(i, j);
        }
    }

    revealedCount = 0;
    flaggedCount = 0;
    document.getElementById("flagbox").checked = false;

    console.log(playArea);
}

/**Creating tiles for game area
 * p element as a background, button on face
 */
function createTile(rowNumber, column)
{

    let button = document.createElement("button");
    let buttonNode = document.createTextNode(" ");
    let onclickNode = document.createAttribute("onclick");
    onclickNode.value = "tileClick(this)";
    button.classList.add("tile");
    button.setAttributeNode(onclickNode);
    button.id = rowNumber + "-" + column;

    button.appendChild(buttonNode);

    document.getElementById("game-row-" + rowNumber).appendChild(button);

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

    switch (playArea[row][column])
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
    let pNode = document.createTextNode(playArea[row][column]);
    p.appendChild(pNode);
    p.classList.add("tile");
    p.classList.add("revealed");

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
    return playArea[row][column] != "x";
}

function gameOver()
{
    revealAll();
    endGame("You lost!");
}

function isGameEnded() 
{
    let dimension = playArea[0].length * playArea.length;
    if (dimension == revealedCount + mines)
    {
        endGame("You won!");
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

/** Place mines in tiles where there are no mines present already */
function placeMines(mineCount)
{
    mines = mineCount;
    if (playArea)
    {
        for (let i = 0; i < mineCount; i++)
        {
            let notPlaced = true;
            while (notPlaced)
            {
                let randomRow = parseInt(Math.random() * (playArea.length));
                let randomColumn = parseInt(Math.random() * (playArea[0].length));
                if (playArea[randomRow][randomColumn] < 0) 
                {
                    playArea[randomRow][randomColumn] = "x";
                    notPlaced = false
                }
            }
        }

    }

}

/** Place hints on tiles with no mines */
function placeHints(row, column)
{
    if (playArea[row][column] == "x")
    {
        return;
    }

    let hint = lookAround(row, column);
    if (hint == 0)
    {
        playArea[row][column] = " ";
    }
    else
    {
        playArea[row][column] = hint;
    }
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
    playArea = [];
}

/** Place or remove flag from element */
function flagTile(element)
{
    if (element.classList.contains("flagged"))
    {
        element.innerHTML = "";
        element.style.backgroundColor = "";
        element.classList.remove("flagged");
        return;
    }

    element.innerHTML = "flag";
    element.style.backgroundColor = "red";
    element.classList.add("flagged");
}

/** Return mine count around tile */
function lookAround(row, column)
{
    let currentTile = [row, column];
    let observedTile = currentTile;
    let hintCount = 0;

    /* Look around clockwise relative from position*/
    //N
    lookUp(observedTile);
    if (isInBounds(observedTile) && playArea[observedTile[0]][observedTile[1]] == "x")
    {
        hintCount += 1;
    }

    //NE
    lookRight(observedTile);
    if (isInBounds(observedTile) && playArea[observedTile[0]][observedTile[1]] == "x")
    {
        hintCount += 1;
    }

    //E
    lookDown(observedTile);
    if (isInBounds(observedTile) && playArea[observedTile[0]][observedTile[1]] == "x")
    {
        hintCount += 1;
    }

    //SE
    lookDown(observedTile);
    if (isInBounds(observedTile) && playArea[observedTile[0]][observedTile[1]] == "x")
    {
        hintCount += 1;
    }

    //S
    lookLeft(observedTile);
    if (isInBounds(observedTile) && playArea[observedTile[0]][observedTile[1]] == "x")
    {
        hintCount += 1;
    }

    //SW
    lookLeft(observedTile);
    if (isInBounds(observedTile) && playArea[observedTile[0]][observedTile[1]] == "x")
    {
        hintCount += 1;
    }

    //W
    lookUp(observedTile);
    if (isInBounds(observedTile) && playArea[observedTile[0]][observedTile[1]] == "x")
    {
        hintCount += 1;
    }

    //NW
    lookUp(observedTile);
    if (isInBounds(observedTile) && playArea[observedTile[0]][observedTile[1]] == "x")
    {
        hintCount += 1;
    }

    return hintCount;

}

function isInBounds(observedTile)
{
    if (observedTile[0] < 0)
    {
        return false;
    }
    if (observedTile[0] > playArea.length - 1)
    {
        return false;
    }
    if (observedTile[1] > playArea[0].length - 1)
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




