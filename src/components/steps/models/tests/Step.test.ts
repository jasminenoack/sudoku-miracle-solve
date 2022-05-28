import {DomClass, Step} from "../Step";

function buildStep() {
    function run (step: Step) {
        step.description = 'new description'
    }
    return new Step(
        "test step",
        'detail',
        [
            new DomClass('test', [0, 1, 2, 3, 4, 5, 6, 7, 8]),
            new DomClass('other-test', [3, 12, 21, 30, 39, 48, 57, 66, 75])
        ],
        run
    )
}

describe('Step', () => {
    describe('complete', () => {
        it('completes the step', () => {
            const step = buildStep()
            expect(step.isComplete).toBeFalsy()
            step.complete()
            expect(step.isComplete).toBeTruthy()
        });
    })

    describe('getClasses', () => {
        it('returns no class for unaffected index', () => {
            const step = buildStep()
            expect(step.getClasses(67)).toEqual([])
        });

        it('returns single class for index', () => {
            const step = buildStep()
            expect(step.getClasses(1)).toEqual(['test'])
        });

        it('returns multiple classes for index', () => {
            const step = buildStep()
            expect(step.getClasses(3)).toEqual(['test', 'other-test'])
        });
    })

    describe('runStep', () => {
        it('runs code sent in during run step', () => {
            const step = buildStep()
            step.runStep()
            expect(step.description).toEqual('new description')
        })

        it('marks the step as complete', () => {
            const step = buildStep()
            step.runStep()
            expect(step.inProgress).toBeTruthy()
            expect(step.isComplete).toBeFalsy()
        })
    })
})