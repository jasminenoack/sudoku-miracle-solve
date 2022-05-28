import React, {useContext} from 'react'
import './cell.scss'
import {Cell, CellHelpers} from "../context/models/board";
import {BoardContext} from "../context/BoardContext";
import {ProcedureHelper, StepHelper} from "../context/models/procedures";

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
    const {selectedValues} = useContext(BoardContext)
    const classes = [
        'pencil-mark', `pencil-${pencilMarkValue}`, pencilMarkStatus
    ]
    if (selectedValues.indexOf(+pencilMarkValue) !== -1) {
        classes.push(`selected-${pencilMarkValue}`)
    }
    return (
        <div key={pencilMarkValue} className={classes.join(' ')}>{pencilMarkValue}</div>
    )
}

export function CellDisplay ({cell, index}: PropTypes) {
    const {selectedValues} = useContext(BoardContext)
    const {selectedCell, setSelectedCell, runningProcedure} = useContext(BoardContext);

    const value = cell.value
    let classes: string[] = ['cell'];
    if (value) {
        classes.push('filled-cell')
        if (selectedValues.indexOf(+value) !== -1) {
            classes.push(`selected-${value}`)
        }
    }
    const selected = selectedCell === index
    if (selected) {
        classes.push('selected')
    }

    if (runningProcedure) {
        const currentStep = ProcedureHelper.getCurrentStep(runningProcedure)
        if (currentStep) {
            const newClasses = StepHelper.getClassesByIndex(currentStep.domClasses)[index]
            if (newClasses) {
                classes = classes.concat(newClasses)
            }
        }
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
