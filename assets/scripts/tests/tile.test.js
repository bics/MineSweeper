import { describe, expect, test } from 'vitest'
import { Tile } from '../tile'


describe("Tile tests", () =>
{
    describe("Class constructor tests", () =>
    {
        test("Given both null", () =>
        {
            expect(() => new Tile(null)).toThrowError();
        })
        test("Given null", () =>
        {
            expect(() => new Tile(null,1)).toThrowError();
        })
        test("Given nothing", () =>
        {
            expect(() => new Tile()).toThrowError();
        })
        test("Given both incorrect", () =>
        {
            expect(() => new Tile("a","b")).toThrowError();
        })
        test("Given incorrect", () =>
        {
            expect(() => new Tile(1,"b")).toThrowError();
        })
        test("Given correct", () =>
        {
            expect(() => new Tile(1,1)).not.toThrowError();
        })
    })

    describe("Flag function tests", () =>
    {
        test("Flagging tile", () =>
        {
            const tile = new Tile(0, 0);
            const button = document.createElement("button");
            const result = tile.flagTile(button);
            expect(result).toBe(1);
        })
        test("Deflagging tile", () =>
        {
            const tile = new Tile(0, 0);
            let button = document.createElement("button");
            button.classList.add("flagged");
            const result = tile.flagTile(button);
            expect(result).toBe(-1);
        })
        test("Given null element", () =>
        {
            const tile = new Tile(0, 0);
            expect(()=> tile.flagTile(null)).toThrowError();
        })        
        test("Given empty", () =>
        {
            const tile = new Tile(0, 0);
            expect(()=> tile.flagTile("")).toThrowError();
        })
        test("Given any element", () =>
        {
            const tile = new Tile(0, 0);
            const element = document.createElement("span");
            const result = tile.flagTile(element);
            expect(result).toBe(1);
        })
    })
})

