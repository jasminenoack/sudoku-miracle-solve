import {useState} from "react";
import React from 'react';
import './App.css';
import {BoardDisplay} from './components/board/BoardDisplay'
import {beginnerPuzzle1} from './puzzle-data/beginner-puzzles'
import {StartProceduresMenu, RunningProcedure} from "./components/procedures/Procedures";
import {AbstractProcedure} from "./components/procedures/models/ProcedureInterface";
import {BoardContext, BoardContextProvider, boardDataDefault} from "./components/context/BoardContext";


function App() {
    const [puzzle, setPuzzle] = useState(beginnerPuzzle1)
    const [runningProcedure, setRunningProcedure] = useState<undefined | AbstractProcedure>(undefined)
    const [selectedCell, setSelectedCell] = useState<undefined | number>(undefined)
    const [updateForStepChange, setUpdateForStepChange] = useState<boolean>(false)

    function chooseSelectedCell(index: number | undefined) {
        if (runningProcedure) {
            return
        }
        setSelectedCell(index)
    }

    return (
        <BoardContextProvider>
            <div className="App">
                <header className="App-header">
                    Sudoku Solver
                </header>
                <BoardDisplay/>
                {/*{*/}
                {/*    runningProcedure ? (*/}
                {/*        <RunningProcedure*/}
                {/*            runningProcedure={runningProcedure!}*/}
                {/*            setRunningProcedure={setRunningProcedure}*/}
                {/*        />*/}
                {/*    ) : (*/}
                {/*        <StartProceduresMenu*/}
                {/*            setRunningProcedure={setRunningProcedure}*/}
                {/*            board={board}*/}
                {/*            selectedCell={selectedCell}*/}
                {/*        />*/}
                {/*    )*/}
                {/*}*/}

            </div>
        </BoardContextProvider>
    );
}

export default App;