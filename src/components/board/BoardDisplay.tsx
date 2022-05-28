import React, {useContext} from 'react'
import {CellDisplay} from "./CellDisplay";
import './board.css'
import {BoardContext} from "../context/BoardContext";


export function BoardDisplay () {
    const {currentPuzzle} = useContext(BoardContext);

    return <div className={`board`}>{
        currentPuzzle.map((cell, index) => {
            return (
                <CellDisplay
                    key={index}
                    cell={cell}
                    index={index}
                />
            )
        })
    }</div>
}