import {Board, BoardHelpers, CellHelpers} from "./board";

export interface DomClass {
    className: string,
    // dict used as a set
    indexes: {[key: number]: boolean},
}

type updateForStepFunction = (step: Step) => {newBoard: Board, newStep: Step}

export interface Step {
    name: string,
    descriptionOfChange: string,
    domClasses: DomClass[],
    updateForStep: updateForStepFunction,
    isComplete: boolean,
    inProgress: boolean,
    completeStep?: updateForStepFunction,
}

export interface OptionalStep {
    name?: string,
    descriptionOfChange?: string,
    domClasses?: DomClass[],
    updateForStep?: updateForStepFunction,
    isComplete?: boolean,
    inProgress?: boolean,
    completeStep?: updateForStepFunction,
}

export interface Rule {
    name: string;
    steps: Step[],
}

export interface OptionalRule {
    name?: string;
    steps?: Step[],
}

export interface Procedure {
    board: Board,
    index: number,
    name: string,
    rules: Rule[],
}

export interface OptionalProcedure {
    board?: Board,
    index?: number,
    name?: string,
    rules?: Rule[],
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

    static buildStep(
        name: string,
        domClasses: DomClass[],
        updateForStep: updateForStepFunction,
        completeStep?: updateForStepFunction,
    ) {
        return {
            name,
            descriptionOfChange: '',
            domClasses,
            updateForStep,
            isComplete: false,
            inProgress: false,
            completeStep,
        }
    }

    static updateStep(newValues: OptionalStep, oldStep: Step): Step {
        return {...oldStep, ...newValues}
    }

    static incrementStep(step: Step, board: Board): {newStep: Step, newBoard: Board} {
        if (step.inProgress) {
            let newStep: Step, newBoard: Board;
            if (step.completeStep) {
                const results = step.completeStep(step)
                newBoard = results.newBoard
                newStep = results.newStep
            } else {
                newStep = step
                newBoard = board
            }
            return {
                newStep: StepHelper.updateStep({isComplete: true}, newStep!),
                newBoard,
            }
        } else {
            const {newStep, newBoard} = step.updateForStep(step)
            return {
                newStep: StepHelper.updateStep({inProgress: true}, newStep),
                newBoard,
            }
        }
    }
}

export class RuleHelper {
    static getCurrentStep(rule: Rule): Step | undefined {
        const steps = rule.steps.filter(step => !step.isComplete)
        return steps[0];
    }

    static updateRule(newValues: OptionalRule, rule: Rule): Rule {
        const newSteps = rule.steps.map(step => StepHelper.updateStep({}, step))
        return {...rule, steps: newSteps, ...newValues}
    }

    static incrementRule(rule: Rule, board: Board): {newRule: Rule, newBoard: Board} {
        const step = RuleHelper.getCurrentStep(rule)
        if (!step) {
            throw "cannot call without step"
        }
        const stepIndex = rule.steps.indexOf(step)
        const {newStep, newBoard} = StepHelper.incrementStep(step, board)
        const newRule = RuleHelper.updateRule({}, rule)
        newRule.steps[stepIndex] = newStep
        return {
            newRule,
            newBoard,
        }
    }
}

export class ProcedureHelper {
    static getCurrentRule(procedure: Procedure): Rule | undefined {
        const rules = procedure.rules.filter(rule => RuleHelper.getCurrentStep(rule))
        return rules[0]
    }

    static getCurrentStep(procedure: Procedure): Step | undefined {
        const rule = ProcedureHelper.getCurrentRule(procedure)
        if (rule) {
            return RuleHelper.getCurrentStep(rule)
        }
    }

    static updateProcedure(newValues: OptionalProcedure, procedure: Procedure): Procedure {
        const newRules = procedure.rules.map(rule => RuleHelper.updateRule({}, rule))
        return {
            ...procedure,
            rules: newRules,
            ...newValues,
        }
    }

    static incrementProcedure(procedure: Procedure, board: Board): {newProcedure: Procedure, newBoard: Board} {
        const rule = ProcedureHelper.getCurrentRule(procedure)
        if (!rule) {
            throw 'cannot call without rule'
        }
        const ruleIndex = procedure.rules.indexOf(rule)
        const newProcedure = ProcedureHelper.updateProcedure({}, procedure)
        const {newRule, newBoard} = RuleHelper.incrementRule(rule, board)
        newProcedure.rules[ruleIndex] = newRule
        return {newBoard, newProcedure}
    }
}

export class StepBuilderHelper {
    static processingClassName: string = 'processing-cell'
    static scanningClassName: string = 'scanning'

    static buildAddAllValuesStep(board: Board, index: number) {
        function buildProcessing(step: Step): {newBoard: Board, newStep: Step} {
            const newStep = StepHelper.updateStep(
                {descriptionOfChange: 'Adds all possible values to the cell'},
                step,
            )
            const newCell = CellHelpers.addAllPencilMarksToCell(board[index])
            const newBoard = BoardHelpers.replaceCells(
                board,
                [{index, newCell}]
            )
            return {
                newStep,
                newBoard,
            }
        }
        return StepHelper.buildStep(
            'Adding all values',
            [
                DomClassHelper.buildDomClass(
                    StepBuilderHelper.processingClassName,
                    [index]
                ),
            ],
            buildProcessing,
        )
    }

    static _buildOncePerStep(board: Board, index: number, indexes: number[], type: string): Step {
        function processingFunction(step: Step): {newBoard: Board, newStep: Step} {
            const indexes = step.domClasses[1].indexes
            const values = BoardHelpers.getValuesForIndexes(board, Object.keys(indexes).map(num => +num))
            const cell = board[index]
            const newCell = CellHelpers.makePencilMarksInvalid(values, cell)
            const newStep = StepHelper.updateStep(
                {descriptionOfChange: `Marking values in ${type} (${values.join(', ')}) as invalid`},
                step,
            )
            const newBoard = BoardHelpers.replaceCells(
                board,
                [{index, newCell}]
            )
            return {
                newStep,
                newBoard,
            }
        }

        function completeFunction(step: Step): {newBoard: Board, newStep: Step} {
            const cell = board[index]
            const newCell = CellHelpers.removeInvalidPencilMarksFromCell(cell)
            const newBoard = BoardHelpers.replaceCells(
                board,
                [{index, newCell}]
            )
            return {
                newBoard,
                newStep: step,
            }
        }
        return StepHelper.buildStep(
            `Values can only occur once per ${type}`,
            [
                DomClassHelper.buildDomClass(
                    StepBuilderHelper.processingClassName,
                    [index],
                ),
                DomClassHelper.buildDomClass(
                    StepBuilderHelper.scanningClassName,
                    indexes,
                ),
            ],
            processingFunction,
            completeFunction,
        )
    }

    static buildOncePerColumnStep(board: Board, index: number): Step {
        return StepBuilderHelper._buildOncePerStep(board, index, BoardHelpers.getIndexesForColumnContaining(index), 'column')
    }

    static buildOncePerRowStep(board: Board, index: number): Step {
        return StepBuilderHelper._buildOncePerStep(board, index, BoardHelpers.getIndexesForRowContaining(index), 'row')
    }

    static buildOncePerSquareStep(board: Board, index: number): Step {
        return StepBuilderHelper._buildOncePerStep(board, index, BoardHelpers.getIndexesForSquareContaining(index), 'square')
    }
}

export class RuleBuilderHelper {
    static buildAllValuesPossibleRule (board: Board, index: number) {
        return {
            name: 'All values can be made',
            steps: [
                StepBuilderHelper.buildAddAllValuesStep(board, index)
            ]
        }
    }

    static buildOnlyOncePerRule(board: Board, index: number): Rule {
        return {
            name: 'Values only occur once in a column, row, or square',
            steps: [
                StepBuilderHelper.buildOncePerSquareStep(board, index),
                StepBuilderHelper.buildOncePerRowStep(board, index),
                StepBuilderHelper.buildOncePerColumnStep(board, index)
            ]
        }
    }
}

export class ProcedureBuilderHelper {
    static buildPencilMarksProcedure (board: Board, index: number) {
        return {
            name: 'Add pencil marks',
            board: board,
            index: index,
            rules: [
                RuleBuilderHelper.buildAllValuesPossibleRule(board, index),
                RuleBuilderHelper.buildOnlyOncePerRule(board, index),
            ]
        }
    }
}

