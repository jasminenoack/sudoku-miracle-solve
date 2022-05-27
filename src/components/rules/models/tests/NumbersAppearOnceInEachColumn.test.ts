import {NumbersAppearOnceInEachColumn} from '../NumbersAppearOnceInEachColumn';
import {BoardRepresentation} from "../../../board/models/BoardRepresentation";
import {beginnerPuzzle1} from "../../../../puzzle-data/beginner-puzzles";


function buildRule() {
    const board = new BoardRepresentation(beginnerPuzzle1)
    return new NumbersAppearOnceInEachColumn(15, board)
}


describe('NumbersAppearOnceInEachColumn', () => {
    describe('constructor', () => {
        it('should build the steps', () => {

        })
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