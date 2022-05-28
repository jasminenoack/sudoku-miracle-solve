import {Board} from "./board";

export interface DomClass {
    className: string,
    // dict used as a set
    indexes: {[key: number]: boolean},
}

export interface Step {
    name: string,
    description: string,
    domClasses: DomClass[],
    updateForStep: (step: Step) => void,
    isComplete: boolean,
    inProgress: boolean,
}

export interface Rule {
    steps: Step[],
}

export interface Procedure {
    board: Board,
    index: number,
    name: string,
    rules: Rule,
}

export class DomClassHelper {
    static buildDomClass(className: string, values: number[]): DomClass {
        const valuesDict: {[key: number]: boolean} = {}
        values.forEach(value => valuesDict[value] = true)
        return {
            className,
            indexes: valuesDict
        }
    }
}

export class StepHelper {
    static getClassesByIndex(domClasses: DomClass[]) {
        const classesByIndex: {[key: number]: string[]} = {}
        domClasses.forEach(domClass => {
            Object.keys(domClass.indexes).forEach(index => {
                if (!classesByIndex[+index]) {
                    classesByIndex[+index] = []
                }
                classesByIndex[+index].push(domClass.className)
            })
        })
        return classesByIndex
    }
}

export class RuleHelper {

}

export class ProcedureHelper {

}

