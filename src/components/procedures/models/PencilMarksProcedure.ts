import {BoardRepresentation} from "../../board/models/BoardRepresentation";
import {Step} from "../../steps/models/Step";

export class PencilMarksProcedure {
    board: BoardRepresentation
    index: number
    steps: Step[]

    constructor(board: BoardRepresentation, index: number) {
        this.board = board
        this.index = index
        this.steps = this.buildSteps();
    }

    canRunProcedure() {
        return true
    }

    addAllPencilMarksStep() {
        this.board.getCell(this.index).addAllPencilMarks()
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

    _getIncompleteSteps() {
        return this.steps.filter(step => !step.isComplete)
    }

    isComplete() {
        return !this._getIncompleteSteps().length
    }

    runNext() {
        const incompleteSteps = this._getIncompleteSteps()
        const firstStep = incompleteSteps[0]
        firstStep.runStep()
    }
}

// step 1: add all pencil marks in the cell
