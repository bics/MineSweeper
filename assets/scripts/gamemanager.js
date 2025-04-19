function createField(dimensionRow, dimensionColumn) {
    
    console.clear();
    clearField();
    createGameField();
    let playArea = [];

    for (let i=0;i<dimensionRow;i++)
    {
        let row = [];
        for (let j=0;j<dimensionColumn;j++)
        {
            row[j] = "-1";
        }
        playArea.push(row);
    }
    
    console.log(playArea);

    placeMines(10,playArea);

    for (let i=0;i<dimensionRow;i++)
    {
        createTileRow(i);
        for (let j=0;j<dimensionColumn;j++)
        {
            createTile(i);
        }
    }

}

/**Creating tiles for game area
 * p element as a background, button on face
 */
function createTile(rowNumber) {

    let button = document.createElement("button");
    let buttonNode = document.createTextNode(" ");
    let onclickNode = document.createAttribute("onclick");
    onclickNode.value = "tileClick(this)";
    button.classList.add("tile");
    button.setAttributeNode(onclickNode);

    button.appendChild(buttonNode);

    document.getElementById("row-" + rowNumber).appendChild(button);

}

/** Creating div container for field */
function createGameField() {
    let div = document.createElement("div");
    div.id = "game-field";

    document.getElementById("game-main").appendChild(div);    

}

function createTileRow(rowNumber) {

    let div = document.createElement("div");

    div.classList.add("row");
    div.id = "row-" + rowNumber;
    div.style.flex = "flex";

    document.getElementById("game-field").appendChild(div);
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
        element.style.backgroundColor = "yellow";
    }
}

/** Place mines in tiles where there are no mines present already */
function placeMines(mineCount, playArea) {

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
                    playArea[randomRow][randomColumn] = "0";
                    notPlaced = false
                }
            }
        }

    }

}

function placeHints() {

}

/** Remove generated field */
function clearField() {
    let field = document.getElementById("game-field");
    if (field)
    {
        field.remove();
    }
}



