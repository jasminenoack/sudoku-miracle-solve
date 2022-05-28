import {
    RuleBuilderHelper,
    DomClassHelper,
    ProcedureBuilderHelper,
    Procedure,
    Rule,
    StepHelper
} from "../procedures";
import {BoardHelpers} from "../board";
import {beginnerPuzzle1} from "../../../../puzzle-data/beginner-puzzles";


function getBoard() {
    return BoardHelpers.buildBoard(beginnerPuzzle1);
}


function getProcedure() {
    const board = getBoard()
    return {
        name: 'Add pencil marks',
        board: board,
        index: 4,
        rules: [
            RuleBuilderHelper.buildAllValuesPossibleRule(board, 4),
            RuleBuilderHelper.buildOnlyOncePerRule(board, 4),
        ]
    }
}

describe('buildProcedure', () => {
    it('builds a pencil marks procedure', () => {
        const board = getBoard()
        const procedure = ProcedureBuilderHelper.buildPencilMarksProcedure(board, 4);
        expect(JSON.stringify(procedure)).toEqual(JSON.stringify(getProcedure()))
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