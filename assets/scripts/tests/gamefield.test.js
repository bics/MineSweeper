import { describe, expect, test } from "vitest";
import { GameField } from "../gamefield";

describe("Gamefield tests", () =>
{
    describe("Constructor tests", () =>
    {
        test("Correct constuctor", () =>
        {
            expect(() => new GameField(0, 0, 0)).not.toThrowError();
        })
        test("Received null", () =>
        {
            expect(() => new GameField(null)).toThrowError();
        })
        test("Received 1 null value", () =>
        {
            expect(() => new GameField(0, null, 0)).toThrowError();
        })
        test("Received not numbers", () =>
        {
            expect(() => new GameField("a", "b", "c")).toThrowError();
        })
        test("Received 1 incorrect value", () =>
        {
            expect(() => new GameField(0, "a", 0)).toThrowError();
        })
    })
    describe("Playarea initialization tests", () =>
    {
        const row = 3;
        const column = 2;
        const mines = 1;
        const gameField = new GameField(row, column, mines);
        test("Playarea created with correct values", () =>
        {
            expect(() => gameField.PlayArea).not.toThrowError();
            expect(gameField.PlayArea.length).toBe(row);
            expect(gameField.PlayArea[0].length).toBe(column);
        })
        test("Playarea created with correct mine values", () =>
        {
            expect(gameField.Mines).toBe(row * column * mines);
        })
        test("Playarea hints are correct", () =>
        {
            let hintGameField = new GameField(3, 3, 1);
            hintGameField.PlayArea =
                [
                    ["x", "-1", "-1"],
                    ["-1", "-1", "-1"],
                    ["-1", "-1", "x"]
                ];
            hintGameField.placeHints();
            expect(hintGameField.PlayArea[0][1]).toBe(1);
            expect(hintGameField.PlayArea[0][2]).toBe(" ");
            expect(hintGameField.PlayArea[1][1]).toBe(2);
            expect(hintGameField.PlayArea[1][0]).toBe(1);
        })
    })
    describe("Gamefield helper method tests", () =>
    {
        const row = 3;
        const column = 2;
        const mines = 1;
        const gameField = new GameField(row, column, mines);
        test("Has flag test, flagged none", () =>
        {
            expect(gameField.hasFlags()).toBeTruthy();
        })
        test("Has flag test, flagged 2", () =>
        {
            gameField.FlaggedCount = 2;
            expect(gameField.hasFlags()).toBeTruthy();
        })
        test("Has flag test, flagged all", () =>
        {
            gameField.FlaggedCount = 6;
            expect(gameField.hasFlags()).toBeFalsy();
        })
        test("Return correct amount of neighbours", () =>
        {
            const result = gameField.getNeighbourTiles([0, 0]);
            expect(result.length).toBe(3);
        })
        test("Return correct amount of neighbours", () =>
        {
            const result = gameField.getNeighbourTiles([1, 1]);
            expect(result.length).toBe(5);
        })
        test("Boundary tests", () =>
        {
            expect(gameField.isInBounds([0, 0])).toBeTruthy();
            expect(gameField.isInBounds([1, 1])).toBeTruthy();
            expect(gameField.isInBounds([2, 1])).toBeTruthy();
            expect(gameField.isInBounds([-1, 0])).toBeFalsy();
            expect(gameField.isInBounds([6, 0])).toBeFalsy();
            expect(gameField.isInBounds([1, 9])).toBeFalsy();
        })
        test("Directional tests, North", () =>
        {
            let position = [0, 0];
            gameField.lookUp(position);
            expect(position).toStrictEqual([-1, 0]);
        })
        test("Directional tests, East", () =>
        {
            let position = [0, 0];
            gameField.lookRight(position);
            expect(position).toStrictEqual([0, 1]);
        })
        test("Directional tests, South", () =>
        {
            let position = [0, 0];
            gameField.lookDown(position);
            expect(position).toStrictEqual([1, 0]);
        })
        test("Directional tests, West", () =>
        {
            let position = [0, 0];
            gameField.lookLeft(position);
            expect(position).toStrictEqual([0, -1]);
        })
    })
})