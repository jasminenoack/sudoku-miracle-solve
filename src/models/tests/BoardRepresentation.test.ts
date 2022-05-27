import {BoardRepresentation} from '../BoardRepresentation'
import {beginnerPuzzle1} from "../../puzzle-data/beginner-puzzles";

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
            expect(board.getCellValue(0, 1)).toEqual(4)
        })

        it('returns value from a cell in a middle row', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getCellValue(3, 3)).toEqual(9)
        })

        it('returns value from a cell in the botoom row', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getCellValue(8, 1)).toEqual(8)
        })

        it('returns value from a cell in the first column', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getCellValue(3, 0)).toEqual(8)
        })

        it('returns value from a cell in a middle column', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getCellValue(1, 4)).toEqual(1)
        })

        it('returns value from a cell in the last column', () => {
            const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getCellValue(2, 8)).toEqual(6)
        })

        it('returns undefined from a cell', () => {
             const board = new BoardRepresentation(beginnerPuzzle1)
            expect(board.getCellValue(4, 4)).toEqual(undefined)
        })
    });
})