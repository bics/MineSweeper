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

function createTile(rowNumber) {

    let p = document.createElement("button");
    let pNode = document.createTextNode(" ");
    p.classList.add("tile");
    p.style.backgroundColor = "#c0c0c0";
    p.style.height = "25px";
    p.style.width = "25px";

    p.appendChild(pNode);

    document.getElementById("row-" + rowNumber).appendChild(p);

}

function createTileRow(rowNumber) {

    let div = document.createElement("div");

    div.classList.add("row");
    div.id = "row-" + rowNumber;
    div.style.flex = "flex";

    document.getElementById("game-field").appendChild(div);
}

function placeMines() {

}

function placeHints() {

}


