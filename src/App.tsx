import React from 'react';
import './App.css';
import {BoardDisplay} from './components/board/BoardDisplay'
import {BoardContextProvider} from "./components/context/BoardContext";
import {ProcedureDisplay} from "./components/procedures/Procedures";
import {SpecialProcedureDisplay} from "./components/procedures/SpecialProcedures";


function App() {
    return (
        <BoardContextProvider>
            <div className="App">
                <header className="App-header">
                    Sudoku Solver
                </header>
                <BoardDisplay/>
                <ProcedureDisplay/>
                <SpecialProcedureDisplay/>
            </div>
        </BoardContextProvider>
    );
}

export default App;