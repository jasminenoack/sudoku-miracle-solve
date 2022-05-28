import React from 'react';
import './App.css';
import {BoardDisplay} from './components/board/BoardDisplay'
import {BoardContextProvider} from "./components/context/BoardContext";
import {ProcedureDisplay} from "./components/procedures/Procedures";
import {SpecialProcedureDisplay} from "./components/procedures/SpecialProcedures";
import {NumberSelector} from "./components/helpers/FindNumberHelper";


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
                <NumberSelector/>
            </div>
        </BoardContextProvider>
    );
}

export default App;