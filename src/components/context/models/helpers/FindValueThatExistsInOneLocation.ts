import { Cell, CellHelpers } from "../board"

export class FindValueThatExistsInOneLocation {
    cell: Cell
    // this is expected to have a duplicate of the cell above
    allCellsInGroup: Cell[]

    constructor(cell: Cell, allCellsInGroup: Cell[]) {
        this.cell = cell 
        this.allCellsInGroup = allCellsInGroup
    }

    getValuesFromNeighbor(cell: Cell): number[] {
        if (cell.value) {
            return [cell.value]
        } else {
            return CellHelpers.getCurrentPencilMarks(cell)
        }
    }
    
    getCellValues(): number[] {
        return CellHelpers.getCurrentPencilMarks(this.cell)
    }

    getAllOtherCellValues(): number[] {
        const allValues = new Set()
        this.allCellsInGroup.forEach(cell => {
            if (cell !== this.cell) {
                const values = this.getValuesFromNeighbor(cell)
                values.forEach(value => allValues.add(value))
            }
        })
        return Array.from(allValues) as number[]
    }

    getResult(): {value?: number, message: string} {
        const cellValues = this.getCellValues()
        const neighborValues = this.getAllOtherCellValues()

        const uniqueValues = cellValues.filter(value => neighborValues.indexOf(value) === -1)
        if (uniqueValues.length == 1) {
            return {
                value: uniqueValues[0],
                message: `value ${uniqueValues[0]} only occurs in the target cell`
            }
        } else if (uniqueValues.length < 1) {
            return {
                value: undefined,
                message: `No value occurs only in the target cell. TargetValues: [${cellValues}] other values: [${neighborValues}]`
            }
        } else {
            throw "something bad happened"
        }

    }
}