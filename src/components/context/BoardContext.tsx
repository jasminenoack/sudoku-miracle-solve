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
    const initialSquareIndexes = [54, 55, 56, 63, 64, 65, 72, 73, 74]
    const initialDiagonalWith1 = [72, 64, 56, 48, 40, 32, 24, 16, 8]
    const initialDiagonalWith2 = [74, 66, 58, 50, 42, 34, 26]
    const procedures = [
        ...allSquares.map(index => ProcedureBuilderHelper.buildOnlyOnceProcedure(board, index)),
        ...initialDiagonalWith1.map(index => ProcedureBuilderHelper.buildOnlyOncePerDiagonal(board, index)),
        ...initialDiagonalWith1.map(index => ProcedureBuilderHelper.buildPositiveDiagonalDeltaFour(board, index)),
        ...initialDiagonalWith2.map(index => ProcedureBuilderHelper.buildOnlyOncePerDiagonal(board, index)),
        ...initialDiagonalWith2.map(index => ProcedureBuilderHelper.buildPositiveDiagonalDeltaFour(board, index)),
    ]
    procedures.forEach(procedure => {
        let currentProcedure = procedure
        while(ProcedureHelper.getCurrentRule(currentProcedure)) {
            const results = ProcedureHelper.incrementProcedure(currentProcedure, board)
            currentProcedure = results.newProcedure
            board = results.newBoard
        }
    })
    return board
}

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
