import { expect, test } from 'vitest'
import { Tile } from '../tile'


test("flagging", () =>
{
    const tile = new Tile(0, 0);
    const button = document.createElement("button");
    const result = tile.flagTile(button);
    expect(result).toBe(1);
})