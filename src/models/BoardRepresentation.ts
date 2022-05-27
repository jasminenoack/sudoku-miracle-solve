import {CellRepresentation} from './CellRepresentation';

export class BoardRepresentation {
    cells: CellRepresentation[];

    constructor(values: (number | undefined)[]) {
        this.cells = values.map((value) => new CellRepresentation(value))
    }

    getCellValue(row: number, column: number) {
        return this.cells[row * 9 + column].getValue()
    }
}
