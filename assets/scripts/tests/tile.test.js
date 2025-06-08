import { describe, expect, test } from 'vitest'
import { Tile } from '../tile'


describe("Tile tests", () =>
{
    describe("Class constructor tests", () =>
    {
        test("Constructor given null", () =>
        {
            expect(() => new Tile(null)).toThrowError();
        })
        test("Constructor given 1 null value", () =>
        {
            expect(() => new Tile(null, 1)).toThrowError();
        })
        test("Constructor given nothing", () =>
        {
            expect(() => new Tile()).toThrowError();
        })
        test("Constructor given both incorrect value", () =>
        {
            expect(() => new Tile("a", "b")).toThrowError();
        })
        test("Constructor given 1 incorrect value", () =>
        {
            expect(() => new Tile(1, "b")).toThrowError();
        })
        test("Constructor given correct values", () =>
        {
            expect(() => new Tile(1, 1)).not.toThrowError();
        })
    })

    describe("Flag function tests", () =>
    {
        const tile = new Tile(0, 0);
        test("Flagging tile", () =>
        {
            const button = document.createElement("button");
            const result = tile.flagTile(button);
            expect(result).toBe(1);
        })
        test("Deflagging tile", () =>
        {
            let button = document.createElement("button");
            button.classList.add("flagged");
            const result = tile.flagTile(button);
            expect(result).toBe(-1);
        })
        test("Given null element", () =>
        {
            expect(() => tile.flagTile(null)).toThrowError();
        })
        test("Given empty", () =>
        {
            expect(() => tile.flagTile("")).toThrowError();
        })
        test("Given any element", () =>
        {
            const element = document.createElement("span");
            const result = tile.flagTile(element);
            expect(result).toBe(1);
        })
        test("Given incorrect value", () =>
        {
            expect(() => tile.flagTile("a")).toThrowError();
        })
        test("Given incorrect value", () =>
        {
            expect(() => tile.flagTile(1)).toThrowError();
        })
    })

    describe("Element classlist changes tests", () =>
    {
        const tile = new Tile(0, 0);
        test("Class correctly added to element", () =>
        {
            let element = document.createElement("button");
            const text = "text;"
            tile.addToClassList(element, text);
            expect(element.classList).toContain(text);
        })
        test("Class correctly added to element", () =>
        {
            let element = document.createElement("span");
            const text = "text;"
            tile.addToClassList(element, text);
            expect(element.classList).toContain(text);
        })
        test("Class correctly added to element", () =>
        {
            let element = document.createElement("span");
            const text = "different;"
            tile.addToClassList(element, text);
            expect(element.classList).toContain(text);
        })
        test("Class correctly removed from element", () =>
        {
            let element = document.createElement("button");
            const text = "text;"
            tile.addToClassList(element, text);
            tile.removeFromClassList(element, text);
            expect(element.classList).not.toContain(text);
        })
        test("Null value given as class text", () =>
        {
            expect(() => tile.addToClassList(null)).toThrowError();
        })
        test("Null value given as an element", () =>
        {
            const text = "text;"
            expect(() => tile.addToClassList(null, text)).toThrowError();
        })
        test("Null value given as class text for both removal and addition", () =>
        {
            let element = document.createElement("button");
            expect(() => tile.addToClassList(element, null)).toThrowError();
            expect(() => tile.removeFromClassList(element, null)).toThrowError();
        })
    })
})

