import {PencilMarksProcedure} from "../PencilMarksProcedure";
import {BoardRepresentation} from "../../../board/models/BoardRepresentation";
import {beginnerPuzzle1} from "../../../../puzzle-data/beginner-puzzles";

function buildPencilMarks() {
    const board = new BoardRepresentation(beginnerPuzzle1)
    return new PencilMarksProcedure(board, 4)
}

describe('PencilMarksProcedure', () => {
    describe('goes through steps', () => {
        it('it adds pencil marks to the cell first', () => {
            const pencilMarks = buildPencilMarks()
            const board = pencilMarks.board
            pencilMarks.runNext()
            const cell = board.cells[4]
            const values = cell.getPencilValues()
            expect(values).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
        })

        it('it registers as complete after final step', () => {
            const pencilMarks = buildPencilMarks()
            pencilMarks.runNext()
            expect(pencilMarks.isComplete()).toBeTruthy()
        })
    })

    describe('canRunProcedure', () => {
        const pencilMarks = buildPencilMarks()
        expect(pencilMarks.canRunProcedure()).toBeTruthy();
    })
})

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