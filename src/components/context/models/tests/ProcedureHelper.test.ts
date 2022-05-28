import {DomClassHelper, Procedure, ProcedureHelper, Rule, RuleHelper, Step, StepHelper} from "../procedures";
import {BoardHelpers} from "../board";
import {beginnerPuzzle1} from "../../../../puzzle-data/beginner-puzzles";

function getRule (name: string): Rule {
    const fun1 = (step: Step) => ({newStep: StepHelper.updateStep({
        descriptionOfChange: 'new-description',
    }, step), newBoard: getBoard()})
    const domClasses1 = [
        DomClassHelper.buildDomClass(
            'step-1',
            [18, 19, 20, 21, 22, 23, 24, 25, 26]
        )
    ]
    const step1 = StepHelper.buildStep('step-1', domClasses1, fun1)

    const fun2 = (step: Step) => ({newStep: StepHelper.updateStep({
        descriptionOfChange: 'new-description',
    }, step), newBoard: getBoard()})
    const domClasses2 = [
        DomClassHelper.buildDomClass(
            'step-2',
            [18, 19, 20, 21, 22, 23, 24, 25, 26]
        )
    ]
    const step2 = StepHelper.buildStep('step-2', domClasses2, fun2)

    return {
        name: name,
        steps: [
            step1, step2
        ]
    }
}

function getBoard() {
    return BoardHelpers.buildBoard(beginnerPuzzle1);
}

function getProcedure(): Procedure {
    const rule1 = getRule('rule-1')
    const rule2 = getRule('rule-2')
    return {
        name: 'procedure',
        board: getBoard(),
        index: 4,
        rules: [rule1, rule2],
    }
}


describe('getCurrentRule', () => {
    it('should return first rule if not started first rule', () => {
        const procedure = getProcedure()
        const rule = procedure.rules[0]
        const resultRule = ProcedureHelper.getCurrentRule(procedure)
        expect(resultRule).toEqual(rule)
    })

    it('should return first rule if not in progress first rule', () => {
        const procedure = getProcedure()
        const rule = procedure.rules[0]
        rule.steps[0].inProgress = true
        const resultRule = ProcedureHelper.getCurrentRule(procedure)
        expect(resultRule).toEqual(rule)
    })

    it('should return later rule if earlier complete and not started first rule', () => {
        const procedure = getProcedure()
        const rule = procedure.rules[0]
        rule.steps[0].inProgress = true
        rule.steps[0].isComplete = true
        const resultRule = ProcedureHelper.getCurrentRule(procedure)
        expect(resultRule).toEqual(rule)
    })

    it('should return later rule if earlier complete and in progress first rule', () => {
        const procedure = getProcedure()
        const rule = procedure.rules[0]
        rule.steps[0].inProgress = true
        rule.steps[0].isComplete = true
        rule.steps[1].inProgress = true
        const resultRule = ProcedureHelper.getCurrentRule(procedure)
        expect(resultRule).toEqual(rule)
    })


    it('should return first rule if not started second rule', () => {
        const procedure = getProcedure()
        const firstRule = procedure.rules[0]
        firstRule.steps[0].inProgress = true
        firstRule.steps[0].isComplete = true
        firstRule.steps[1].inProgress = true
        firstRule.steps[1].isComplete = true
        const rule = procedure.rules[1]
        const resultRule = ProcedureHelper.getCurrentRule(procedure)
        expect(resultRule).toEqual(rule)
    })

    it('should return first rule if not in progress second rule', () => {
        const procedure = getProcedure()
        const firstRule = procedure.rules[0]
        firstRule.steps[0].inProgress = true
        firstRule.steps[0].isComplete = true
        firstRule.steps[1].inProgress = true
        firstRule.steps[1].isComplete = true
        const rule = procedure.rules[1]
        rule.steps[0].inProgress = true
        const resultRule = ProcedureHelper.getCurrentRule(procedure)
        expect(resultRule).toEqual(rule)
    })

    it('should return later rule if earlier complete and not started second rule', () => {
        const procedure = getProcedure()
        const firstRule = procedure.rules[0]
        firstRule.steps[0].inProgress = true
        firstRule.steps[0].isComplete = true
        firstRule.steps[1].inProgress = true
        firstRule.steps[1].isComplete = true
        const rule = procedure.rules[1]
        rule.steps[0].inProgress = true
        rule.steps[0].isComplete = true
        const resultRule = ProcedureHelper.getCurrentRule(procedure)
        expect(resultRule).toEqual(rule)
    })

    it('should return later rule if earlier complete and in progress second rule', () => {
        const procedure = getProcedure()
        const firstRule = procedure.rules[0]
        firstRule.steps[0].inProgress = true
        firstRule.steps[0].isComplete = true
        firstRule.steps[1].inProgress = true
        firstRule.steps[1].isComplete = true
        const rule = procedure.rules[1]
        rule.steps[0].inProgress = true
        rule.steps[0].isComplete = true
        rule.steps[1].inProgress = true
        const resultRule = ProcedureHelper.getCurrentRule(procedure)
        expect(resultRule).toEqual(rule)
    })

    it('should return undefined if all complete second rule', () => {
        const procedure = getProcedure()
        const firstRule = procedure.rules[0]
        firstRule.steps[0].inProgress = true
        firstRule.steps[0].isComplete = true
        firstRule.steps[1].inProgress = true
        firstRule.steps[1].isComplete = true
        const rule = procedure.rules[1]
        rule.steps[0].inProgress = true
        rule.steps[0].isComplete = true
        rule.steps[1].inProgress = true
        rule.steps[1].isComplete = true
        const resultRule = ProcedureHelper.getCurrentRule(procedure)
        expect(resultRule).toEqual(undefined)
    })
})

describe('getCurrentStep', () => {
    it('should return first step if not started first rule', () => {
        const procedure = getProcedure()
        const rule = procedure.rules[0]
        const step = ProcedureHelper.getCurrentStep(procedure)
        expect(step).toEqual(rule.steps[0])
    })

    it('should return first step if not in progress first rule', () => {
        const procedure = getProcedure()
        const rule = procedure.rules[0]
        rule.steps[0].inProgress = true
        const step = ProcedureHelper.getCurrentStep(procedure)
        expect(step).toEqual(rule.steps[0])
    })

    it('should return later step if earlier complete and not started first rule', () => {
        const procedure = getProcedure()
        const rule = procedure.rules[0]
        rule.steps[0].inProgress = true
        rule.steps[0].isComplete = true
        const step = ProcedureHelper.getCurrentStep(procedure)
        expect(step).toEqual(rule.steps[1])
    })

    it('should return later step if earlier complete and in progress first rule', () => {
        const procedure = getProcedure()
        const rule = procedure.rules[0]
        rule.steps[0].inProgress = true
        rule.steps[0].isComplete = true
        rule.steps[1].inProgress = true
        const step = ProcedureHelper.getCurrentStep(procedure)
        expect(step).toEqual(rule.steps[1])
    })


    it('should return first step if not started second rule', () => {
        const procedure = getProcedure()
        const firstRule = procedure.rules[0]
        firstRule.steps[0].inProgress = true
        firstRule.steps[0].isComplete = true
        firstRule.steps[1].inProgress = true
        firstRule.steps[1].isComplete = true
        const rule = procedure.rules[1]
        const step = ProcedureHelper.getCurrentStep(procedure)
        expect(step).toEqual(rule.steps[0])
    })

    it('should return first step if not in progress second rule', () => {
        const procedure = getProcedure()
        const firstRule = procedure.rules[0]
        firstRule.steps[0].inProgress = true
        firstRule.steps[0].isComplete = true
        firstRule.steps[1].inProgress = true
        firstRule.steps[1].isComplete = true
        const rule = procedure.rules[1]
        rule.steps[0].inProgress = true
        const step = ProcedureHelper.getCurrentStep(procedure)
        expect(step).toEqual(rule.steps[0])
    })

    it('should return later step if earlier complete and not started second rule', () => {
        const procedure = getProcedure()
        const firstRule = procedure.rules[0]
        firstRule.steps[0].inProgress = true
        firstRule.steps[0].isComplete = true
        firstRule.steps[1].inProgress = true
        firstRule.steps[1].isComplete = true
        const rule = procedure.rules[1]
        rule.steps[0].inProgress = true
        rule.steps[0].isComplete = true
        const step = ProcedureHelper.getCurrentStep(procedure)
        expect(step).toEqual(rule.steps[1])
    })

    it('should return later step if earlier complete and in progress second rule', () => {
        const procedure = getProcedure()
        const firstRule = procedure.rules[0]
        firstRule.steps[0].inProgress = true
        firstRule.steps[0].isComplete = true
        firstRule.steps[1].inProgress = true
        firstRule.steps[1].isComplete = true
        const rule = procedure.rules[1]
        rule.steps[0].inProgress = true
        rule.steps[0].isComplete = true
        rule.steps[1].inProgress = true
        const step = ProcedureHelper.getCurrentStep(procedure)
        expect(step).toEqual(rule.steps[1])
    })

    it('should return undefined if all complete second rule', () => {
        const procedure = getProcedure()
        const firstRule = procedure.rules[0]
        firstRule.steps[0].inProgress = true
        firstRule.steps[0].isComplete = true
        firstRule.steps[1].inProgress = true
        firstRule.steps[1].isComplete = true
        const rule = procedure.rules[1]
        rule.steps[0].inProgress = true
        rule.steps[0].isComplete = true
        rule.steps[1].inProgress = true
        rule.steps[1].isComplete = true
        const step = ProcedureHelper.getCurrentStep(procedure)
        expect(step).toEqual(undefined)
    })
})

describe('updateProcedure', () => {
    it('updates the procedure', () => {
        const procedure = getProcedure()
        const newProcedure = ProcedureHelper.updateProcedure(
            {name: 'new-name'}, procedure
        )
        expect(newProcedure.name).toEqual('new-name')
    })
})

describe('incrementProcedure', () => {
    fit('updates the rule for the procedure', () => {
        const procedure = getProcedure()
        const board = getBoard()
        const {newProcedure} = ProcedureHelper.incrementProcedure(procedure, board)
        const rule = newProcedure.rules[0]
        const step = rule.steps[0]
        expect(step.inProgress).toEqual(true)
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