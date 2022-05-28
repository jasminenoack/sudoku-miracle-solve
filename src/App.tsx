import React from 'react';
import './App.css';
import {BoardDisplay} from './components/board/BoardDisplay'
import {BoardContextProvider} from "./components/context/BoardContext";
import {ProcedureDisplay} from "./components/procedures/Procedures";


function App() {
    return (
        <BoardContextProvider>
            <div className="App">
                <header className="App-header">
                    Sudoku Solver
                </header>
                <BoardDisplay/>
                <ProcedureDisplay/>
            </div>
        </BoardContextProvider>
    );
}

export default App;