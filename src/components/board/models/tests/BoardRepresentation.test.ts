import {BoardRepresentation} from '../BoardRepresentation'
import {beginnerPuzzle1} from "../../../../puzzle-data/beginner-puzzles";

describe("board", () => {
    describe("constructor", () => {
        it('builds a board', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.cells[1].value).toEqual(4);
        });
    })

    describe('getCellValue', () => {
        it('returns value from a cell in the top row', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getCellValue(1)).toEqual(4)
        })

        it('returns value from a cell in a middle row', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getCellValue(30)).toEqual(9)
        })

        it('returns value from a cell in the botoom row', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getCellValue(73)).toEqual(8)
        })

        it('returns value from a cell in the first column', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getCellValue(27)).toEqual(8)
        })

        it('returns value from a cell in a middle column', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getCellValue(13)).toEqual(1)
        })

        it('returns value from a cell in the last column', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getCellValue(26)).toEqual(6)
        })

        it('returns undefined from a cell', () => {
             const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getCellValue(40)).toEqual(undefined)
        })
    });

    describe('getIndex', () => {
        it('returns the index from the row and column', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getIndex(3, 4)).toEqual(31)
        });
    })

    describe('getCell', () => {
        it('returns cell from a cell in the top row', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getCell(1).getValue()).toEqual(4)
        })

        it('returns cell from a cell in a middle row', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getCell(30).getValue()).toEqual(9)
        })

        it('returns cell from a cell in the botoom row', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getCell(73).getValue()).toEqual(8)
        })

        it('returns cell from a cell in the first column', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getCell(27).getValue()).toEqual(8)
        })

        it('returns cell from a cell in a middle column', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getCell(13).getValue()).toEqual(1)
        })

        it('returns cell from a cell in the last column', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getCell(26).getValue()).toEqual(6)
        })
    });

    describe('getColumnIndexesFromIndex', () => {
        it('returns column from a index in the top row', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getColumnIndexesFromIndex(1)).toEqual(
                [1, 10, 19, 28, 37, 46, 55, 64, 73]
            )
        })

        it('returns column from a index in a middle row', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getColumnIndexesFromIndex(30)).toEqual(
                [3, 12, 21, 30, 39, 48, 57, 66, 75]
            )
        })

        it('returns column from a index in the botoom row', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getColumnIndexesFromIndex(73)).toEqual(
                [1, 10, 19, 28, 37, 46, 55, 64, 73]
            )
        })

        it('returns column from a index in the first column', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getColumnIndexesFromIndex(27)).toEqual(
                [0, 9, 18, 27, 36, 45, 54, 63, 72]
            )
        })

        it('returns column from a index in a middle column', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getColumnIndexesFromIndex(13)).toEqual(
                [4, 13, 22, 31, 40, 49, 58, 67, 76]
            )
        })

        it('returns column from a index in the last column', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getColumnIndexesFromIndex(26)).toEqual(
                [8, 17, 26, 35, 44, 53, 62, 71, 80]
            )
        })
    });

    describe('getRowIndexesFromIndex', () => {
        it('returns row from a index in the top row', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getRowIndexesFromIndex(1)).toEqual(
                [0, 1, 2, 3, 4, 5, 6, 7, 8]
            )
        })

        it('returns row from a index in a middle row', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getRowIndexesFromIndex(30)).toEqual(
                [27, 28, 29, 30, 31, 32, 33, 34, 35]
            )
        })

        it('returns row from a index in the botoom row', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getRowIndexesFromIndex(73)).toEqual(
                [72, 73, 74, 75, 76, 77, 78, 79, 80]
            )
        })

        it('returns row from a index in the first column', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getRowIndexesFromIndex(27)).toEqual(
                [27, 28, 29, 30, 31, 32, 33, 34, 35]
            )
        })

        it('returns row from a index in a middle column', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getRowIndexesFromIndex(13)).toEqual(
                [9, 10, 11, 12, 13, 14, 15, 16, 17]
            )
        })

        it('returns row from a index in the last column', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getRowIndexesFromIndex(26)).toEqual(
                [18, 19, 20, 21, 22, 23, 24, 25, 26]
            )
        })
    });

    describe('getSquareIndexesFromIndex', () => {
        it('returns square from a index in the top middle', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getSquareIndexesFromIndex(1)).toEqual(
                [0, 1, 2, 9, 10, 11, 18, 19, 20]
            )
        })

        it('returns square from a index in top right', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getSquareIndexesFromIndex(30)).toEqual(
                [30, 31, 32, 39, 40, 41, 48, 49, 50]
            )
        })

        it('returns square from a index in the bottom middle', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getSquareIndexesFromIndex(73)).toEqual(
                [54, 55, 56, 63, 64, 65, 72, 73, 74]
            )
        })

        it('returns square from a index in the top left', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getSquareIndexesFromIndex(29)).toEqual(
                [27, 28, 29, 36, 37, 38, 45, 46, 47]
            )
        })

        it('returns square from a index in a middle middle', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getSquareIndexesFromIndex(43)).toEqual(
                [33, 34, 35, 42, 43, 44, 51, 52, 53]
            )
        })

        it('returns square from a index in the bottom left', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getSquareIndexesFromIndex(50)).toEqual(
                [30, 31, 32, 39, 40, 41, 48, 49, 50]
            )
        })
    });

    describe('getValuesInRowContaining', () => {
        it('gets values in row 0', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInRowContaining(0)).toEqual([
                3, 4, 9
            ])
        })
        it('gets values in row 1', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInRowContaining(12)).toEqual([
                1, 5, 6
            ])
        })
        it('gets values in row 2', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInRowContaining(24)).toEqual([
                2, 5, 6, 8, 9
            ])
        })
        it('gets values in row 3', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInRowContaining(28)).toEqual([
                4, 7, 8, 9
            ])
        })
        it('gets values in row 4', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInRowContaining(40)).toEqual([
                1, 7, 8
            ])
        })
        it('gets values in row 5', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInRowContaining(52)).toEqual([
                1, 2, 3, 4, 5
            ])
        })
        it('gets values in row 6', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInRowContaining(56)).toEqual([
                1, 2, 6, 7
            ])
        })
        it('gets values in row 7', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInRowContaining(68)).toEqual([
                4, 5, 7, 8
            ])
        })
        it('gets values in row 8', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInRowContaining(80)).toEqual([
                5, 7, 8, 9
            ])
        })
    })

    describe('getValuesInColumnContaining', () => {
        it('gets values in column 0', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInColumnContaining(0)).toEqual([
                2, 5, 7, 8
            ])
        })
        it('gets values in column 1', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInColumnContaining(10)).toEqual([
                2, 4, 5, 8
            ])
        })
        it('gets values in column 2', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInColumnContaining(20)).toEqual([
                5, 7, 8, 9
            ])
        })
        it('gets values in column 3', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInColumnContaining(30)).toEqual([
                4, 6, 9
            ])
        })
        it('gets values in column 4', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInColumnContaining(40)).toEqual([
                1, 2, 4, 7
            ])
        })
        it('gets values in column 5', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInColumnContaining(50)).toEqual([
                1, 6, 7, 8, 9
            ])
        })
        it('gets values in column 6', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInColumnContaining(60)).toEqual([
                3, 5, 7
            ])
        })
        it('gets values in column 7', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInColumnContaining(70)).toEqual([
                1, 3, 8, 9
            ])
        })
        it('gets values in column 8', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInColumnContaining(80)).toEqual([
                1, 4, 5, 6
            ])
        })
    })

    describe('getValuesInSquareContaining', () => {
        it('gets values in square 0', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInSquareContaining(0)).toEqual([
                4, 5, 8, 9
            ])
        })
        it('gets values in square 1', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInSquareContaining(12)).toEqual([
                1, 2, 6, 9
            ])
        })
        it('gets values in square 2', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInSquareContaining(24)).toEqual([
                3, 5, 6
            ])
        })
        it('gets values in square 3', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInSquareContaining(28)).toEqual([
                2, 5, 7, 8
            ])
        })
        it('gets values in square 4', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInSquareContaining(40)).toEqual([
                1, 4, 7, 9
            ])
        })
        it('gets values in square 5', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInSquareContaining(52)).toEqual([
                1, 3, 4, 8
            ])
        })
        it('gets values in square 6', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInSquareContaining(56)).toEqual([
                2, 5, 7, 8
            ])
        })
        it('gets values in square 7', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInSquareContaining(68)).toEqual([
                4, 6, 7, 8
            ])
        })
        it('gets values in square 8', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getValuesInSquareContaining(80)).toEqual([
                1, 5, 7, 9
            ])
        })
    })
})