import React, {ReactNode, useState} from 'react';
import {beginnerPuzzle1} from "../../puzzle-data/beginner-puzzles";
import {Board, BoardHelpers} from "./models/board";
import {Procedure} from "./models/procedures";

export const boardDataDefault = {
    currentPuzzle: [],
    selectedCell: undefined,
    setSelectedCell: (index: number | undefined) => {},
    runningProcedure: undefined,
    setRunningProcedure: (procedure: Procedure | undefined) => {},
    setCurrentPuzzle: (board: Board) => {},
}

interface BoardContext {
    currentPuzzle: Board;
    setCurrentPuzzle: (board: Board) => void;
    runningProcedure: Procedure | undefined;
    setRunningProcedure: (procedure: Procedure | undefined) => void;
    selectedCell: number | undefined;
    setSelectedCell: (index: number | undefined) => void;
}

export const BoardContext = React.createContext<BoardContext>(boardDataDefault);

export function BoardContextProvider({children}: {children: ReactNode}) {
    const [currentPuzzle, setCurrentPuzzle] = useState<Board>(BoardHelpers.buildBoard(beginnerPuzzle1))
    const [runningProcedure, setRunningProcedure] = useState<undefined | Procedure>(undefined)
    const [selectedCell, setSelectedCell] = useState<undefined | number>(undefined)
    const context = {
        currentPuzzle,
        setCurrentPuzzle,
        runningProcedure,
        setRunningProcedure,
        selectedCell,
        setSelectedCell,
    }
    return (
        <BoardContext.Provider value={context}>
            <div>
                {children}
            </div>
        </BoardContext.Provider>
    )
}
