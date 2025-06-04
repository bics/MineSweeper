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
        test("Given incorrect", () =>
        {
            expect(() => new Tile("a","b")).toThrowError();
        })
    })

    describe("Flag function tests", () =>
    {
        test("flagging", () =>
        {
            const tile = new Tile(0, 0);
            const button = document.createElement("button");
            const result = tile.flagTile(button);
            expect(result).toBe(1);
        })
    })
})

