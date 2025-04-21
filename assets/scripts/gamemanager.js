let playArea = [];

function createField(dimensionRow, dimensionColumn) {
    
    console.clear();
    //Remove previous playfield container
    clearField();
    //Create interactable game field container
    createGameField();


    //Fill playarea variable
    for (let i=0;i<dimensionRow;i++)
    {
        let row = [];
        for (let j=0;j<dimensionColumn;j++)
        {
            row[j] = "-1";
        }
        playArea.push(row);
    }
    
    //Place mines and create hints
    placeMines(2);

    for (let i=0;i<dimensionRow;i++)
    {
        for (let j=0;j<dimensionColumn;j++)
        {
            placeHints(i,j);
        }
    }
        
    // Create actual game field
    for (let i=0;i<dimensionRow;i++)
    {
        createTileRow(i);
        for (let j=0;j<dimensionColumn;j++)
        {
            createTile(i,j);
        }
    }

    console.log(playArea);
}

/**Creating tiles for game area
 * p element as a background, button on face
 */
function createTile(rowNumber,column) {

    let button = document.createElement("button");
    let buttonNode = document.createTextNode(" ");
    let onclickNode = document.createAttribute("onclick");
    onclickNode.value = "tileClick(this)";
    button.classList.add("tile");
    button.setAttributeNode(onclickNode);
    button.id = rowNumber + "-" + column;

    button.appendChild(buttonNode);

    document.getElementById("row-" + rowNumber).appendChild(button);

}

/** Create container row for playfield */
function createTileRow(rowNumber) {

    let div = document.createElement("div");

    div.classList.add("row");
    div.id = "row-" + rowNumber;

    document.getElementById("game-field").appendChild(div);
}

/** Creating div container for field */
function createGameField() {
    let div = document.createElement("div");
    div.id = "game-field";

    document.getElementById("game-main").appendChild(div);
}


/** Left mouse click to interact with the game area
 * Radio button to enable flagging, otherwise reveal tiles
 */
function tileClick(element) {

    if (document.getElementById("flagbox").checked)
    {
        element.innerHTML = "flag";
        element.style.backgroundColor = "red";
    }
    else
    {
        revealTile(element);
    }
}

/** Replace interactive tile with non-iteractable */
function revealTile(element) {
    let position = element.id.split('-');
    let row = parseInt(position[0]);
    let column = parseInt(position[1]);

    let p = document.createElement("p");
    p.id = element.id;
    let pNode = document.createTextNode(playArea[row][column]);
    p.appendChild(pNode);
    p.classList.add("tile");
    p.classList.add("revealed");
    
    switch(playArea[row][column])
    {
    case "x":
        element.replaceWith(p);
        gameOver();
        break;
    case " ":
        element.replaceWith(p);
        revealEmptyTiles();
        break;
    default:
        element.replaceWith(p);
        break;
    }

}

function revealEmptyTiles(){

}

function gameOver() {
    
}

/** Place mines in tiles where there are no mines present already */
function placeMines(mineCount) {

    if (playArea)
    {
        for (let i=0; i<mineCount;i++)
        {
            let notPlaced = true;
            while(notPlaced)
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
function placeHints(row,column) {
    if (playArea[row][column] == "x")
    {
        return;
    }

    let hint = lookAround(row,column);
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
function clearField() {
    let field = document.getElementById("game-field");
    if (field)
    {
        field.remove();
    }
    playArea = [];
}

/** Return mine count around tile */
function lookAround(row,column) {
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

function isInBounds(observedTile){
    if (observedTile[0]<0)
    {
        return false;
    }
    if (observedTile[0]>playArea.length-1)
    {
        return false;
    }
    if (observedTile[1] > playArea[0].length-1)
    {
        return false;
    }
    return true;
}


function lookUp(observedTile) {
    observedTile[0] = observedTile[0]-1;
}

function lookDown(observedTile) {
    observedTile[0] = observedTile[0]+1;

}

function lookLeft(observedTile) {
    observedTile[1] = observedTile[1]-1;
}

function lookRight(observedTile) {
    observedTile[1] = observedTile[1]+1;    
}




