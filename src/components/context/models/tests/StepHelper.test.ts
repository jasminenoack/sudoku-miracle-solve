import {DomClassHelper, Step, StepHelper} from "../procedures";
import {BoardHelpers} from "../board";
import {beginnerPuzzle1} from "../../../../puzzle-data/beginner-puzzles";

function getBoard() {
    return BoardHelpers.buildBoard(beginnerPuzzle1);
}

function getStep () {
    const fun = (step: Step) => ({newStep: StepHelper.updateStep({
        descriptionOfChange: 'new-description',
    }, step), newBoard: getBoard()})
    const domClasses = [
        DomClassHelper.buildDomClass(
            'test-row',
            [18, 19, 20, 21, 22, 23, 24, 25, 26]
        )
    ]
    return StepHelper.buildStep('test', domClasses, fun)
}

describe('getClassesByIndex', () => {
    it('returns classes by index', () => {
        const domClasses = [
            DomClassHelper.buildDomClass('test-row', [18, 19, 20, 21, 22, 23, 24, 25, 26]),
            DomClassHelper.buildDomClass('test-square', [30, 31, 32, 39, 40, 41, 48, 49, 50]),
            DomClassHelper.buildDomClass('test-column', [3, 12, 21, 30, 39, 48, 57, 66, 75]),
        ]
        const classesByIndex = {
            3: ['test-column'],
            12: ['test-column'],
            18: ['test-row'],
            19: ['test-row'],
            20: ['test-row'],
            21: ['test-row', 'test-column'],
            22: ['test-row'],
            23: ['test-row'],
            24: ['test-row'],
            25: ['test-row'],
            26: ['test-row'],
            30: ['test-square', 'test-column'],
            31: ['test-square'],
            32: ['test-square'],
            39: ['test-square', 'test-column'],
            40: ['test-square'],
            41: ['test-square'],
            48: ['test-square', 'test-column'],
            49: ['test-square'],
            50: ['test-square'],
            57: ['test-column'],
            66: ['test-column'],
            75: ['test-column'],
        }
        expect(StepHelper.getClassesByIndex(domClasses)).toEqual(classesByIndex)
    })
})


describe('buildStep', () => {
    it('builds step', () => {
        const fun = () => ({} as any)
        const domClasses = [
            DomClassHelper.buildDomClass(
                'test-row',
                [18, 19, 20, 21, 22, 23, 24, 25, 26]
            )
        ]
        const step = StepHelper.buildStep('test', domClasses, fun)
        expect(step).toEqual({
            name: 'test',
            descriptionOfChange: '',
            domClasses: domClasses,
            updateForStep: fun,
            isComplete: false,
            inProgress: false,
        })
    })
})

describe('updateStep', () => {
    it('updates fields for step', () => {
        const step = getStep()
        const newStep = StepHelper.updateStep(
          {descriptionOfChange: 'new description', inProgress: true}, step
        )
        expect(newStep).toEqual({
            name: 'test',
            descriptionOfChange: 'new description',
            domClasses: step.domClasses,
            updateForStep: step.updateForStep,
            isComplete: false,
            inProgress: true,
        })
    })
})

describe('incrementStep', () => {
    it('should move step to in progress if not started', () => {
        const step = getStep()
        const board = getBoard()
        const {newStep} = StepHelper.incrementStep(step, board)
        expect(newStep.descriptionOfChange).toEqual('new-description')
        expect(newStep.inProgress).toEqual(true)
    });

    it('should move step to complete if in progress', () => {
        const step = getStep()
        const board = getBoard()
        step.inProgress = true
        const {newStep} = StepHelper.incrementStep(step, board)
        expect(newStep.descriptionOfChange).toEqual('')
        expect(newStep.isComplete).toEqual(true)
    });

    it('should run complete function if present', () => {
        let ranComplete = false;
        const step = getStep()
        step.completeStep = (() => ranComplete = true) as any;
        const board = getBoard()
        step.inProgress = true
        const {newStep} = StepHelper.incrementStep(step, board)
        expect(ranComplete).toEqual(true)
    })
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