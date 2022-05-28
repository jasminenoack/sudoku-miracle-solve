import {CheckForDeltaAllowableValueGroupedNeighbors} from "../CheckForDeltaAllowableValues";
import {Cell} from "../../board";


function buildCheckerWithNeighbors(value: number = 4, delta: number=4) {
    const cell: Cell = {
        value: undefined,
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
        }
    }

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
        }
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
        }
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
        }
    }

    return new CheckForDeltaAllowableValueGroupedNeighbors(
        value,
        cell,
        [neighbor1, neighbor2, neighbor3],
        delta,
    )
}


describe('getAllAllowableRelatedValues', () => {
    it('should return all values that are the given delta away from the value for middling number', () => {
        const checker = buildCheckerWithNeighbors(5)
        expect(checker.getAllAllowableRelatedValues()).toEqual([1, 9])
    })

    it('should return all values that are the given delta away from the value for low number', () => {
        const checker = buildCheckerWithNeighbors(2)
        expect(checker.getAllAllowableRelatedValues()).toEqual([6, 7, 8, 9])
    })

    it('should return all values that are the given delta away from the value for high number', () => {
        const checker = buildCheckerWithNeighbors(7)
        expect(checker.getAllAllowableRelatedValues()).toEqual([1, 2, 3])
    })

    it('should return all values that are the given delta away from the value for different delta', () => {
        const checker = buildCheckerWithNeighbors(4, 2)
        expect(checker.getAllAllowableRelatedValues()).toEqual([1, 2, 6, 7, 8, 9])
    })
})

describe('getValuesFromNeighbor', () => {
    it('should get the value from the cell if it exists', () => {
        const checker = buildCheckerWithNeighbors(5)
        expect(checker.getValuesFromNeighbor(checker.groupedNeighbors[1])).toEqual([2])
    })

    it('should get the valid pencil marks from the cell if the value does not exist', () => {
        const checker = buildCheckerWithNeighbors(0)
        expect(checker.getValuesFromNeighbor(checker.groupedNeighbors[0])).toEqual([1, 2, 3])
        expect(checker.getValuesFromNeighbor(checker.groupedNeighbors[2])).toEqual([3, 5, 7])
    })
})

describe('getAllPossibleValuesForOtherCells', () => {
    it('should return all possible values for the other cells', () => {
        const checker = buildCheckerWithNeighbors(4, 2)
        // allowable [1, 2, 6, 7, 8, 9]
        // neighbor 1 [1, 2, 3]
        // neighbor 2 [2]
        // neighbor 3 [3, 5, 7]
        expect(checker.getAllPossibleValuesForOtherCells()).toEqual([
            [1, 2],
            [2],
            [7],
        ])
    })
})

describe('allOtherValuesCanExistTogether', () => {
    it('returns false if any cell has no values', () => {
        // initial value: 5 delta: 3
        // allowable [1, 2, 8, 9]
        // neighbor 1 [1, 2, 3]
        // neighbor 2 [2]
        // neighbor 3 [3, 5, 7]
        const checker = buildCheckerWithNeighbors(5, 3)
        expect(checker.allOtherValuesCanExistTogether()).toEqual({
            valid: false, message: `Neighbor values could not exist together: [1,2] & [2] & []`
        })
    })

    it('returns false if any cell have to share values', () => {
        // initial value: 4 delta: 2
        // allowable [1, 2, 7, 8, 9]
        // neighbor 1 [1, 2, 3] reset to [2, 3]
        // neighbor 2 [2]
        // neighbor 3 [3, 5, 7]
        const checker = buildCheckerWithNeighbors(4, 2)
        checker.groupedNeighbors[0].pencilMarks[1] = 'invalid'
        expect(checker.allOtherValuesCanExistTogether()).toEqual({
            valid: false, message: `Neighbor values could not exist together: [2] & [2] & [7]`
        })
    })

    it('returns true if all cells can use different values', () => {
        // allowable [1, 2, 6, 7, 8, 9]
        // neighbor 1 [1, 2, 3]
        // neighbor 2 [2]
        // neighbor 3 [3, 5, 7]
            const checker = buildCheckerWithNeighbors(4, 2)
            expect(checker.allOtherValuesCanExistTogether()).toEqual({
            valid: true,
            message: `Neighbor values could exist together: [1,2] & [2] & [7]`
        })
    })

    it('returns true if tons of options', () => {
        // allowable [1, 2, 3, 5, 6, 7, 8, 9]
        // neighbor 1 [1, 2, 3]
        // neighbor 2 [2]
        // neighbor 3 [3, 5, 7]
        const checker = buildCheckerWithNeighbors(4, 1)
        expect(checker.allOtherValuesCanExistTogether()).toEqual({
            valid: true,
            message: `Neighbor values could exist together: [1,2,3] & [2] & [3,5,7]`
        })
    })
})