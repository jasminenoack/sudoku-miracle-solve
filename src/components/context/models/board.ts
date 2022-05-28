type PencilMarkValue = "valid" | "invalid" | "not_present"

export interface PencilMarks {
    [key: number | string]: PencilMarkValue,
    1: PencilMarkValue,
    2: PencilMarkValue,
    3: PencilMarkValue,
    4: PencilMarkValue,
    5: PencilMarkValue,
    6: PencilMarkValue,
    7: PencilMarkValue,
    8: PencilMarkValue,
    9: PencilMarkValue,
}

export interface Cell {
    value: number | undefined;
    pencilMarks: PencilMarks;
}

export type Board = Cell[]

export class CellHelpers {
    static buildPencilMarks(status: PencilMarkValue = 'not_present'): PencilMarks {
        return {
            1: status,
            2: status,
            3: status,
            4: status,
            5: status,
            6: status,
            7: status,
            8: status,
            9: status,
        }
    }

    static buildCell(value: number | undefined): Cell {
        return {
            value: value,
            pencilMarks: CellHelpers.buildPencilMarks(),
        }
    }

    static copyCell(cell: Cell): Cell {
        const newCell = {...cell}
        newCell.pencilMarks = {...newCell.pencilMarks}
        return newCell
    }

    static addPencilMarksToCell(values: number[], cell: Cell): Cell {
        const newCell = CellHelpers.copyCell(cell);
        const newPencilMarks = {...newCell.pencilMarks}
        values.forEach(value => {
            newPencilMarks[value] = 'valid'
        })
        newCell.pencilMarks = newPencilMarks
        return newCell;
    }

    static addAllPencilMarksToCell(cell: Cell): Cell {
        const newCell = CellHelpers.copyCell(cell);
        newCell.pencilMarks = CellHelpers.buildPencilMarks('valid')
        return newCell;
    }

    static makePencilMarksInvalid(values: number[], cell: Cell): Cell {
        const newCell = CellHelpers.copyCell(cell);
        const newPencilMarks = {...newCell.pencilMarks}
        values.forEach(value => {
            if (newPencilMarks[value] === 'valid') {
                newPencilMarks[value] = 'invalid'
            }
        })
        newCell.pencilMarks = newPencilMarks
        return newCell;
    }

    static removeInvalidPencilMarksFromCell(cell: Cell): Cell {
        const newCell = CellHelpers.copyCell(cell);
        const newPencilMarks = {...newCell.pencilMarks}
        Object.keys(newPencilMarks).forEach(value => {
            if (newPencilMarks[value] === 'invalid') {
                newPencilMarks[value] = 'not_present'
            }
        })
        newCell.pencilMarks = newPencilMarks
        return newCell;
    }

    static removeAllPencilMarksFromCell(cell: Cell): Cell {
        const newCell = CellHelpers.copyCell(cell);
        newCell.pencilMarks = CellHelpers.buildPencilMarks()
        return newCell;
    }
}


export class BoardHelpers {
    static buildBoard(values: (number | undefined)[]): Board {
        return values.map((value) => CellHelpers.buildCell(value))
    }

    static copyBoard(board: Board): Board {
        return board.map(cell => CellHelpers.copyCell(cell))
    }
}