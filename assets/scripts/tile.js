import { Helper } from "./helperfunctions.js";

const emptyNode = " ";
const classFlagged = "flagged";
const classTile = "tile";
const classTileButton = "tile-button";
const classRevealed = "revealed";
const classTileMine = "tile-mine"
const classHint = "hint";
const helper = new Helper();

export class Tile
{
    constructor(row, column)
    {
        if (helper.isNull(row,column) || helper.isNumber(row,column))
        {
            throw `Received null value(s): row:${row}, column:${column}`;
        }
        this.Row = row;
        this.Column = column;
        this.Tile = row + "-" + column;
    }

    /**Creating tiles for game area
    * p element as a background, button on face
    */
    createTile()
    {
        let button = document.createElement("button");
        let buttonNode = document.createTextNode(emptyNode);
        button.classList.add(classTile);
        button.classList.add(classTileButton);
        button.id = this.Tile;
        button.tileInstance = this;

        button.appendChild(buttonNode);

        document.getElementById("game-row-" + this.Row).appendChild(button);

    }

    /** Place or remove flag from element */
    flagTile(element)
    {
        if (element.classList.contains(classFlagged))
        {
            element.innerHTML = emptyNode;
            element.classList.remove(classFlagged);
            return -1;
        }
        element.classList.add(classFlagged);
        return +1;
    }

    /** Replace and return button to p element */
    createTilePElement(element, textNode)
    {
        let p = document.createElement("p");
        p.id = element.id;
        let pNode = document.createTextNode(textNode);
        p.classList.add(classTile);
        p.classList.add(classRevealed);

        /* Code snippet taken from ChatGPT*/
        p.tileInstance = this;

        switch (textNode)
        {
            case "x":                
                p.classList.add(classTileMine);
                break;            
            case " ":
                break;
            default:
                p.classList.add(classHint + "-" + textNode);
                p.appendChild(pNode);
                break;
        }

        element.replaceWith(p);
        return p;

    }

    addToClassList(element, classText)
    {
        if (helper.isNull(classText))
        {
            throw `Received null value: classText:${classText}`;
        }
        element.classList.add(classText);
    }

    removeFromClassList(element, classText)
    {
        if (helper.isNull(classText))
        {
            throw `Received null value: classText:${classText}`;
        }
        element.classList.remove(classText);
    }
}

