import {Step} from "../../steps/models/Step";
import {AbstractProcedure} from "./ProcedureInterface";
import {Board, CellHelpers} from "../../context/models/board";

export class PencilMarksProcedure extends AbstractProcedure {
    name: string = "Add pencil marks"

    addAllPencilMarksStep() {
        CellHelpers.addAllPencilMarksToCell(this.board[this.index])
    }

    static canRunProcedure(index: number | undefined = undefined, board: Board): boolean {
        if (index === undefined) {
            return false
        }
        const cell = board[index!];
        return !cell.value;
    }

    buildSteps() {
        return [
            new Step(
                'Add all pencil marks',
                'Adds all of the possible values as pencil marks',
                [],
                this.addAllPencilMarksStep.bind(this)
            )
        ]
    }
}

// step 1: add all pencil marks in the cell
