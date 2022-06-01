import React, {ReactNode, useState} from 'react';
import {beginnerPuzzle1} from "../../puzzle-data/beginner-puzzles";
import {Board, BoardHelpers, CellHelpers} from "./models/board";
import {Procedure, ProcedureBuilderHelper, ProcedureHelper} from "./models/procedures";
import {miraclePuzzle1} from "../../puzzle-data/special-puzzles";

export const boardDataDefault = {
    currentPuzzle: [],
    selectedCell: undefined,
    setSelectedCell: (index: number | undefined) => {},
    runningProcedure: undefined,
    setRunningProcedure: (procedure: Procedure | undefined) => {},
    runningSpecialProcedure: undefined,
    setRunningSpecialProcedure: (procedure: Procedure | undefined) => {},
    setCurrentPuzzle: (board: Board) => {},
    setSelectedValues: (values: number[]) => {},
    selectedValues: [],
}

interface BoardContext {
    currentPuzzle: Board;
    setCurrentPuzzle: (board: Board) => void;
    runningProcedure: Procedure | undefined;
    setRunningProcedure: (procedure: Procedure | undefined) => void;
    runningSpecialProcedure: Procedure | undefined;
    setRunningSpecialProcedure: (procedure: Procedure | undefined) => void;
    selectedCell: number | undefined;
    setSelectedCell: (index: number | undefined) => void;
    setSelectedValues: (values: number[]) => void;
    selectedValues: number[];
}

export const BoardContext = React.createContext<BoardContext>(boardDataDefault);

function setUpBoard(): Board {
    /*
    * set up the board in the state of the moves I know I always do first
    * */
    let board = BoardHelpers.buildBoard(miraclePuzzle1)
    // @ts-ignore
    const allSquares = [...Array(81).keys()]

    const row1 = [ 0,  1,  2,  3,  4,  5,  6,  7,  8]
    const row2 = [ 9, 10, 11, 12, 13, 14, 15, 16, 17]
    const row3 = [18, 19, 20, 21, 22, 23, 24, 25, 26]
    const row4 = [27, 28, 29, 30, 31, 32, 33, 34, 35]
    const row5 = [36, 37, 38, 39, 40, 41, 42, 43, 44]
    const row6 = [45, 46, 47, 48, 49, 50, 51, 52, 53]
    const row7 = [54, 55, 56, 57, 58, 59, 60, 61, 62]
    const row8 = [63, 64, 65, 66, 67, 68, 69, 70, 71]
    const row9 = [72, 73, 74, 75, 76, 77, 78, 79, 80]

    const rows = [row1, row2, row3, row4, row5, row6, row7, row8, row9]

    const column1 = [ 0,  9, 18, 27, 36, 45, 54, 63, 72]
    const column2 = [ 1, 10, 19, 28, 37, 46, 55, 64, 73]
    const column3 = [ 2, 11, 20, 29, 38, 47, 56, 65, 74]
    const column4 = [ 3, 12, 21, 30, 39, 48, 57, 66, 75]
    const column5 = [ 4, 13, 22, 31, 40, 49, 58, 67, 76]
    const column6 = [ 5, 14, 23, 32, 41, 50, 59, 68, 77]
    const column7 = [ 6, 15, 24, 33, 42, 51, 60, 69, 78]
    const column8 = [ 7, 16, 25, 34, 43, 52, 61, 70, 79]
    const column9 = [ 8, 17, 26, 35, 44, 53, 62, 71, 80]

    const columns = [column1, column2, column3, column4, column5, column6, column7, column8, column9]

    const square1 = [ 0,  1,  2,  9, 10, 11, 18, 19, 20]
    const square2 = [ 3,  4,  5, 12, 13, 14, 21, 22, 23]
    const square3 = [ 6,  7,  8, 15, 16, 17, 24, 25, 26]
    const square4 = [27, 28, 29, 36, 37, 38, 45, 46, 47]
    const square5 = [30, 31, 32, 39, 40, 41, 48, 49, 50]
    const square6 = [33, 34, 35, 42, 43, 44, 51, 52, 53]
    const square7 = [54, 55, 56, 63, 64, 65, 72, 73, 74]
    const square8 = [57, 58, 59, 66, 67, 68, 75, 76, 77]
    const square9 = [60, 61, 62, 69, 70, 71, 78, 79, 80]

    const squares = [square1, square2, square3, square4, square5, square6, square7, square8, square9]

    const diagonal1 =  [ 0]
    const diagonal2 =  [ 1,  9]
    const diagonal3 =  [ 2, 10, 18]
    const diagonal4 =  [ 3, 11, 19, 27]
    const diagonal5 =  [ 4, 12, 20, 28, 36]
    const diagonal6 =  [ 5, 13, 21, 29, 37, 45]
    const diagonal7 =  [ 6, 14, 22, 30, 38, 46, 54]
    const diagonal8 =  [ 7, 15, 23, 31, 39, 47, 55, 63]
    const diagonal9 =  [ 8, 16, 24, 32, 40, 48, 56, 64, 72]
    const diagonal10 = [    17, 25, 33, 41, 49, 57, 65, 73]
    const diagonal11 = [        26, 34, 42, 50, 58, 66, 74]
    const diagonal12 = [            35, 43, 51, 59, 67, 75]
    const diagonal13 = [                44, 52, 60, 68, 76]
    const diagonal14 = [                    53, 61, 69, 77]
    const diagonal15 = [                        62, 70, 78]
    const diagonal16 = [                            71, 79]
    const diagonal17 = [                                80]

    const diagonals = [
         diagonal1,
         diagonal2,
         diagonal3,
         diagonal4,
         diagonal5,
         diagonal6,
         diagonal7,
         diagonal8,
         diagonal9,
        diagonal10,
        diagonal11,
        diagonal12,
        diagonal13,
        diagonal14,
        diagonal15,
        diagonal16,
        diagonal17,
    ]

    const initialSquareIndexes = [54, 55, 56, 63, 64, 65, 72, 73, 74]
    const initialDiagonalWith1 = [72, 64, 56, 48, 40, 32, 24, 16, 8]
    const initialDiagonalWith2 = [74, 66, 58, 50, 42, 34, 26]

    function checkOnlyOne(indexes: number[]): Procedure[] {
        return indexes.map(index => ProcedureBuilderHelper.buildOnlyOnceProcedure(board, index))
    }
    function checkOncePerDiagonal(indexes: number[]): Procedure[] {
        return indexes.map(index => ProcedureBuilderHelper.buildOnlyOncePerDiagonal(board, index))
    }
    function checkDelta4Diagonal(indexes: number[]): Procedure[] {
        return indexes.map(index => ProcedureBuilderHelper.buildPositiveDiagonalDeltaFour(board, index))
    }
    function checkRelatedDelta4(indexes: number[]): Procedure[] {
        return indexes.map(index => ProcedureBuilderHelper.buildRelationalDeltaFour(board, index))
    }
    function fillInOnlyInDiagonal(index: number): Procedure[] {
        return [ProcedureBuilderHelper.buildFillInOnlyInstanceInDiagonal(board, index)]
    }
    function fillInOnlyInRow(index: number): Procedure[] {
        return [ProcedureBuilderHelper.buildFillInOnlyInstanceInRow(board, index)]
    }
    function fillInOnlyInColumn(index: number): Procedure[] {
        return [ProcedureBuilderHelper.buildFillInOnlyInstanceInColumn(board, index)]
    }
    function fillInOnlyInSquare(index: number): Procedure[] {
        return [ProcedureBuilderHelper.buildFillInOnlyInstanceInSquare(board, index)]
    }
    function fillInCellWithSingleValue(index: number): Procedure[] {
        return [ProcedureBuilderHelper.buildFillInCellWithSingleValue(board, index)]
    }
    function checkOnlyForAllRelated(index: number): Procedure[] {
        let column = columns.filter(things => things.indexOf(index) !== -1)[0]
        let row = rows.filter(things => things.indexOf(index) !== -1)[0]
        let square = squares.filter(things => things.indexOf(index) !== -1)[0]
        let diagonal = diagonals.filter(things => things.indexOf(index) !== -1)[0]

        if (index > 10) {
            column = column.reverse()
            row = row.reverse()
            square = square.reverse()
            diagonal = diagonal.reverse()
        }

        return [
            // update related cells
            ...checkOnlyOne(square),
            ...checkOnlyOne(row),
            ...checkOnlyOne(column),
            ...checkOncePerDiagonal(diagonal),
            // check the delta change by 4
            ...checkDelta4Diagonal(diagonal),
            ...checkDelta4Diagonal(square),
            ...checkDelta4Diagonal(row),
            ...checkDelta4Diagonal(column),
            // check if the deltas work
            ...checkRelatedDelta4(diagonal),
            ...checkRelatedDelta4(square),
            ...checkRelatedDelta4(row),
            ...checkRelatedDelta4(column),
        ]
    }
    function fillInCell(fillInFunction: (index: number) => Procedure[], index: number): Procedure[] {
        return [
            // fill in square
            ...fillInFunction(index),
            // update related cells
            ...checkOnlyForAllRelated(index),
        ]
    }

    function removePencilMarks(indexes: number[], value: number) {
        return [
            ProcedureBuilderHelper.buildRemovePencilMark(board, indexes, value)
        ]
    }

    function buildTestFillInFunction(index: number, value: number) {
        return [
            ProcedureBuilderHelper.buildTestFillInCellWithSingleValue(board, index, value),
            ...checkOnlyForAllRelated(index)
        ]
    }

    function internalUmm(index: number): Procedure[] {
        let column = columns.filter(things => things.indexOf(index) !== -1)[0]
        let row = rows.filter(things => things.indexOf(index) !== -1)[0]
        let square = squares.filter(things => things.indexOf(index) !== -1)[0]
        let diagonal = diagonals.filter(things => things.indexOf(index) !== -1)[0]
        console.log(index)
        console.log(square)
        if (index > 10) {
            column = column.reverse()
            row = row.reverse()
            square = square.reverse()
            diagonal = diagonal.reverse()
        }

        return [
            // update related cells
            ...checkOnlyOne(square),
            ...checkOnlyOne(row),
            ...checkOnlyOne(column),
            ...checkOncePerDiagonal(diagonal),
            // // check the delta change by 4
            ...checkDelta4Diagonal(diagonal),
            // ...checkDelta4Diagonal(square),
            // ...checkDelta4Diagonal(row),
            // ...checkDelta4Diagonal(column),
            // // check if the deltas work
            // ...checkRelatedDelta4(diagonal),
            // ...checkRelatedDelta4(square),
            // ...checkRelatedDelta4(row),
            // ...checkRelatedDelta4(column),
        ]
    }

    function ummm(fillInFunction: (index: number) => Procedure[], index: number): Procedure[] {
        return [
            // fill in square
            ...fillInFunction(index),
            // update related cells
            ...internalUmm(index),
        ]
    }

    function checkAll(): Procedure[] {
        return [
            // update related cells
            ...checkOnlyOne(allSquares),
            ...checkOnlyOne(allSquares),
            ...checkOnlyOne(allSquares),
            ...checkOncePerDiagonal(allSquares),
            // check the delta change by 4
            ...checkDelta4Diagonal(allSquares),
            ...checkDelta4Diagonal(allSquares),
            ...checkDelta4Diagonal(allSquares),
            ...checkDelta4Diagonal(allSquares),
            // check if the deltas work
            ...checkRelatedDelta4(allSquares),
            ...checkRelatedDelta4(allSquares),
            ...checkRelatedDelta4(allSquares),
            ...checkRelatedDelta4(allSquares),
        ]
    }

    const procedures: Procedure[] = [
        // check squares around 1
        ...checkOnlyForAllRelated(72),
        // check squares aroung 2
        ...checkOnlyForAllRelated(74), 

        // check the diagonals for the row above the bottom where we removed numbers
        ...checkDelta4Diagonal(row8),

        // update the values for the square above the square we keep changing 
        ...checkRelatedDelta4(square4.reverse()),

        // fill in a load of cells
        ...fillInCell(fillInOnlyInDiagonal, 8),
        ...fillInCell(fillInOnlyInSquare, 54),
        ...fillInCell(fillInOnlyInRow, 66),
        ...fillInCell(fillInCellWithSingleValue, 58),
        ...fillInCell(fillInCellWithSingleValue, 16),
        ...fillInCell(fillInCellWithSingleValue, 56),
        ...fillInCell(fillInCellWithSingleValue, 64),
        ...fillInCell(fillInCellWithSingleValue, 40),
        ...fillInCell(fillInCellWithSingleValue, 32),
        ...fillInCell(fillInCellWithSingleValue, 24),
        ...fillInCell(fillInCellWithSingleValue, 48),

        // this doesn't work 
        // if 46 => 2
        // then 38 => 7
        // then 65 => 8 
        // then we have the only 3s in box seven as 36, 45, 47
        // this means that 63 can't be a 3 because then there is no 3 in that box
        // but it can only be a 3 so it must mean that 46 != 2
        // ...buildTestFillInFunction(46, 2),
        // // sets a 7
        // ...fillInCell(fillInCellWithSingleValue, 38),
        // ...checkAll(),
        // // sets an 8
        // ...fillInCell(fillInCellWithSingleValue, 65),
        // ...checkAll(),
        
        // fill in with a 1 given all of that 
        ...buildTestFillInFunction(46, 1),
        ...checkRelatedDelta4(row5),
        ...checkRelatedDelta4(row7),

        ...removePencilMarks([31, 33], 6),
        ...removePencilMarks([43, 44], 1),
        ...removePencilMarks([78, 79, 80], 5),

        ...checkAll(),
        ...fillInCell(fillInOnlyInSquare, 43),
        ...fillInCell(fillInOnlyInSquare, 49),
        ...fillInCell(fillInOnlyInSquare, 78),
        ...fillInCell(fillInOnlyInSquare, 23),
        ...fillInCell(fillInCellWithSingleValue, 57),
        ...fillInCell(fillInCellWithSingleValue, 31),
        ...fillInCell(fillInCellWithSingleValue, 15),
        ...fillInCell(fillInCellWithSingleValue, 30),
        ...fillInCell(fillInCellWithSingleValue, 41),
        ...fillInCell(fillInCellWithSingleValue, 39),
        ...fillInCell(fillInCellWithSingleValue, 50),
        ...fillInCell(fillInCellWithSingleValue, 55),
        ...fillInCell(fillInCellWithSingleValue, 65),
        ...fillInCell(fillInCellWithSingleValue, 73),
        ...fillInCell(fillInCellWithSingleValue, 47),
        ...fillInCell(fillInCellWithSingleValue, 63),
        ...fillInCell(fillInCellWithSingleValue, 14),
        ...fillInCell(fillInCellWithSingleValue, 42),
        ...fillInCell(fillInCellWithSingleValue, 34),
        ...fillInCell(fillInCellWithSingleValue, 35),
        ...fillInCell(fillInCellWithSingleValue, 33),
        ...fillInCell(fillInCellWithSingleValue, 51),
        ...fillInCell(fillInCellWithSingleValue, 59),
        ...fillInCell(fillInCellWithSingleValue, 67),
        ...fillInCell(fillInCellWithSingleValue, 68),
        ...fillInCell(fillInCellWithSingleValue, 70),
        ...fillInCell(fillInCellWithSingleValue, 36),
        ...fillInCell(fillInCellWithSingleValue, 38),
        ...fillInCell(fillInCellWithSingleValue, 3),
        ...fillInCell(fillInCellWithSingleValue, 25),
        ...fillInCell(fillInCellWithSingleValue, 26),
        ...fillInCell(fillInCellWithSingleValue, 75),
        ...fillInCell(fillInCellWithSingleValue, 77),
        ...fillInCell(fillInCellWithSingleValue, 76),
        ...fillInCell(fillInCellWithSingleValue, 69),
        ...fillInCell(fillInCellWithSingleValue, 71),
        ...fillInCell(fillInCellWithSingleValue, 61),
        ...fillInCell(fillInCellWithSingleValue, 62),
        ...fillInCell(fillInCellWithSingleValue, 60),
        ...fillInCell(fillInCellWithSingleValue, 79),
        ...fillInCell(fillInCellWithSingleValue, 80),
        ...fillInCell(fillInCellWithSingleValue, 44),
        ...fillInCell(fillInCellWithSingleValue, 52),
        ...fillInCell(fillInCellWithSingleValue, 53),
        ...fillInCell(fillInCellWithSingleValue, 17),
        ...fillInCell(fillInCellWithSingleValue, 7),
        ...fillInCell(fillInCellWithSingleValue, 6),
        ...fillInCell(fillInCellWithSingleValue, 5),
        ...fillInCell(fillInCellWithSingleValue, 4),
        ...fillInCell(fillInCellWithSingleValue, 13),
        ...fillInCell(fillInCellWithSingleValue, 12),
        ...fillInCell(fillInCellWithSingleValue, 22),
        ...fillInCell(fillInCellWithSingleValue, 21),
        ...fillInCell(fillInCellWithSingleValue, 20),
        ...fillInCell(fillInCellWithSingleValue, 19),
        ...fillInCell(fillInCellWithSingleValue, 11),
        ...fillInCell(fillInCellWithSingleValue, 29),
        ...fillInCell(fillInCellWithSingleValue, 37),
        ...fillInCell(fillInCellWithSingleValue, 45),
        ...fillInCell(fillInCellWithSingleValue, 27),
        ...fillInCell(fillInCellWithSingleValue, 28),
        ...fillInCell(fillInCellWithSingleValue, 18),
        ...fillInCell(fillInCellWithSingleValue, 10),
        ...fillInCell(fillInCellWithSingleValue, 9),
        ...fillInCell(fillInCellWithSingleValue, 2),
        ...fillInCell(fillInCellWithSingleValue, 1),
        ...fillInCell(fillInCellWithSingleValue, 0),



        //  0  1  2   3  4  5   6  7  8
        //  9 10 11  12 13 14  15 16 17
        // 18 19 20  21 22 23  24 25 26
        //
        // 27 28 29  30 31 32  33 34 35
        // 36 37 38  39 40 41  42 43 44
        // 45 46 47  48 49 50  51 52 53
        //
        // 54 55 56  57 58 59  60 61 62
        // 63 64 65  66 67 68  69 70 71
        // 72 73 74  75 76 77  78 79 80


        // testing stuff 
        
        // ...checkOnlyOne(allSquares),
        // ...checkOncePerDiagonal(allSquares),
        // ...checkDelta4Diagonal(allSquares),
        // ...checkRelatedDelta4(allSquares),

        // ...checkOnlyOne(allSquares.reverse()),
        // ...checkOncePerDiagonal(allSquares.reverse()),
        // ...checkDelta4Diagonal(allSquares.reverse()),
        // ...checkRelatedDelta4(allSquares.reverse()),
    ]
    const updates: {[key: string]: number[]} = {}
    let index = 0
    procedures.forEach(procedure => {
        index += 1
        let currentProcedure = procedure
        let changed = false
        while(ProcedureHelper.getCurrentRule(currentProcedure)) {
            const results = ProcedureHelper.incrementProcedure(currentProcedure, board)
            currentProcedure = results.newProcedure
            const newBoard = results.newBoard

            if (ProcedureHelper.getCurrentStep(currentProcedure)?.inProgress && JSON.stringify(newBoard) !== JSON.stringify(board)) {
                changed = true
            }
            board = newBoard
        }
        if (changed) {
            const key = `${index}-${procedure.name}`
            if (!updates[key]) {
                updates[key] = []
            }
            updates[key].push(procedure.index)
        }
    })
    // Object.keys(updates).forEach(update => console.log(updates[update].length, update, updates[update]))
    console.log("changes", Object.keys(updates).length)
    console.log("")
    console.log("")
    return board
}

const defaultBoard = setUpBoard()

// 42, 34

export function BoardContextProvider({children}: {children: ReactNode}) {
    // const [currentPuzzle, setCurrentPuzzle] = useState<Board>(BoardHelpers.buildBoard(beginnerPuzzle1))
    // const [currentPuzzle, setCurrentPuzzle] = useState<Board>(BoardHelpers.buildBoard(miraclePuzzle1))
    const [currentPuzzle, setCurrentPuzzle] = useState<Board>(defaultBoard)
    const [runningProcedure, setRunningProcedure] = useState<undefined | Procedure>(undefined)
    const [runningSpecialProcedure, setRunningSpecialProcedure] = useState<undefined | Procedure>(undefined)
    const [selectedCell, setSelectedCell] = useState<undefined | number>(undefined)
    const [selectedValues, setSelectedValues] = useState<number[]>([])
    const context = {
        currentPuzzle,
        setCurrentPuzzle,
        runningProcedure,
        setRunningProcedure,
        selectedCell,
        setSelectedCell,
        runningSpecialProcedure,
        setRunningSpecialProcedure,
        selectedValues,
        setSelectedValues,
    }
    return (
        <BoardContext.Provider value={context}>
            <div>
                {children}
            </div>
        </BoardContext.Provider>
    )
}
