export class Tile
{
    constructor(row, column)
    {
        this.row = row;
        this.column = column;
        this.Tile = row + "-" + column;
        this.instance = this;
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
        button.tileInstance = this;

        button.appendChild(buttonNode);

        document.getElementById("game-row-" + this.row).appendChild(button);

    }

    /** Place or remove flag from element */
    flagTile(element)
    {
        if (element.classList.contains("flagged"))
        {
            element.innerHTML = "";
            element.classList.remove("flagged");
            return -1;
        }
        element.classList.add("flagged");
        return +1;
    }

    /** Replace interactive tile with non-iteractable */
    revealTile(element, isGameOver = false)
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

        gameField.revealedCount += 1;
        isGameEnded();

    }

    createTilePElement(element, textNode)
    {
        let p = document.createElement("p");
        p.id = element.id;
        let pNode = document.createTextNode(textNode);
        p.appendChild(pNode);
        p.classList.add("tile");
        p.classList.add("revealed");

        switch (textNode)
        {
            case "x": p.classList.add("tile-mine");  
                break;
            case " ": break;
            default: p.classList.add("hint-" + textNode);
                break;                
        }

        element.replaceWith(p);

    }

    addToClassList(element, classText)
    {
        element.classList.add(classText);
    }
}

