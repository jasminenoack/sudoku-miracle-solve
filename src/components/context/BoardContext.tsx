import React, {ReactNode, useState} from 'react';
import {beginnerPuzzle1} from "../../puzzle-data/beginner-puzzles";
import {Board, BoardHelpers} from "./models/board";
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

    const column1 = [ 0,  9, 18, 27, 36, 45, 54, 63, 72]
    const column2 = [ 1, 10, 19, 28, 37, 46, 55, 64, 73]
    const column3 = [ 2, 11, 20, 29, 38, 47, 56, 65, 74]
    const column4 = [ 3, 12, 21, 30, 39, 48, 57, 66, 75]
    const column5 = [ 4, 13, 22, 31, 40, 49, 58, 67, 76]
    const column6 = [ 5, 14, 23, 32, 41, 50, 59, 68, 77]
    const column7 = [ 6, 15, 24, 33, 42, 51, 60, 69, 78]
    const column8 = [ 7, 16, 25, 34, 43, 52, 61, 70, 79]
    const column9 = [ 8, 17, 26, 35, 44, 53, 62, 71, 80]

    const square1 = [ 0,  1,  2,  9, 10, 11, 18, 19, 20]
    const square2 = [ 3,  4,  5, 12, 13, 14, 21, 22, 23]
    const square3 = [ 6,  7,  8, 15, 16, 17, 24, 25, 26]
    const square4 = [27, 28, 29, 36, 37, 38, 45, 46, 47]
    const square5 = [30, 31, 32, 39, 40, 41, 48, 49, 50]
    const square6 = [33, 34, 35, 42, 43, 44, 51, 52, 53]
    const square7 = [54, 55, 56, 63, 64, 65, 72, 73, 74]
    const square8 = [57, 58, 59, 66, 67, 68, 75, 76, 77]
    const square9 = [60, 61, 62, 69, 70, 71, 78, 79, 80]

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

    const procedures: Procedure[] = [
        // remove repeat values for the square with the starting 1 & 2
        ...checkOnlyOne(square7),
        // remove repeat values for the column with the starting 1
        ...checkOnlyOne(column1),
        // remove repeat values for the column with the starting 2
        ...checkOnlyOne(column3),
        // remove repeat values for the row with the starting 1 & 2
        ...checkOnlyOne(row9),
        // remove repeat values for the diagonal with the starting 1
        ...checkOncePerDiagonal(diagonal9),
        // remove repeat values for the diagonal with the starting 2
        ...checkOncePerDiagonal(diagonal11),
        // remove the unavailable diagonal values for the row above the one with the starting 1 & 2
        ...checkDelta4Diagonal(row8),
        // remove values from the diagonal with the starting 1
        ...checkDelta4Diagonal(diagonal9.reverse()),
        // remove values from the diagonal with the starting 2
        ...checkDelta4Diagonal(diagonal11.reverse()),
        // remove values that will not work for related cells in the bottom square (mostly 5s)
        // basically a 5 has to be between a 1 & 9
        ...checkRelatedDelta4(square7.reverse()),
        // remove values in that will not work for the related cells in the diagonal with the starting 1
        ...checkRelatedDelta4(diagonal9.reverse()),
        // remove values in the middle left square that can't work with related diagonal swuares 
        ...checkRelatedDelta4(square4.reverse()),
        // remove the sixes from the row with the 2 in it
        ...checkRelatedDelta4(diagonal11.reverse()),
        // fill in a 6 in the top right corner
        ...fillInOnlyInDiagonal(8),
        // update related cells 
        ...checkOnlyOne(square3),
        ...checkOnlyOne(row1),
        ...checkOnlyOne(column9),
        // fill in a 6 in the top left corner of the bottom left square
        ...fillInOnlyInSquare(54),
        // update related cells
        ...checkOnlyOne(square7),
        ...checkOnlyOne(row7),
        ...checkOnlyOne(column1),
        ...checkOncePerDiagonal(diagonal7),
        // fill in the 6 in the bottom middle box 
        ...fillInOnlyInRow(66),
        // update related cells
        ...checkOnlyOne(square8),
        ...checkOnlyOne(row8),
        ...checkOnlyOne(column4),
        ...checkOncePerDiagonal(diagonal11),
        // update the diagonal for the delta rule 
        ...checkDelta4Diagonal(diagonal11.reverse())
        




        // testing stuff 
        // ...checkOnlyOne(allSquares),
        // ...checkOncePerDiagonal(allSquares),
        // ...checkDelta4Diagonal(allSquares),
        // ...checkRelatedDelta4(allSquares),
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

// 42, 34

export function BoardContextProvider({children}: {children: ReactNode}) {
    // const [currentPuzzle, setCurrentPuzzle] = useState<Board>(BoardHelpers.buildBoard(beginnerPuzzle1))
    // const [currentPuzzle, setCurrentPuzzle] = useState<Board>(BoardHelpers.buildBoard(miraclePuzzle1))
    const [currentPuzzle, setCurrentPuzzle] = useState<Board>(setUpBoard())
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
