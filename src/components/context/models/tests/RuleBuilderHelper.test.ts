import {RuleBuilderHelper, DomClassHelper, Rule, StepHelper, StepBuilderHelper} from "../procedures";
import {BoardHelpers} from "../board";
import {beginnerPuzzle1} from "../../../../puzzle-data/beginner-puzzles";

function getBoard() {
    return BoardHelpers.buildBoard(beginnerPuzzle1);
}

function getAllValuesRule (): Rule {
    return {
        name: 'All values can be made',
        steps: [
            StepBuilderHelper.buildAddAllValuesStep(4)
        ]
    }
}

function getOnlyOneRule (): Rule {
    return {
        name: 'Values only occur once in a column, row, or square',
        steps: [
            StepBuilderHelper.buildOncePerSquareStep(4),
            StepBuilderHelper.buildOncePerRowStep(4),
            StepBuilderHelper.buildOncePerColumnStep(4)
        ]
    }
}

function getPositiveDiagonalDeltaFour() {
    return {
        name: 'Values adjacent in positive diagonals must be 4 greater than or equal to the next number',
        steps: [
            StepBuilderHelper.buildPositiveDiagonalDeltaFour(4),
        ]
    }
}

describe('buildAllValuesPossibleRule', () => {
    it('build rule', () => {
        const board = getBoard()
        const rule = RuleBuilderHelper.buildAllValuesPossibleRule(4)
        expect(JSON.stringify(rule)).toEqual(JSON.stringify(getAllValuesRule()))
    })
})

describe('buildOnlyOncePerRule', () => {
    const board = getBoard();
    const rule = RuleBuilderHelper.buildOnlyOncePerRule(4);
    expect(JSON.stringify(rule)).toEqual(JSON.stringify(getOnlyOneRule()))
})

describe('getPositiveDiagonalDeltaFour', () => {
    const board = getBoard();
    const rule = RuleBuilderHelper.buildPositiveDiagonalDeltaFour(4);
    expect(JSON.stringify(rule)).toEqual(JSON.stringify(getPositiveDiagonalDeltaFour()))
})
