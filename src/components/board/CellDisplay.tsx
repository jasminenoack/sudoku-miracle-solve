import {CellRepresentation, PencilMark} from "./models/CellRepresentation";
import './cell.css'

interface PropTypes {
    cell: CellRepresentation;
    selected: boolean;
    onClick: () => void;
}

function PencilMarkDisplay({pencilMark}: {pencilMark: PencilMark}) {
    const classes = [
        'pencil-mark', `pencil-${pencilMark.value}`
    ]
    if (pencilMark.invalid) {
        classes.push('invalid')
    }
    return (
        <div key={pencilMark.value} className={classes.join(' ')}>{pencilMark.value}</div>
    )
}

export function CellDisplay ({cell, selected, onClick}: PropTypes) {
    const value = cell.getValue()
    const classes: string[] = ['cell'];
    if (value) {
        classes.push('filled-cell')
    }
    if (selected) {
        classes.push('selected')
    }

    if (cell.value) {
        return <button className={classes.join(' ')} data-testid={'cell'} onClick={onClick}>{value}</button>
    } else {
        return (
            <button className={classes.join(' ')} data-testid={'cell'} onClick={onClick}>
                {cell.pencilMarks.map(mark => <PencilMarkDisplay key={mark.value} pencilMark={mark}/>)}
            </button>)
    }
}