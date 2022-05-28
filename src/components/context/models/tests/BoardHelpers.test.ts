import {BoardHelpers, CellHelpers} from "../board";
import {beginnerPuzzle1} from "../../../../puzzle-data/beginner-puzzles";

function buildBoard() {
    return BoardHelpers.buildBoard(beginnerPuzzle1);
}

describe('buildBoard', () => {
    it('should build a board from a list', () => {
        const board = BoardHelpers.buildBoard(beginnerPuzzle1);
        expect(board).toEqual([
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(4),
            CellHelpers.buildCell(9),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(3),
            CellHelpers.buildCell(undefined),

            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(5),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(6),
            CellHelpers.buildCell(1),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(undefined),

            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(8),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(2),
            CellHelpers.buildCell(9),
            CellHelpers.buildCell(5),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(6),

            CellHelpers.buildCell(8),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(9),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(7),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(4),

            CellHelpers.buildCell(7),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(8),
            CellHelpers.buildCell(1),

            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(2),
            CellHelpers.buildCell(5),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(4),
            CellHelpers.buildCell(1),
            CellHelpers.buildCell(3),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(undefined),

            CellHelpers.buildCell(2),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(7),
            CellHelpers.buildCell(6),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(1),
            CellHelpers.buildCell(undefined),

            CellHelpers.buildCell(5),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(4),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(8),
            CellHelpers.buildCell(7),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(undefined),

            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(8),
            CellHelpers.buildCell(7),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(undefined),
            CellHelpers.buildCell(9),
            CellHelpers.buildCell(5),
        ])
    })
});


describe('copyBoard', () => {
    it('copies board', () => {
        const board = buildBoard();
        const newBoard = BoardHelpers.copyBoard(board);
        expect(board).toEqual(newBoard)
    })
});


// export const beginnerPuzzle1 = [
//     _, 4, 9, _, _, _, _, 3, _,
//     _, 5, _, 6, 1, _, _, _, _,
//     _, _, 8, _, 2, 9, 5, _, 6,
//     8, _, _, 9, _, 7, _, _, 4,
//     7, _, _, _, _, _, _, 8, 1,
//     _, 2, 5, _, 4, 1, 3, _, _,
//     2, _, _, _, 7, 6, _, 1, _,
//     5, _, _, 4, _, 8, 7, _, _,
//     _, 8, 7, _, _, _, _, 9, 5,
// ]