import {DomClassHelper, RuleHelper, Step, StepHelper} from "../procedures";
import {BoardHelpers} from "../board";
import {beginnerPuzzle1} from "../../../../puzzle-data/beginner-puzzles";

function getBoard() {
    return BoardHelpers.buildBoard(beginnerPuzzle1);
}

function getRule () {
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
    const step2 = StepHelper.buildStep('step-1', domClasses2, fun2)

    return {
        name: 'test',
        steps: [
            step1, step2
        ]
    }
}

describe('getCurrentStep', () => {
    it('should return first step if not started', () => {
        const rule = getRule()
        const step = RuleHelper.getCurrentStep(rule)
        expect(step).toEqual(rule.steps[0])
    })

    it('should return first step if not in progress', () => {
        const rule = getRule()
        rule.steps[0].inProgress = true
        const step = RuleHelper.getCurrentStep(rule)
        expect(step).toEqual(rule.steps[0])
    })

    it('should return later step if earlier complete and not started', () => {
        const rule = getRule()
        rule.steps[0].inProgress = true
        rule.steps[0].isComplete = true
        const step = RuleHelper.getCurrentStep(rule)
        expect(step).toEqual(rule.steps[1])
    })

    it('should return later step if earlier complete and in progress', () => {
        const rule = getRule()
        rule.steps[0].inProgress = true
        rule.steps[0].isComplete = true
        rule.steps[1].inProgress = true
        const step = RuleHelper.getCurrentStep(rule)
        expect(step).toEqual(rule.steps[1])
    })

    it('should return undefined if all complete', () => {
        const rule = getRule()
        rule.steps[0].inProgress = true
        rule.steps[0].isComplete = true
        rule.steps[1].inProgress = true
        rule.steps[1].isComplete = true
        const step = RuleHelper.getCurrentStep(rule)
        expect(step).toEqual(undefined)
    })
})

describe('update rule', () => {
    it('should update rule', () => {
        const rule = getRule();
        const newRule = RuleHelper.updateRule({name: 'new-name'}, rule)
        expect(newRule.name).toEqual('new-name')
    })
});

describe('incrementRule', () => {
    it('should update rule', () => {
        const board = getBoard()
        const rule = getRule()

        const {newRule} = RuleHelper.incrementRule(rule, board)
        const newStep = newRule.steps[0]
        expect(newStep.descriptionOfChange).toEqual('new-description')
        expect(newStep.inProgress).toEqual(true)
    })
})