import {DomClassHelper, RuleBuilderHelper, StepBuilderHelper, StepHelper} from "../procedures";
import {BoardHelpers, CellHelpers} from "../board";
import {beginnerPuzzle1} from "../../../../puzzle-data/beginner-puzzles";

function getAllValuesStep() {
    return StepHelper.buildStep(
        'Adding all values',
        [
            DomClassHelper.buildDomClass(
                StepBuilderHelper.processingClassName,
                [4]
            ),
        ],
        () => ({} as any)
    )
}

function getOncePerColumnStep() {
    return StepHelper.buildStep(
        'Values can only occur once per column',
        [
            DomClassHelper.buildDomClass(
                StepBuilderHelper.processingClassName,
                [4]
            ),
            DomClassHelper.buildDomClass(
                StepBuilderHelper.scanningClassName,
                [4, 13, 22, 31, 40, 49, 58, 67, 76]
            )
        ],
        () => ({} as any)
    )
}

function getOncePerRowStep() {
    return StepHelper.buildStep(
        'Values can only occur once per row',
        [
            DomClassHelper.buildDomClass(
                StepBuilderHelper.processingClassName,
                [4]
            ),
            DomClassHelper.buildDomClass(
                StepBuilderHelper.scanningClassName,
                [0, 1, 2, 3, 4, 5, 6, 7, 8]
            )
        ],
        () => ({} as any)
    )
}

function getOncePerSquareStep() {
    return StepHelper.buildStep(
        'Values can only occur once per square',
        [
            DomClassHelper.buildDomClass(
                StepBuilderHelper.processingClassName,
                [4]
            ),
            DomClassHelper.buildDomClass(
                StepBuilderHelper.scanningClassName,
                [3, 4, 5, 12, 13, 14, 21, 22, 23]
            )
        ],
        () => ({} as any)
    )
}

function getOncePerDiagonalStep() {
    return StepHelper.buildStep(
        'Values can only occur once per diagonal',
        [
            DomClassHelper.buildDomClass(
                StepBuilderHelper.processingClassName,
                [4]
            ),
            DomClassHelper.buildDomClass(
                StepBuilderHelper.scanningClassName,
                [12, 20, 28, 36, 4]
            )
        ],
        () => ({} as any)
    )
}


function getPositiveDiagonalDeltaFour() {
    return StepHelper.buildStep(
        'Consecutive numbers in a positive decimal must have a delta of at least 4',
        [
            DomClassHelper.buildDomClass(
                StepBuilderHelper.processingClassName,
                [53]
            ),
            DomClassHelper.buildDomClass(
                StepBuilderHelper.scanningClassName,
                [61]
            )
        ],
        () => ({} as any)
    )
}

function getBoard() {
    return BoardHelpers.buildBoard(beginnerPuzzle1);
}

describe('buildAddAllValuesStep', () => {
    it('should set values', () => {
        const board = getBoard()
        const step = StepBuilderHelper.buildAddAllValuesStep(4)
        expect(step.name).toEqual(getAllValuesStep().name)
        expect(step.domClasses).toEqual(getAllValuesStep().domClasses)
        expect(step.isComplete).toEqual(false)
        expect(step.inProgress).toEqual(false)
        expect(step.descriptionOfChange).toEqual('')
        expect(board[4].pencilMarks).toEqual(CellHelpers.buildPencilMarks())
    })

    it('should set the function to update', () => {
        const board = getBoard()
        const step = StepBuilderHelper.buildAddAllValuesStep(4)
        const {newStep, newBoard} = step.updateForStep(step, board)
        expect(newStep.name).toEqual(getAllValuesStep().name)
        expect(newStep.domClasses).toEqual(getAllValuesStep().domClasses)
        expect(newStep.isComplete).toEqual(false)
        expect(newStep.inProgress).toEqual(false)
        expect(newStep.descriptionOfChange).toEqual('Adds all possible values to the cell')
        expect(newBoard[4].pencilMarks).toEqual(CellHelpers.buildPencilMarks('valid'))
    })
});

describe('buildOncePerColumnStep', () => {
    it('should set values', () => {
        const board = getBoard()
        const step = StepBuilderHelper.buildOncePerColumnStep(4)
        expect(step.name).toEqual(getOncePerColumnStep().name)
        expect(step.domClasses).toEqual(getOncePerColumnStep().domClasses)
        expect(step.isComplete).toEqual(false)
        expect(step.inProgress).toEqual(false)
        expect(step.descriptionOfChange).toEqual('')
        expect(board[4].pencilMarks).toEqual(CellHelpers.buildPencilMarks())
    })

    it('should set the function to update', () => {
        const board = getBoard()
        board[4] = CellHelpers.addAllPencilMarksToCell(board[4])
        const step = StepBuilderHelper.buildOncePerColumnStep(4)
        const {newStep, newBoard} = step.updateForStep(step, board)
        expect(newStep.name).toEqual(getOncePerColumnStep().name)
        expect(newStep.domClasses).toEqual(getOncePerColumnStep().domClasses)
        expect(newStep.isComplete).toEqual(false)
        expect(newStep.inProgress).toEqual(false)
        expect(newStep.descriptionOfChange).toEqual("Marking values in column (1, 2, 4, 7) as invalid")
        expect(newBoard[4].pencilMarks).toEqual({
            1: 'invalid',
            2: 'invalid',
            3: 'valid',
            4: 'invalid',
            5: 'valid',
            6: 'valid',
            7: 'invalid',
            8: 'valid',
            9: 'valid',
        })
    })

    it('should remove invalid marks at complete', () => {
        const board = getBoard()
        board[4] = CellHelpers.addAllPencilMarksToCell(board[4])
        const step = StepBuilderHelper.buildOncePerColumnStep(4)
        const {newBoard: interimBoard, newStep} = step.updateForStep(step, board)
        board[4] = interimBoard[4]
        const {newBoard} = newStep.completeStep!(newStep, interimBoard)
        expect(newBoard[4].pencilMarks).toEqual({
            1: 'not_present',
            2: 'not_present',
            3: 'valid',
            4: 'not_present',
            5: 'valid',
            6: 'valid',
            7: 'not_present',
            8: 'valid',
            9: 'valid',
        })
    })
});

describe('buildOncePerRowStep', () => {
    it('should set values', () => {
        const board = getBoard()
        const step = StepBuilderHelper.buildOncePerRowStep(4)
        expect(step.name).toEqual(getOncePerRowStep().name)
        expect(step.domClasses).toEqual(getOncePerRowStep().domClasses)
        expect(step.isComplete).toEqual(false)
        expect(step.inProgress).toEqual(false)
        expect(step.descriptionOfChange).toEqual('')
        expect(board[4].pencilMarks).toEqual(CellHelpers.buildPencilMarks())
    })

    it('should set the function to update', () => {
        const board = getBoard()
        board[4] = CellHelpers.addAllPencilMarksToCell(board[4])
        const step = StepBuilderHelper.buildOncePerRowStep(4)
        const {newStep, newBoard} = step.updateForStep(step, board)
        expect(newStep.name).toEqual(getOncePerRowStep().name)
        expect(newStep.domClasses).toEqual(getOncePerRowStep().domClasses)
        expect(newStep.isComplete).toEqual(false)
        expect(newStep.inProgress).toEqual(false)
        expect(newStep.descriptionOfChange).toEqual('Marking values in row (3, 4, 9) as invalid')
        expect(newBoard[4].pencilMarks).toEqual({
            1: 'valid',
            2: 'valid',
            3: 'invalid',
            4: 'invalid',
            5: 'valid',
            6: 'valid',
            7: 'valid',
            8: 'valid',
            9: 'invalid',
        })
    })

    it('should remove invalid marks at complete', () => {
        const board = getBoard()
        board[4] = CellHelpers.addAllPencilMarksToCell(board[4])
        const step = StepBuilderHelper.buildOncePerRowStep(4)
        const {newBoard: interimBoard, newStep} = step.updateForStep(step, board)
        const {newBoard} = newStep.completeStep!(newStep, interimBoard)
        expect(newBoard[4].pencilMarks).toEqual({
            1: 'valid',
            2: 'valid',
            3: 'not_present',
            4: 'not_present',
            5: 'valid',
            6: 'valid',
            7: 'valid',
            8: 'valid',
            9: 'not_present',
        })
    })
});

describe('buildOncePerSquareStep', () => {
    it('should set values', () => {
        const board = getBoard()
        const step = StepBuilderHelper.buildOncePerSquareStep(4)
        expect(step.name).toEqual(getOncePerSquareStep().name)
        expect(step.domClasses).toEqual(getOncePerSquareStep().domClasses)
        expect(step.isComplete).toEqual(false)
        expect(step.inProgress).toEqual(false)
        expect(step.descriptionOfChange).toEqual('')
        expect(board[4].pencilMarks).toEqual(CellHelpers.buildPencilMarks())
    })

    it('should set the function to update', () => {
        const board = getBoard()
        board[4] = CellHelpers.addAllPencilMarksToCell(board[4])
        const step = StepBuilderHelper.buildOncePerSquareStep(4)
        const {newStep, newBoard} = step.updateForStep(step, board)
        expect(newStep.name).toEqual(getOncePerSquareStep().name)
        expect(newStep.domClasses).toEqual(getOncePerSquareStep().domClasses)
        expect(newStep.isComplete).toEqual(false)
        expect(newStep.inProgress).toEqual(false)
        expect(newStep.descriptionOfChange).toEqual("Marking values in square (1, 2, 6, 9) as invalid")
        expect(newBoard[4].pencilMarks).toEqual({
            1: 'invalid',
            2: 'invalid',
            3: 'valid',
            4: 'valid',
            5: 'valid',
            6: 'invalid',
            7: 'valid',
            8: 'valid',
            9: 'invalid',
        })
    })

    it('should remove invalid marks at complete', () => {
        const board = getBoard()
        board[4] = CellHelpers.addAllPencilMarksToCell(board[4])
        const step = StepBuilderHelper.buildOncePerSquareStep(4)
        const {newBoard: interimBoard, newStep} = step.updateForStep(step, board)
        const {newBoard} = newStep.completeStep!(newStep, interimBoard)
        expect(newBoard[4].pencilMarks).toEqual({
            1: 'not_present',
            2: 'not_present',
            3: 'valid',
            4: 'valid',
            5: 'valid',
            6: 'not_present',
            7: 'valid',
            8: 'valid',
            9: 'not_present',
        })
    })
});

describe('buildPositiveDiagonalDeltaFour', () => {
    it('should set values', () => {
        const board = getBoard()
        board[53] = CellHelpers.addAllPencilMarksToCell(board[53])
        const step = StepBuilderHelper.buildPositiveDiagonalDeltaFour(53)
        expect(step.name).toEqual(getPositiveDiagonalDeltaFour().name)
        expect(step.domClasses).toEqual(getPositiveDiagonalDeltaFour().domClasses)
        expect(step.isComplete).toEqual(false)
        expect(step.inProgress).toEqual(false)
        expect(step.descriptionOfChange).toEqual('')
        expect(board[4].pencilMarks).toEqual(CellHelpers.buildPencilMarks())
    })

    it('should set the function to update', () => {
        const board = getBoard()
        board[53] = CellHelpers.addAllPencilMarksToCell(board[53])
        const step = StepBuilderHelper.buildPositiveDiagonalDeltaFour(53)
        const {newStep, newBoard} = step.updateForStep(step, board)
        expect(newStep.name).toEqual(getPositiveDiagonalDeltaFour().name)
        expect(newStep.domClasses).toEqual(getPositiveDiagonalDeltaFour().domClasses)
        expect(newStep.isComplete).toEqual(false)
        expect(newStep.inProgress).toEqual(false)
        expect(newStep.descriptionOfChange).toEqual("Marking values in diagonal (1, 2, 3, 4) as invalid")
        expect(newBoard[53].pencilMarks).toEqual({
            1: 'invalid',
            2: 'invalid',
            3: 'invalid',
            4: 'invalid',
            5: 'valid',
            6: 'valid',
            7: 'valid',
            8: 'valid',
            9: 'valid',
        })
    })

    it('should remove invalid marks at complete', () => {
        const board = getBoard()
        board[53] = CellHelpers.addAllPencilMarksToCell(board[53])
        const step = StepBuilderHelper.buildPositiveDiagonalDeltaFour(53)
        const {newBoard: interimBoard, newStep} = step.updateForStep(step, board)
        const {newBoard} = newStep.completeStep!(newStep, interimBoard)
        expect(newBoard[53].pencilMarks).toEqual({
            1: 'not_present',
            2: 'not_present',
            3: 'not_present',
            4: 'not_present',
            5: 'valid',
            6: 'valid',
            7: 'valid',
            8: 'valid',
            9: 'valid',
        })
    })
})

describe('buildOncePerDiagonalStep', () => {
    it('should set values', () => {
        const board = getBoard()
        const step = StepBuilderHelper.buildOnlyOncePerDiagonal(4)
        expect(step.name).toEqual(getOncePerDiagonalStep().name)
        expect(step.domClasses).toEqual(getOncePerDiagonalStep().domClasses)
        expect(step.isComplete).toEqual(false)
        expect(step.inProgress).toEqual(false)
        expect(step.descriptionOfChange).toEqual('')
        expect(board[4].pencilMarks).toEqual(CellHelpers.buildPencilMarks())
    })

    it('should set the function to update', () => {
        const board = getBoard()
        board[4] = CellHelpers.addAllPencilMarksToCell(board[4])
        const step = StepBuilderHelper.buildOnlyOncePerDiagonal(4)
        const {newStep, newBoard} = step.updateForStep(step, board)
        expect(newStep.name).toEqual(getOncePerDiagonalStep().name)
        expect(newStep.domClasses).toEqual(getOncePerDiagonalStep().domClasses)
        expect(newStep.isComplete).toEqual(false)
        expect(newStep.inProgress).toEqual(false)
        expect(newStep.descriptionOfChange).toEqual("Marking values in diagonal (6, 7, 8) as invalid")
        expect(newBoard[4].pencilMarks).toEqual({
            1: 'valid',
            2: 'valid',
            3: 'valid',
            4: 'valid',
            5: 'valid',
            6: 'invalid',
            7: 'invalid',
            8: 'invalid',
            9: 'valid',
        })
    })

    it('should remove invalid marks at complete', () => {
        const board = getBoard()
        board[4] = CellHelpers.addAllPencilMarksToCell(board[4])
        const step = StepBuilderHelper.buildOnlyOncePerDiagonal(4)
        const {newBoard: interimBoard, newStep} = step.updateForStep(step, board)
        const {newBoard} = newStep.completeStep!(newStep, interimBoard)
        expect(newBoard[4].pencilMarks).toEqual({
            1: 'valid',
            2: 'valid',
            3: 'valid',
            4: 'valid',
            5: 'valid',
            6: 'not_present',
            7: 'not_present',
            8: 'not_present',
            9: 'valid',
        })
    })
});

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