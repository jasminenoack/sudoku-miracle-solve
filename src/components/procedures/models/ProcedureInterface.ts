import {Step} from "../../steps/models/Step";
import {Board} from "../../context/models/board";

export class AbstractProcedure {
    board: Board
    index: number
    steps: Step[]
    name: string = 'unnamed'

    constructor(board: Board, index: number) {
        this.board = board
        this.index = index
        this.steps = this.buildSteps();
    }

    static canRunProcedure(index: number | undefined, board: Board): boolean {
        return true
    }

    buildSteps(): Step[] {
        throw "not implemented"
    }

    getIncompleteSteps() {
        return this.steps.filter(step => !step.isComplete)
    }

    isComplete(): boolean {
        return !this.getIncompleteSteps().length
    }

    completeStep() {
        this.getCurrentStep().complete()
    }

    getCurrentStep() {
        const incompleteSteps = this.getIncompleteSteps()
        return incompleteSteps[0]
    }

    runNext(): void {
        this.getCurrentStep().runStep()
    }
}

// step 1: add all pencil marks in the cell
