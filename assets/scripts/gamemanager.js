function createField(dimensionRow, dimensionColumn) {
    
    let playArea = [];

    let row = [];
    for (let i=0;i<dimensionColumn;i++)
    {
        row[i] = "x";
    }

    for (let i=0;i<dimensionRow;i++)
    {
        playArea.push(row);
    }
    
    console.log(playArea);

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
    }
    else
    {
        element.style.backgroundColor = "yellow";
    }
}

function placeMines() {

}

function placeHints() {

}



