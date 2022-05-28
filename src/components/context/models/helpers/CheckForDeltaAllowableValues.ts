import {Cell, CellHelpers} from "../board";

export class CheckForDeltaAllowableValueGroupedNeighbors {
    /*
    * Checks that cells that are neighbors can all have the correct values.
    *
    * neighbor assumptions:
    * - the cell and all neighbors must have a unique value (they are all in an only one group)
    * */
    value: number
    cell: Cell
    // cells that are neighbors
    groupedNeighbors: Cell[]
    // minimum allowable delta
    delta: number

    constructor(value: number, cell: Cell, groupedNeighbors: Cell[], delta: number) {
        this.value = value
        this.cell = cell
        this.groupedNeighbors = groupedNeighbors
        this.delta = delta
    }

    getAllAllowableRelatedValues(): number[] {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(
            value => value <= this.value - this.delta || value >= this.value + this.delta
        )
    }

    getValuesFromNeighbor(cell: Cell): number[] {
        if (cell.value) {
            return [cell.value]
        } else {
            return CellHelpers.getCurrentPencilMarks(cell)
        }
    }

    getAllPossibleValuesForOtherCells(): number[][] {
        const allowableValues = this.getAllAllowableRelatedValues()
        const neighborValues = this.groupedNeighbors.map(cell => this.getValuesFromNeighbor(cell))
        return neighborValues.map(valueSet => (
            valueSet.filter(value => allowableValues.indexOf(value) != -1)
        ))
    }

    allOtherValuesCanExistTogether(): {valid: boolean, message: string} {
        const possibleValues = this.getAllPossibleValuesForOtherCells()

        let finalValueSets: number[][] = [[]]
        possibleValues.forEach((values) => {
            let newValueSets: number[][] = []
            values.forEach(value => {
                const goodValueSets = finalValueSets.filter(valueSet => valueSet.indexOf(value) === -1)
                newValueSets = newValueSets.concat(goodValueSets.map((values) => [...values, value]))
            })
            finalValueSets = newValueSets
            if (finalValueSets.length == 0) {
                return
            }
        })

        const valid = !!finalValueSets.length

        const message = `Neighbor values ${valid ? 'could' : 'could not'} exist together: [${possibleValues.join('] & [')}]`

        return {valid, message}
    }
}