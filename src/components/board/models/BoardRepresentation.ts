import {CellRepresentation} from './CellRepresentation';

export class BoardRepresentation {
    cells: CellRepresentation[];

    constructor(values: (number | undefined)[]) {
        this.cells = values.map((value) => new CellRepresentation(value))
    }

    getIndex(row: number, column: number) {
        return row * 9 + column;
    }

    getRowIndexesFromIndex(index: number) {
        const rowStart = Math.floor(index/9) * 9;
        return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(
            (delta) => rowStart + delta
        )
    }

    getColumnIndexesFromIndex(index: number) {
        const columnStart = index % 9;
        return [0, 9, 18, 27, 36, 45, 54, 63, 72].map(
            (delta) => columnStart + delta
        )
    }

    getSquareIndexesFromIndex(index: number) {
        const columnStart = index % 9;
        const boxColumn = Math.floor(columnStart / 3) * 3
        const rowStart = Math.floor(index/27) * 27;
        const squareStart = rowStart + boxColumn
        return [0, 1, 2, 9, 10, 11, 18, 19, 20].map(
            (delta) => squareStart + delta
        )
    }

    getCellValue(index: number) {
        return this.getCell(index).getValue()
    }

    getCell(index: number) {
        return this.cells[index]
    }

    getValuesInRowContaining(index: number) {
        const indexes = this.getRowIndexesFromIndex(index)
        const values = indexes.map(index => this.cells[index].getValue())
        return values.filter(value => value).sort()
    }

    getValuesInColumnContaining(index: number) {
        const indexes = this.getColumnIndexesFromIndex(index)
        const values = indexes.map(index => this.cells[index].getValue())
        return values.filter(value => value).sort()
    }

    getValuesInSquareContaining(index: number) {
        const indexes = this.getSquareIndexesFromIndex(index)
        const values = indexes.map(index => this.cells[index].getValue())
        return values.filter(value => value).sort()
    }
}
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