import { Cell } from '../../board'
import {FindValueThatExistsInOneLocation} from '../FindValueThatExistsInOneLocation'

function buildCheckerWithNeighbors() {
    const cell: Cell = {
        value: undefined,
        pencilMarks: {
            1: 'valid',
            2: 'not_present',
            3: 'valid',
            4: 'valid',
            5: 'valid',
            6: 'not_present',
            7: 'not_present',
            8: 'not_present',
            9: 'not_present',
        },
        addedValue: false
    }
    // others
    // [1, 2, 3]
    // [2]
    // [3, 5, 7, 8, 9]

    const neighbor1: Cell = {
        value: undefined,
        pencilMarks: {
            1: 'valid',
            2: 'valid',
            3: 'valid',
            4: 'not_present',
            5: 'not_present',
            6: 'not_present',
            7: 'not_present',
            8: 'not_present',
            9: 'not_present',
        },
        addedValue: false
    }

    const neighbor2: Cell = {
        value: 2,
        pencilMarks: {
            1: 'valid',
            2: 'valid',
            3: 'valid',
            4: 'valid',
            5: 'valid',
            6: 'valid',
            7: 'valid',
            8: 'valid',
            9: 'valid',
        },
        addedValue: false
    }

    const neighbor3: Cell = {
        value: undefined,
        pencilMarks: {
            1: 'not_present',
            2: 'not_present',
            3: 'valid',
            4: 'not_present',
            5: 'valid',
            6: 'not_present',
            7: 'valid',
            8: 'not_present',
            9: 'not_present',
        },
        addedValue: false
    }

    return new FindValueThatExistsInOneLocation(
        cell,
        [cell, neighbor1, neighbor2, neighbor3],
    )
}

describe('getValuesFromNeighbor', () => {
    it('should get the value from the cell if it exists', () => {
        const checker = buildCheckerWithNeighbors()
        expect(checker.getValuesFromNeighbor(checker.allCellsInGroup[2])).toEqual([2])
    })

    it('should get the valid pencil marks from the cell if the value does not exist', () => {
        const checker = buildCheckerWithNeighbors()
        expect(checker.getValuesFromNeighbor(checker.allCellsInGroup[1])).toEqual([1, 2, 3])
        expect(checker.getValuesFromNeighbor(checker.allCellsInGroup[3])).toEqual([3, 5, 7])
    })
})

describe('getCellValues', () => {
    it('should return all valid pencil marks', () => {
        const checker = buildCheckerWithNeighbors()
        expect(checker.getCellValues()).toEqual([1, 3, 4, 5])
    });
});

describe('getAllOtherCellValues', () => {
    it('should return all valid pencil marks', () => {
        // others
        // [1, 2, 3]
        // [2]
        // [3, 5, 7]
        const checker = buildCheckerWithNeighbors()
        expect(checker.getAllOtherCellValues()).toEqual([1, 2, 3, 5, 7])
    });
})

describe('getResult', () => {
    it('should return a value if there is a value that only occurs in that cell', () => {
        const checker = buildCheckerWithNeighbors()
        expect(checker.getResult()).toEqual({
            value: 4,
            message: `value 4 only occurs in the target cell`
        })
    })

    it('should not return a value if there is not a value that occurs in only one cell', () => {
        const checker = buildCheckerWithNeighbors()
        checker.allCellsInGroup[0].pencilMarks[4] = 'not_present'
        expect(checker.getResult()).toEqual({
            value: undefined,
            message: `No value occurs only in the target cell. TargetValues: [1,3,5] other values: [1,2,3,5,7]`
        })
    })
})