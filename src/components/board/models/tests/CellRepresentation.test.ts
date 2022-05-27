import {CellRepresentation} from '../CellRepresentation'

describe("cell", () => {
    describe("constructor", () => {
        it('builds a cell', () => {
            const cell = new CellRepresentation(4)
            expect(cell.value).toEqual(4);
        });
    })

    describe('getValue', () => {
        it('returns value from cell', () => {
            const cell = new CellRepresentation(4)
            expect(cell.getValue()).toEqual(4)
        })

        it('returns undefined from cell', () => {
            const cell = new CellRepresentation(undefined)
            expect(cell.getValue()).toEqual(undefined)
        })
    });
})