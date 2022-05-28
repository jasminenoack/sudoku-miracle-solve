import {DomClassHelper} from "../procedures";

describe('DomClassHelper', () => {
    it('builds dom class', () => {
        const domClass = DomClassHelper.buildDomClass(
            'test-row',
            [18, 19, 20, 21, 22, 23, 24, 25, 26]
        )
        expect(domClass).toEqual({
            className: 'test-row',
            indexes: {
                18: true,
                19: true,
                20: true,
                21: true,
                22: true,
                23: true,
                24: true,
                25: true,
                26: true,
            }
        })
    })
})