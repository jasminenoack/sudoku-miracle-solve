import {Board, BoardHelpers, CellHelpers, Cell} from "./board";
import {CheckForDeltaAllowableValueGroupedNeighbors} from "./helpers/CheckForDeltaAllowableValues";

export interface DomClass {
    className: string,
    // dict used as a set
    indexes: {[key: number]: boolean},
}

type updateForStepFunction = (step: Step, board: Board) => {newBoard: Board, newStep: Step}

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
    disabled?: boolean,
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
                const results = step.completeStep(step, board)
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
            const {newStep, newBoard} = step.updateForStep(step, board)
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
        const {newRule, newBoard} = RuleHelper.incrementRule(rule, board)
        const newProcedure = ProcedureHelper.updateProcedure({board: newBoard}, procedure)
        newProcedure.rules[ruleIndex] = newRule
        return {newBoard, newProcedure}
    }
}

export class StepBuilderHelper {
    static processingClassName: string = 'processing-cell'
    static scanningClassName: string = 'scanning'

    static defaultCompleteStep(step: Step, board: Board, index: number): {newBoard: Board, newStep: Step} {
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

    static buildAddAllValuesStep(index: number) {
        function buildProcessing(step: Step, board: Board): {newBoard: Board, newStep: Step} {
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

    static _buildOncePerStep(index: number, indexes: number[], type: string): Step {
        function processingFunction(step: Step, board: Board): {newBoard: Board, newStep: Step} {
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

        function completeStep(step: Step, board: Board): {newBoard: Board, newStep: Step} {
            return StepBuilderHelper.defaultCompleteStep(step, board, index)
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
            completeStep,
        )
    }

    static buildOncePerColumnStep(index: number): Step {
        return StepBuilderHelper._buildOncePerStep(index, BoardHelpers.getIndexesForColumnContaining(index), 'column')
    }

    static buildOncePerRowStep(index: number): Step {
        return StepBuilderHelper._buildOncePerStep(index, BoardHelpers.getIndexesForRowContaining(index), 'row')
    }

    static buildOncePerSquareStep(index: number): Step {
        return StepBuilderHelper._buildOncePerStep(index, BoardHelpers.getIndexesForSquareContaining(index), 'square')
    }

    static buildOnlyOncePerDiagonal(index: number): Step {
         return StepBuilderHelper._buildOncePerStep(index, BoardHelpers.getIndexesForPositiveDiagonals(index), 'diagonal')
    }

    static buildPositiveDiagonalDeltaFour(index: number): Step {
        function _valuesFourFromValues(valuesSets: number[][]) {
            let allowedValues: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

            function onlyUnique(value: number, index: number, self: number[]) {
                return self.indexOf(value) === index;
            }

            valuesSets.forEach(valueSet => {
                let setAllowableValues: number[] = []
                valueSet.forEach(value => {
                    const newAllowableValues = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(
                        newValue => newValue < value - 3 || newValue > value + 3
                    )
                    setAllowableValues = setAllowableValues.concat(newAllowableValues).filter(onlyUnique)
                })
                allowedValues = allowedValues.filter(value => setAllowableValues.indexOf(value) != -1)
            })

            return allowedValues
        }
        function processingFunction(step: Step, board: Board): {newBoard: Board, newStep: Step} {
            const indexes = BoardHelpers.getIndexesForAdjacentPositiveDiagonals(index)
            let valueSets = indexes.map(index => board[index].value ? [board[index].value!] : CellHelpers.getCurrentPencilMarks(board[index]))
            valueSets = valueSets.filter(valueSet => valueSet.length)
            const allowedValues = _valuesFourFromValues(valueSets)
            let unAllowedValues;
            if (!allowedValues) {
                unAllowedValues = []
            } {
                unAllowedValues = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(value => allowedValues.indexOf(value) === -1)
            }
            const cell = board[index]
            const newCell = CellHelpers.makePencilMarksInvalid(unAllowedValues, cell)
            const newStep = StepHelper.updateStep(
                {descriptionOfChange: `Marking values in diagonal (${unAllowedValues.join(', ')}) as invalid`},
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

        function completeStep(step: Step, board: Board): {newBoard: Board, newStep: Step} {
            return StepBuilderHelper.defaultCompleteStep(step, board, index)
        }
        const indexes = BoardHelpers.getIndexesForAdjacentPositiveDiagonals(index)
        return StepHelper.buildStep(
            'Consecutive numbers in a positive decimal must have a delta of at least 4',
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
            completeStep,
        )
    }

    static _updateBoardForUnallowedValues(board: Board, index: number, unAllowedValues: number[]) {
        const cell = board[index]
        const newCell = CellHelpers.makePencilMarksInvalid(unAllowedValues, cell)
        return BoardHelpers.replaceCells(
            board,
            [{index, newCell}]
        )
    }

    static buildStepsForCheckingValidCellDiagonalDeltaFour(index: number, board: Board): Step[] {
        const indexes = BoardHelpers.getIndexesForAdjacentPositiveDiagonals(index)
        function buildStep(index: number, value: number): Step {
            function processingFunction(step: Step, board: Board): {newBoard: Board, newStep: Step} {
                const checker = new CheckForDeltaAllowableValueGroupedNeighbors(
                    value,
                    cell,
                    neighbors,
                    4
                )
                const {valid, message} = checker.allOtherValuesCanExistTogether()
                let unAllowedValues: number[] = [];
                if (!valid) {
                    unAllowedValues = [value]
                }
                const newBoard = StepBuilderHelper._updateBoardForUnallowedValues(board, index, unAllowedValues)
                const newStep = StepHelper.updateStep(
                    {descriptionOfChange: message},
                    step,
                )
                return {
                    newStep,
                    newBoard,
                }
            }

            function completeStep(step: Step, board: Board): {newBoard: Board, newStep: Step} {
                return StepBuilderHelper.defaultCompleteStep(step, board, index)
            }
            return StepHelper.buildStep(
                `Check if ${value} can be used without other cells breaking the delta 4 rule`,
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
                completeStep,
            )
        }
        const cell = board[index]
        const cellValues = CellHelpers.getCurrentPencilMarks(cell)
        const neighbors = indexes.map(index => board[index])
        return cellValues.map(value => buildStep(index, value))
    }
}

export class RuleBuilderHelper {
    static _ruleBuilder(index: number, name: string, builders: ((index: number) => Step)[]): Rule {
        return {
            name: name,
            steps: builders.map(builder => builder(index))
        }
    }

    static _ruleBuilderFromSteps(index: number, name: string, steps: Step[]): Rule {
        return {
            name: name,
            steps: steps
        }
    }

    static buildAllValuesPossibleRule (index: number) {
        return RuleBuilderHelper._ruleBuilder(
            index,
            'All values can be made',
            [StepBuilderHelper.buildAddAllValuesStep]
        )
    }

    static buildOnlyOncePerRule(index: number): Rule {
        return RuleBuilderHelper._ruleBuilder(
            index,
            'Values only occur once in a column, row, or square',
            [
                StepBuilderHelper.buildOncePerSquareStep,
                StepBuilderHelper.buildOncePerRowStep,
                StepBuilderHelper.buildOncePerColumnStep,
            ]
        )
    }

    static buildOnlyOncePerDiagonalRule(index: number): Rule {
        return RuleBuilderHelper._ruleBuilder(
            index,
            'Values only occur once in a column, row, or square',
            [
                StepBuilderHelper.buildOnlyOncePerDiagonal,
            ]
        )
    }

    static buildPositiveDiagonalDeltaFour(index: number): Rule {
        return RuleBuilderHelper._ruleBuilder(
            index,
            'Values adjacent in positive diagonals must be 4 greater than or equal to the next number',
            [
                StepBuilderHelper.buildPositiveDiagonalDeltaFour,
            ]
        )
    }

    static buildRuleToCheckForDelta4Compliance(index: number, board: Board) {
        return RuleBuilderHelper._ruleBuilderFromSteps(
            index,
            'A number must allow for each adjacent number on the positive diagonal to follow the 4 delta rule',
            StepBuilderHelper.buildStepsForCheckingValidCellDiagonalDeltaFour(index, board)
        )
    }
}

export class ProcedureBuilderHelper {
    static _buildProcedureForEmptyMarkedCell(
        board: Board,
        index: number | undefined,
        text: string,
        ruleBuilders: ((index: number) => Rule)[]
    ): Procedure  {
        let disabled = false;
        if (index === undefined || board[index].value || CellHelpers.getCurrentPencilMarks(board[index]).length == 0) {
            disabled = true
        }
        if (disabled) {
            return {
                name: text,
                board: board,
                index: 0,
                rules: [],
                disabled: true,
            }
        }
        return {
            name: text,
            board: board,
            index: index!,
            rules: ruleBuilders.map(ruleBuilder => ruleBuilder(index!)),
        }
    }

    static buildOnlyOnceProcedure (board: Board, index: number | undefined): Procedure {
        return ProcedureBuilderHelper._buildProcedureForEmptyMarkedCell(
            board,
            index,
            'Values occur once in each row, square or column',
            [RuleBuilderHelper.buildOnlyOncePerRule]
        )
    }

    static buildOnlyOncePerDiagonal (board: Board, index: number): Procedure {
        return ProcedureBuilderHelper._buildProcedureForEmptyMarkedCell(
            board,
            index,
            'Values occur once per diagonal',
            [RuleBuilderHelper.buildOnlyOncePerDiagonalRule]
        )
    }

    static buildPositiveDiagonalDeltaFour(board: Board, index: number): Procedure {
        return ProcedureBuilderHelper._buildProcedureForEmptyMarkedCell(
            board,
            index,
            'Miracle positive diagonal delta 4',
            [RuleBuilderHelper.buildPositiveDiagonalDeltaFour]
        )
    }

    static buildRelationalDeltaFour(board: Board, index: number): Procedure {
        return ProcedureBuilderHelper._buildProcedureForEmptyMarkedCell(
            board,
            index,
            'Group delta 4 conflict',
            [() => RuleBuilderHelper.buildRuleToCheckForDelta4Compliance(index, board)]
        )
    }
}

