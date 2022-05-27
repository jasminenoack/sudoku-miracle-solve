import {CellRepresentation} from '../CellRepresentation'

function buildCellWithValue() {
    return new CellRepresentation(4)
}

function buildCellWithoutValue() {
    return new CellRepresentation(undefined)
}

describe("cell", () => {
    describe("constructor", () => {
        it('builds a cell', () => {
            const cell = buildCellWithValue()
            expect(cell.value).toEqual(4);
        });
    })

    describe('getValue', () => {
        it('returns value from cell', () => {
            const cell = buildCellWithValue()
            expect(cell.getValue()).toEqual(4)
        })

        it('returns undefined from cell', () => {
            const cell = buildCellWithoutValue()
            expect(cell.getValue()).toEqual(undefined)
        })
    });

    describe('pencil marks', () => {
        describe('addAllPencilMarks', () => {
            it('adds all values as pencil marks', () => {
                const cell = buildCellWithoutValue()
                cell.addAllPencilMarks()
                expect(cell.getPencilValues()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
            })

            it('handles if there are already values', () => {
                const cell = buildCellWithoutValue()
                cell.addPencilMarks([1, 4, 6])
                expect(cell.getPencilValues()).toEqual([1, 4, 6])
                cell.addAllPencilMarks()
                expect(cell.getPencilValues()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
            })
        })

        describe('addPencilMarks', () => {
            it('adds all values as pencil marks', () => {
                const cell = buildCellWithoutValue()
                cell.addPencilMarks([1, 4, 6])
                expect(cell.getPencilValues()).toEqual([1, 4, 6])
            })

            it('adds additional pencil marks', () => {
                const cell = buildCellWithoutValue()
                cell.addPencilMarks([1, 4, 6])
                expect(cell.getPencilValues()).toEqual([1, 4, 6])
                cell.addPencilMarks([2, 9])
                expect(cell.getPencilValues()).toEqual([1, 2, 4, 6, 9])
            })
        })

        describe('markPencilMarksAsInvalid', () => {
            it('should mark some pencil marks as invalid', () => {
                const cell = buildCellWithoutValue()
                cell.addPencilMarks([1, 2, 4, 6, 8])
                cell.markPencilMarksAsInvalid([2, 6])
                const values = cell.pencilMarks.map(mark => [mark.value, mark.invalid])
                expect(values).toEqual([
                    [1, false],
                    [2, true],
                    [4, false],
                    [6, true],
                    [8, false]
                ])
            })
        })

        describe('removePencilMarks', () => {
            it('removes some pencil marks', () => {
                const cell = buildCellWithoutValue()
                cell.addPencilMarks([1, 2, 4, 6, 8])
                cell.removePencilMarks([2, 6])
                expect(cell.getPencilValues()).toEqual([1, 4, 8])
            })
        })

        describe('removeAllPencilMarks', () => {
            it('removes all pencil marks', () => {
                const cell = buildCellWithoutValue()
                cell.addPencilMarks([1, 2, 4, 6, 8])
                cell.removeAllPencilMarks()
                expect(cell.getPencilValues()).toEqual([])
            })
        })
    })
})