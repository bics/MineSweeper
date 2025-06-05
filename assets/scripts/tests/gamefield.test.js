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
            expect(() => new GameField("a","b","c")).toThrowError();
        })
        test("Received 1 incorrect value", () =>
        {
            expect(() => new GameField(0, "a", 0)).toThrowError();
        })
    })
})