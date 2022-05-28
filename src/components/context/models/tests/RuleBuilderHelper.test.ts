import {RuleBuilderHelper, DomClassHelper, Rule, StepHelper, StepBuilderHelper} from "../procedures";
import {BoardHelpers} from "../board";
import {beginnerPuzzle1} from "../../../../puzzle-data/beginner-puzzles";

function getBoard() {
    return BoardHelpers.buildBoard(beginnerPuzzle1);
}

function getAllValuesRule (): Rule {
    const board = getBoard()

    return {
        name: 'All values can be made',
        steps: [
            StepBuilderHelper.buildAddAllValuesStep(board, 4)
        ]
    }
}

function getOnlyOneRule (): Rule {
    const board = getBoard()

    return {
        name: 'Values only occur once in a column, row, or square',
        steps: [
            StepBuilderHelper.buildOncePerSquareStep(board, 4),
            StepBuilderHelper.buildOncePerRowStep(board, 4),
            StepBuilderHelper.buildOncePerColumnStep(board, 4)
        ]
    }
}

describe('buildAllValuesPossibleRule', () => {
    it('build rule', () => {
        const board = getBoard()
        const rule = RuleBuilderHelper.buildAllValuesPossibleRule(board, 4)
        expect(JSON.stringify(rule)).toEqual(JSON.stringify(getAllValuesRule()))
    })
})

describe('buildOnlyOncePerRule', () => {
    const board = getBoard();
    const rule = RuleBuilderHelper.buildOnlyOncePerRule(board, 4);
    expect(JSON.stringify(rule)).toEqual(JSON.stringify(getOnlyOneRule()))
})
