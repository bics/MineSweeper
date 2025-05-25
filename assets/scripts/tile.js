export class Tile
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

