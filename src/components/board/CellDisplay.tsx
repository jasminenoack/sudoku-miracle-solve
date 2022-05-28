import React, {useContext} from 'react'
import './cell.css'
import {Cell} from "../context/models/board";
import {BoardContext} from "../context/BoardContext";

interface PropTypes {
    cell: Cell;
    index: number;
}

function PencilMarkDisplay(
    {
        pencilMarkValue,
        pencilMarkStatus,
    }: {
        pencilMarkValue: string,
        pencilMarkStatus: string,
    }) {
    const classes = [
        'pencil-mark', `pencil-${pencilMarkValue}`, pencilMarkStatus
    ]
    return (
        <div key={pencilMarkValue} className={classes.join(' ')}>{pencilMarkValue}</div>
    )
}

export function CellDisplay ({cell, index}: PropTypes) {
    const {selectedCell, setSelectedCell} = useContext(BoardContext);

    const value = cell.value
    const classes: string[] = ['cell'];
    if (value) {
        classes.push('filled-cell')
    }
    const selected = selectedCell === index
    if (selected) {
        classes.push('selected')
    }

    function onClick() {
        setSelectedCell(selected ? undefined : index)
    }

    if (cell.value) {
        return <button className={classes.join(' ')} data-testid={'cell'} onClick={onClick}>{value}</button>
    } else {
        return (
            <button className={classes.join(' ')} data-testid={'cell'} onClick={onClick}>
                {Object.keys(cell.pencilMarks).map(value => <PencilMarkDisplay key={value} pencilMarkValue={value} pencilMarkStatus={cell.pencilMarks[value]}/>)}
            </button>)
    }
}
