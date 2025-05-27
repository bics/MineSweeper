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
        button.classList.add("tile");
        button.classList.add("tile-button");
        button.id = this.Tile;

        button.appendChild(buttonNode);

        document.getElementById("game-row-" + this.row).appendChild(button);

    }
}

