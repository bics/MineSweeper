import { Tile } from './tile.js';
import { GameField } from './gamefield.js'

let gameField;

const playButton = document.getElementById("playButton");
playButton.addEventListener("click", createField);

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

    gameField.RevealedCount = 0;
    document.getElementById("flagbox").checked = false;
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
    div.addEventListener("click", tileClick);

    document.getElementById("game-main").appendChild(div);
}


/** Left mouse click to interact with the game area
 * Radio button to enable flagging, otherwise reveal tiles
 */
function tileClick(event)
{
    let element = event.target;
    if (document.getElementById("flagbox").checked)
    {
        if (gameField.hasFlags() && element.classList.contains("tile-button"))
        {
            let flagCount = element.tileInstance.flagTile(element);
            gameField.FlaggedCount += flagCount;
            updateRemaining();
            return;
        }
    }
    else
    {
        revealTile(element);
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
    
    let position = element.id.split("-");
    let pElement = element.tileInstance.createTilePElement(element, gameField.PlayArea[position[0]][position[1]]);
    
    if (isGameOver)
    {
        if (!isNotMine(position))
        {
            if (element?.classList.contains("flagged"))
            {
                pElement.tileInstance.addToClassList(pElement, "hit-correct");
            }
        }
        return;
    }

    switch (gameField.PlayArea[position[0]][position[1]])
    {
        case "x":
            pElement.tileInstance.addToClassList(pElement, "hit");
            gameOver();
            break;
        case " ":
            revealEmptyTiles(element);
            break;
        default:
            break;
    }

    document.getElementById(element.id).addEventListener("mouseover", hoverTiles);
    document.getElementById(element.id).addEventListener("mouseleave", deHoverTiles);
    document.getElementById(element.id).addEventListener("click", hintClick);
    gameField.RevealedCount += 1;
    isGameEnded();

}

/** Reveal tiles neighbouring hints if there are as many flags as current hints */
function hintClick()
{
    let element = event.target;
    let position = element?.id?.split('-');
    let row = parseInt(position[0]);
    let column = parseInt(position[1]);
    let hintCount = gameField.PlayArea[row][column];
    let flaggedTilesCount = 0;

    let neighbourTiles = gameField.getNeighbourTiles(position);

    for (let i = 0; i < neighbourTiles.length; i++)
    {
        let neighbourTile = document.getElementById(neighbourTiles[i][0]);
        if (neighbourTile.classList.contains("flagged"))
        {
            flaggedTilesCount += 1;
        }
    }
    
    if (flaggedTilesCount >= hintCount)
    {
        revealNeighbourTiles(element);
    }
}

/** When pointing at hints, hover neighbour tiles */
function hoverTiles() 
{
    let element = event.target;
    let position = element.id.split("-");
    
    let neighbourTiles = gameField.getNeighbourTiles(position);

    for (let i = 0; i < neighbourTiles.length; i++)
    {
        let neighbourTile = document.getElementById(neighbourTiles[i][0]);
        let neighbourPosition = neighbourTile.id.split("-");
        position = [parseInt(neighbourPosition[0]), parseInt(neighbourPosition[1])];
        if (!isFlagged(position) && !isRevealed(position))
        {
            neighbourTile.tileInstance.addToClassList(neighbourTile, "tile-hover");
        }
    }
}

/** Remove hover effect from tiles */
function deHoverTiles()
{
    let element = event.target;
    let position = element.id.split("-");
    
    let neighbourTiles = gameField.getNeighbourTiles(position);

    for (let i = 0; i < neighbourTiles.length; i++)
    {
        let neighbourTile = document.getElementById(neighbourTiles[i][0]);
        let neighbourPosition = neighbourTile.id.split("-");
        position = [parseInt(neighbourPosition[0]), parseInt(neighbourPosition[1])];
        if (!isFlagged(position) && !isRevealed(position))
        {
            neighbourTile.tileInstance.removeFromClassList(neighbourTile, "tile-hover");
        }
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

/** Reveal all neighbouring tiles */
function revealNeighbourTiles(element)
{
    let position = element?.id?.split('-');

    let neighbourTiles = gameField.getNeighbourTiles(position);

    for (let i = 0; i < neighbourTiles.length; i++)
    {
        let neighbourTile = document.getElementById(neighbourTiles[i][0]);
        revealTile(neighbourTile);
    }
}

/** Reveal all tiles when game finished or stepped on mine */
function revealAll()
{
    for (let row = 0; row < gameField.PlayArea.length; row++)
    {
        for (let column = 0; column < gameField.PlayArea[0].length; column++)
        {
            let element = document.getElementById(row + "-" + column);
            revealTile(element, true);
        }
    }
}

/** Cycle through all neighbour tiles, and reveal recursively
 * Current limit with 2 mines is 67*67 with occasional overflow
 */
function revealEmptyTiles(element)
{
    let position = element?.id?.split('-');

    let neighbourTiles = gameField.getNeighbourTiles(position);

    for (let i = 0; i < neighbourTiles.length; i++)
    {
        let neighbourTile = document.getElementById(neighbourTiles[i][0]);
        revealTile(neighbourTile);
    }
}

function isNotMine(position)
{
    return gameField.PlayArea[position[0]][position[1]] != "x";
}

function gameOver()
{
    revealAll();
    document.getElementById("reset-button").style.backgroundImage = "url('assets/images/lose-face.png')";
    endGame("You lost!");
}

function isGameEnded() 
{
    let dimension = gameField.PlayArea[0].length * gameField.PlayArea.length;
    if (dimension == gameField.RevealedCount + gameField.Mines)
    {
        endGame("You won!");
        flagRemaining();
        revealAll();
        document.getElementById("reset-button").style.backgroundImage = "url('assets/images/win-face.png')";
        return true;
    }

    return false;
}

function flagRemaining()
{
    for (let row = 0; row < gameField.PlayArea.length; row++)
    {
        for (let column = 0; column < gameField.PlayArea[0].length; column++)
        {
            if (!document.getElementById(row + "-" + column).classList.contains("flagged") && !document.getElementById(row + "-" + column).classList.contains("revealed"))
            {
                document.getElementById(row + "-" + column).classList.add("flagged");
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
}

function updateRemaining()
{
    document.getElementById("remaining").innerHTML = parseInt(gameField.Mines - gameField.FlaggedCount);
}
