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

describe('replaceCells', () => {
    it('should replace a single cell', () => {
        const board = buildBoard();
        const changes = [{index: 4, newCell: CellHelpers.buildCell(5)}]
        const newBoard = BoardHelpers.replaceCells(board, changes);
        const newValues = [...beginnerPuzzle1]
        newValues[4] = 5
        const resultValues = newBoard.map(cell => cell.value)
        expect(resultValues).toEqual(newValues)
    })

    it('should replace a multiple cells', () => {
        const board = buildBoard();
        const changes = [
            {index: 4, newCell: CellHelpers.buildCell(5)},
            {index: 37, newCell: CellHelpers.buildCell(3)},
            {index: 62, newCell: CellHelpers.buildCell(3)},
        ]
        const newBoard = BoardHelpers.replaceCells(board, changes);
        const newValues = [...beginnerPuzzle1]
        newValues[4] = 5
        newValues[37] = 3
        newValues[62] = 3
        const resultValues = newBoard.map(cell => cell.value)
        expect(resultValues).toEqual(newValues)
    })
});

describe('getIndexesForRowContaining', () => {
    it('returns for top left corner', () => {
        const board = buildBoard()
        const values = BoardHelpers.getIndexesForRowContaining(0)
        expect(values).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8])
    });

    it('returns for top right corner', () => {
        const board = buildBoard()
        const values = BoardHelpers.getIndexesForRowContaining(8)
        expect(values).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8])
    })

    it('returns for middle middle', () => {
        const board = buildBoard()
        const values = BoardHelpers.getIndexesForRowContaining(40)
        expect(values).toEqual([36, 37, 38, 39, 40, 41, 42, 43, 44])
    })

    it('returns for bottom left', () => {
        const board = buildBoard()
        const values = BoardHelpers.getIndexesForRowContaining(72)
        expect(values).toEqual([72, 73, 74, 75, 76, 77, 78, 79, 80])
    })

    it('returns for bottom right', () => {
        const board = buildBoard()
        const values = BoardHelpers.getIndexesForRowContaining(80)
        expect(values).toEqual([72, 73, 74, 75, 76, 77, 78, 79, 80])
    })
})

describe('getIndexesForSquareContaining', () => {
    it('returns for top left corner', () => {
        const board = buildBoard()
        const values = BoardHelpers.getIndexesForSquareContaining(0)
        expect(values).toEqual([0, 1, 2, 9, 10, 11, 18, 19, 20])
    });

    it('returns for top right corner', () => {
        const board = buildBoard()
        const values = BoardHelpers.getIndexesForSquareContaining(8)
        expect(values).toEqual([6, 7, 8, 15, 16, 17, 24, 25, 26])
    })

    it('returns for middle middle', () => {
        const board = buildBoard()
        const values = BoardHelpers.getIndexesForSquareContaining(40)
        expect(values).toEqual([30, 31, 32, 39, 40, 41, 48, 49, 50])
    })

    it('returns for bottom left', () => {
        const board = buildBoard()
        const values = BoardHelpers.getIndexesForSquareContaining(72)
        expect(values).toEqual([54, 55, 56, 63, 64, 65, 72, 73, 74])
    })

    it('returns for bottom right', () => {
        const board = buildBoard()
        const values = BoardHelpers.getIndexesForSquareContaining(80)
        expect(values).toEqual([60, 61, 62, 69, 70, 71, 78, 79, 80])
    })
})

describe('getIndexesForColumnContaining', () => {
    it('returns for top left corner', () => {
        const board = buildBoard()
        const values = BoardHelpers.getIndexesForColumnContaining(0)
        expect(values).toEqual([0, 9, 18, 27, 36, 45, 54, 63, 72])
    });

    it('returns for top right corner', () => {
        const board = buildBoard()
        const values = BoardHelpers.getIndexesForColumnContaining(8)
        expect(values).toEqual([8, 17, 26, 35, 44, 53, 62, 71, 80])
    })

    it('returns for middle middle', () => {
        const board = buildBoard()
        const values = BoardHelpers.getIndexesForColumnContaining(40)
        expect(values).toEqual([4, 13, 22, 31, 40, 49, 58, 67, 76])
    })

    it('returns for bottom left', () => {
        const board = buildBoard()
        const values = BoardHelpers.getIndexesForColumnContaining(72)
        expect(values).toEqual([0, 9, 18, 27, 36, 45, 54, 63, 72])
    })

    it('returns for bottom right', () => {
        const board = buildBoard()
        const values = BoardHelpers.getIndexesForColumnContaining(80)
        expect(values).toEqual([8, 17, 26, 35, 44, 53, 62, 71, 80])
    })
})

describe('getValuesForIndexes', () => {
    it('returns only existing values', () => {
        const board = buildBoard()
        const values = BoardHelpers.getValuesForIndexes(board, [0, 1, 2, 3, 4, 5, 6, 7, 8])
        expect(values).toEqual([3, 4, 9])
    });
})

//  0  1  2   3  4  5   6  7  8
//  9 10 11  12 13 14  15 16 17
// 18 19 20  21 22 23  24 25 26
//
// 27 28 29  30 31 32  33 34 35
// 36 37 38  39 40 41  42 43 44
// 45 46 47  48 49 50  51 52 53
//
// 54 55 56  57 58 59  60 61 62
// 63 64 65  66 67 68  69 70 71
// 72 73 74  75 76 77  78 79 80


// export const beginnerPuzzle1 = [
//     _, 4, 9,  _, _, _,  _, 3, _,
//     _, 5, _,  6, 1, _,  _, _, _,
//     _, _, 8,  _, 2, 9,  5, _, 6,
//
//     8, _, _,  9, _, 7,  _, _, 4,
//     7, _, _,  _, _, _,  _, 8, 1,
//     _, 2, 5,  _, 4, 1,  3, _, _,
//
//     2, _, _,  _, 7, 6,  _, 1, _,
//     5, _, _,  4, _, 8,  7, _, _,
//     _, 8, 7,  _, _, _,  _, 9, 5,
// ]