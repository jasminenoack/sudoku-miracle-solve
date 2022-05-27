import {BoardRepresentation} from "../../board/models/BoardRepresentation";
import {CellRepresentation} from "../../board/models/CellRepresentation";
import {Step} from "../../steps/models/Step";

export class NumbersAppearOnceInEachColumn {
    /*
    * This is the rule that a number can only appear once per column
    *
    * */
    index: number
    board: BoardRepresentation
    cell: CellRepresentation
    steps: Step[]

    constructor(index: number, board: BoardRepresentation) {
        this.index = index
        this.board = board
        this.cell = board.getCell(index)
        this.steps = this.buildSteps()
    }

    buildSteps() {
        return []
    }
}


// step 1: find the column containing the cell
// step 2: get the numbers that are contained in that column
// step 3: find the numbers that are penciled into the cell and also the column
// step 4: remove the pencil marks from that column that are already in the row