// Code snippet taken from ChatGPT
/* global bootstrap */

import { Tile } from './tile.js';
import { GameField } from './gamefield.js';

let gameField;
const classFlagged = "flagged";
const classTileButton = "tile-button";
const classRevealed = "revealed";
const classHover = "tile-hover";
const tooltipNode = "<span class='tooltiptext'>Remaining mines</span>";

const playButton = document.getElementById("playButton");
playButton.addEventListener("click", createField);

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", createField);

function createField()
{

    console.clear();
    //Remove previous playfield container
    clearField();
    //Create interactable game field container
    createGameField();

    /* Code snippet taken and modified from ChatGPT*/
    const grid = document.querySelector('input[name="grid-selector"]:checked').value.split("*");
    const mines = document.querySelector('input[name="mine-count-selector"]:checked').value;

    try
    {
        gameField = new GameField(grid[0], grid[1], mines);
        updateRemaining();
        console.log(gameField.PlayArea);

        // Create actual game field
        for (let i = 0; i < gameField.DimensionRow; i++)
        {
            createTileRow(i);
            for (let j = 0; j < gameField.DimensionColumn; j++)
            {
                let tile = new Tile(i, j);
                tile.createTile();
            }
        }
    }
    catch (error)
    {
        console.log(error.message);
    }

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
        if (gameField.hasFlags() && element.classList.contains(classTileButton) || element.classList.contains(classFlagged))
        {
            const flagCount = element.tileInstance.flagTile(element);
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
    if (element?.classList.contains(classRevealed))
    {
        return;
    }
    if (element?.classList.contains(classFlagged) && !isGameOver)
    {
        return;
    }

    const position = element.id.split("-");


    /* Code snippet and future occurrences taken and modified from ChatGPT*/
    let pElement = element.tileInstance.createTilePElement(element, gameField.PlayArea[position[0]][position[1]]);

    if (isGameOver)
    {
        if (!isNotMine(position))
        {
            if (element?.classList.contains(classFlagged))
            {
                pElement.tileInstance.addToClassList(pElement, "hit-correct");
            }
        }
        return;
    }

    let isGameLost = false;

    switch (gameField.PlayArea[position[0]][position[1]])
    {
        case "x":
            pElement.tileInstance.addToClassList(pElement, "hit");
            isGameLost = true;
            break;
        case " ":
            revealEmptyTiles(element);
            break;
        default:
            break;
    }

    pElement.addEventListener("mouseover", hoverTiles);
    pElement.addEventListener("mouseleave", deHoverTiles);
    pElement.addEventListener("click", hintClick);
    gameField.RevealedCount += 1;
    isGameEnded(isGameLost);

}

/** Reveal tiles neighbouring hints if there are as many flags as current hints */
function hintClick()
{
    const element = event.target;
    const position = element?.id?.split('-');
    const row = parseInt(position[0]);
    const column = parseInt(position[1]);
    const hintCount = gameField.PlayArea[row][column];
    let flaggedTilesCount = 0;

    const neighbourTiles = gameField.getNeighbourTiles(position);

    for (let i = 0; i < neighbourTiles.length; i++)
    {
        let neighbourTile = document.getElementById(neighbourTiles[i][0]);
        if (neighbourTile.classList.contains(classFlagged))
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
    const element = event.target;
    let position = element.id.split("-");

    const neighbourTiles = gameField.getNeighbourTiles(position);

    for (let i = 0; i < neighbourTiles.length; i++)
    {
        let neighbourTile = document.getElementById(neighbourTiles[i][0]);
        let neighbourPosition = neighbourTile.id.split("-");
        position = [parseInt(neighbourPosition[0]), parseInt(neighbourPosition[1])];
        if (!isFlagged(position) && !isRevealed(position))
        {
            neighbourTile.tileInstance.addToClassList(neighbourTile, classHover);
        }
    }
}

/** Remove hover effect from tiles */
function deHoverTiles()
{
    const element = event.target;
    let position = element.id.split("-");

    const neighbourTiles = gameField.getNeighbourTiles(position);

    for (let i = 0; i < neighbourTiles.length; i++)
    {
        let neighbourTile = document.getElementById(neighbourTiles[i][0]);
        let neighbourPosition = neighbourTile.id.split("-");
        position = [parseInt(neighbourPosition[0]), parseInt(neighbourPosition[1])];
        if (!isFlagged(position) && !isRevealed(position))
        {
            neighbourTile.tileInstance.removeFromClassList(neighbourTile, classHover);
        }
    }
}

function isFlagged(position)
{
    return document.getElementById(position[0] + "-" + position[1]).classList.contains(classFlagged);
}

function isRevealed(position)
{
    return document.getElementById(position[0] + "-" + position[1]).classList.contains(classRevealed);
}

/** Reveal all neighbouring tiles */
function revealNeighbourTiles(element)
{
    const position = element?.id?.split('-');

    const neighbourTiles = gameField.getNeighbourTiles(position);

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
            const element = document.getElementById(row + "-" + column);
            revealTile(element, true);
        }
    }
}

/** Cycle through all neighbour tiles, and reveal recursively
 * Current limit with 2 mines is 67*67 with occasional overflow
 */
function revealEmptyTiles(element)
{
    const position = element?.id?.split('-');

    const neighbourTiles = gameField.getNeighbourTiles(position);

    for (let i = 0; i < neighbourTiles.length; i++)
    {
        const neighbourTile = document.getElementById(neighbourTiles[i][0]);
        revealTile(neighbourTile);
    }
}

function isNotMine(position)
{
    return gameField.PlayArea[position[0]][position[1]] != "x";
}

function isGameEnded(hitMine = false) 
{
    if (hitMine)
    {
        endGame("You lost!");
        revealAll();
        document.getElementById("reset-button").style.backgroundImage = "url('assets/images/lose-face.png')";
        return true;
    }

    const dimension = gameField.PlayArea[0].length * gameField.PlayArea.length;
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
            let element = document.getElementById(row + "-" + column);
            if (!element.classList.contains(classFlagged) && !element.classList.contains(classRevealed))
            {
                element.classList.add(classFlagged);
            }
        }
    }
}

/** Replace with bootstrap toast */
function endGame(message)
{
    let toast = document.getElementById("endGame-toast-body");
    toast.innerHTML = message;

    /* Code snippet taken from ChatGTP*/
    const toastEl = document.getElementById("endGame-toast");
    toast = new bootstrap.Toast(toastEl);
    toast.show();
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
    document.getElementById("remaining").innerHTML = parseInt(gameField.Mines - gameField.FlaggedCount) + tooltipNode;
}