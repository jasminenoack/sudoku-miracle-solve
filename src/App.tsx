import {useState} from "react";
import React from 'react';
import './App.css';
import {BoardDisplay} from './components/board/BoardDisplay'
import {beginnerPuzzle1} from './puzzle-data/beginner-puzzles'
import {BoardRepresentation} from "./models/BoardRepresentation";

function App() {
    const [puzzle, setPuzzle] = useState(beginnerPuzzle1)
    const board = new BoardRepresentation(puzzle);
    return (
        <div className="App">
            <header className="App-header">
                Sudoku Solver
            </header>
            <BoardDisplay board={board}/>
        </div>
    );
}

export default App;
