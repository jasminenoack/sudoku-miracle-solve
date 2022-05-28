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
    static buildPencilMarks(status: PencilMarkValue = 'valid'): PencilMarks {
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
        newCell.pencilMarks = CellHelpers.buildPencilMarks('not_present')
        return newCell;
    }

    static getCurrentPencilMarks(cell: Cell): number[] {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(
            value => cell.pencilMarks[value] == 'valid'
        )
    }

    static isStarted(cell: Cell) {
        return cell.value !== undefined || CellHelpers.getCurrentPencilMarks(cell).length
    }
}


export class BoardHelpers {
    static buildBoard(values: (number | undefined)[]): Board {
        return values.map((value) => CellHelpers.buildCell(value))
    }

    static copyBoard(board: Board): Board {
        return board.map(cell => CellHelpers.copyCell(cell))
    }

    static replaceCells(board: Board, updates: {index: number, newCell: Cell}[]): Board {
        const newBoard = JSON.parse(JSON.stringify(board))
        updates.forEach(({index, newCell}) => {
            newBoard[index] = newCell
        })
        return newBoard
    }

    static getIndexesForRowContaining(index: number): number[] {
        const rowStart = Math.floor(index/9) * 9
        return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(value => rowStart + value)
    }

    static getIndexesForSquareContaining(index: number): number[] {
        const rowSquareStart = Math.floor(index/27) * 27
        const columnStart = index % 9
        const columnSquareStart = Math.floor(columnStart/3) * 3
        const squareStart = rowSquareStart + columnSquareStart
        return [0, 1, 2, 9, 10, 11, 18, 19, 20].map(value => squareStart + value)
    }

    static getIndexesForColumnContaining(index: number): number[] {
        const columnStart = index % 9
        return [0, 9, 18, 27, 36, 45, 54, 63, 72].map(value => columnStart + value)
    }

    static getValuesForIndexes(board: Board, indexes: number[]): number[] {
        return indexes.map(index => board[index].value).filter(value => value).sort() as number[]
    }

    static getIndexesForAdjacentPositiveDiagonals(index: number): number[] {
        const inFirstColumn = index / 9 === Math.floor(index / 9)
        const inLastColumn = (index + 1) / 9 === Math.floor((index + 1) / 9)
        const inFirstRow = index < 9
        const inLastRow = index >= 72

        const indexes = []
        if (!inFirstRow && !inLastColumn) {
            indexes.push(index - 8)
        }

        if (!inLastRow && !inFirstColumn) {
            indexes.push(index + 8)
        }
        return indexes
    }

    static getIndexesForPositiveDiagonals(index: number): number[] {
        let indexes: number[] = [index];
        let indexesToProcess: number[] = [index];

        while (indexesToProcess.length) {
            const newIndex = indexesToProcess.pop()
            const diagonalAdjacent = BoardHelpers.getIndexesForAdjacentPositiveDiagonals(newIndex!)
            const newNumbers = diagonalAdjacent.filter(newIndex => indexes.indexOf(newIndex) === -1)
            indexesToProcess = indexesToProcess.concat(newNumbers)
            indexes = indexes.concat(newNumbers)
        }

        return indexes.sort()
    }
}