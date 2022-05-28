import {Cell, CellHelpers, PencilMarks} from "../board";


function cellWithValue(): Cell {
    return {value: 4, pencilMarks: CellHelpers.buildPencilMarks(), addedValue: false}
}

function cellWithoutValue(): Cell {
    return {value: undefined, pencilMarks: CellHelpers.buildPencilMarks(), addedValue: false}
}

function cellWithPencilMarks(): Cell {
    return {value: undefined, pencilMarks: {
            1: 'valid',
            2: 'not_present',
            3: 'valid',
            4: 'valid',
            5: 'not_present',
            6: 'not_present',
            7: 'valid',
            8: 'not_present',
            9: 'not_present',
        }, addedValue: false}
}

describe('buildPencilMarks', () => {
    it('should build pencil marks with status', () => {
        expect(CellHelpers.buildPencilMarks('not_present')).toEqual({
            1: 'not_present',
            2: 'not_present',
            3: 'not_present',
            4: 'not_present',
            5: 'not_present',
            6: 'not_present',
            7: 'not_present',
            8: 'not_present',
            9: 'not_present',
        })
    })

    it("buidl pencil marks", () => {
        expect(CellHelpers.buildPencilMarks()).toEqual({
            1: 'valid',
            2: 'valid',
            3: 'valid',
            4: 'valid',
            5: 'valid',
            6: 'valid',
            7: 'valid',
            8: 'valid',
            9: 'valid',
        })
    })
})

describe('buildCell', () => {
    it('should build a cell with a value', () => {
        const cell = CellHelpers.buildCell(4)
        expect(cell).toEqual({value: 4, pencilMarks: CellHelpers.buildPencilMarks(), addedValue: false})
    })

    it('should build a cell without a value', () => {
        const cell = CellHelpers.buildCell(undefined)
        expect(cell).toEqual({value: undefined, pencilMarks: CellHelpers.buildPencilMarks(), addedValue: false})
    })
})

describe('copyCell', () => {
    it('should copy a cell with a value', () => {
        const cell = cellWithValue()
        expect(CellHelpers.copyCell(cell)).toEqual(cell)
    })

    it('should copy a cell without a value', () => {
        const cell = cellWithoutValue()
        expect(CellHelpers.copyCell(cell)).toEqual(cell)
    })

    it('should copy a cell with pencil marks', () => {
        const cell = cellWithPencilMarks()
        expect(CellHelpers.copyCell(cell)).toEqual(cell)
    })
})

describe('addPencilMarksToCell', () => {
    it('should add pencil marks where there are none', () => {
        let cell = cellWithValue();
        cell = CellHelpers.removeAllPencilMarksFromCell(cell);
        const newCell = CellHelpers.addPencilMarksToCell([1, 2, 5, 6], cell)
        expect(newCell.pencilMarks).toEqual({
            1: 'valid',
            2: 'valid',
            3: 'not_present',
            4: 'not_present',
            5: 'valid',
            6: 'valid',
            7: 'not_present',
            8: 'not_present',
            9: 'not_present',
        })
    });

    it('should add additional pencil marks if there are some', () => {
        let cell = cellWithPencilMarks();
        const newCell = CellHelpers.addPencilMarksToCell([5, 9], cell)
        expect(newCell.pencilMarks).toEqual({
            1: 'valid',
            2: 'not_present',
            3: 'valid',
            4: 'valid',
            5: 'valid',
            6: 'not_present',
            7: 'valid',
            8: 'not_present',
            9: 'valid',
        })
    });
})

describe('addAllPencilMarksToCell', () => {
    it('should add pencil marks where there are none', () => {
        const cell = cellWithValue();
        const newCell = CellHelpers.addAllPencilMarksToCell(cell)
        expect(newCell.pencilMarks).toEqual({
            1: 'valid',
            2: 'valid',
            3: 'valid',
            4: 'valid',
            5: 'valid',
            6: 'valid',
            7: 'valid',
            8: 'valid',
            9: 'valid',
        })
    });

    it('should add additional pencil marks if there are some', () => {
        const cell = cellWithPencilMarks();
        const newCell = CellHelpers.addAllPencilMarksToCell(cell)
        expect(newCell.pencilMarks).toEqual({
            1: 'valid',
            2: 'valid',
            3: 'valid',
            4: 'valid',
            5: 'valid',
            6: 'valid',
            7: 'valid',
            8: 'valid',
            9: 'valid',
        })
    });
})

describe('removeAllPencilMarksToCell', () => {
    it('removes all pencil marks from the cell', () => {
        const cell = cellWithPencilMarks();
        const newCell = CellHelpers.removeAllPencilMarksFromCell(cell)
        expect(newCell.pencilMarks).toEqual({
            1: 'not_present',
            2: 'not_present',
            3: 'not_present',
            4: 'not_present',
            5: 'not_present',
            6: 'not_present',
            7: 'not_present',
            8: 'not_present',
            9: 'not_present',
        })
    })
})

describe('makePencilMarksInvalid', () => {
    it('should change valid marks to invalid', () => {
        const cell = cellWithPencilMarks();
        const newCell = CellHelpers.makePencilMarksInvalid([3, 7], cell)
        expect(newCell.pencilMarks).toEqual({
            1: 'valid',
            2: 'not_present',
            3: 'invalid',
            4: 'valid',
            5: 'not_present',
            6: 'not_present',
            7: 'invalid',
            8: 'not_present',
            9: 'not_present',
        })
    })

    it('should not change not present marks to invalid', () => {
        const cell = cellWithPencilMarks();
        const newCell = CellHelpers.makePencilMarksInvalid([3, 5], cell)
        expect(newCell.pencilMarks).toEqual({
            1: 'valid',
            2: 'not_present',
            3: 'invalid',
            4: 'valid',
            5: 'not_present',
            6: 'not_present',
            7: 'valid',
            8: 'not_present',
            9: 'not_present',
        })
    })
})

describe('removeInvalidPencilMarksFromCell', () => {
    it('does not remove valid marks', () => {
        const cell = cellWithPencilMarks();
        const newCell = CellHelpers.removeInvalidPencilMarksFromCell(cell)
        expect(newCell.pencilMarks).toEqual(cell.pencilMarks)
    });

    it('removes invalid marks', () => {
        const cell = {value: undefined, pencilMarks: {
            1: 'valid',
            2: 'not_present',
            3: 'valid',
            4: 'invalid',
            5: 'invalid',
            6: 'not_present',
            7: 'valid',
            8: 'invalid',
            9: 'not_present',
        } as PencilMarks, addedValue: false};
        const newCell = CellHelpers.removeInvalidPencilMarksFromCell(cell)
        expect(newCell.pencilMarks).toEqual({
            1: 'valid',
            2: 'not_present',
            3: 'valid',
            4: 'not_present',
            5: 'not_present',
            6: 'not_present',
            7: 'valid',
            8: 'not_present',
            9: 'not_present',
        })
    })
})


describe('getCurrentPencilMarks', () => {
    it('should give the values that are set to valid', () => {
        const cell = cellWithoutValue()
        cell.pencilMarks = {
            1: 'invalid',
            2: 'invalid',
            3: 'valid',
            4: 'invalid',
            5: 'valid',
            6: 'not_present',
            7: 'invalid',
            8: 'not_present',
            9: 'valid',
        }
        expect(CellHelpers.getCurrentPencilMarks(cell)).toEqual([3, 5, 9])
    })
})

describe('isStarted', () => {
    it('is true if has value', () => {
        let cell = cellWithValue()
        cell = CellHelpers.removeAllPencilMarksFromCell(cell);
        expect(CellHelpers.isStarted(cell)).toBeTruthy()
    })

    it('is true if has pencil marks', () => {
        const cell = cellWithPencilMarks()
        expect(CellHelpers.isStarted(cell)).toBeTruthy()
    })

    it('is false if has neither', () => {
        let cell = cellWithoutValue()
        cell = CellHelpers.removeAllPencilMarksFromCell(cell);
        expect(CellHelpers.isStarted(cell)).toBeFalsy()
    })
})

describe('fillInCell', () =>{
    it('should fill in the cell', () => {
        const cell = cellWithPencilMarks()
        const newCell = CellHelpers.fillInCell(cell, 5)
        expect(newCell.value).toEqual(5)
        expect(newCell.addedValue).toBeTruthy()
    })
})