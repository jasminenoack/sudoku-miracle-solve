import {CellRepresentation} from "../../models/CellRepresentation";
import './cell.css'

interface PropTypes {
    cell: CellRepresentation;
    selected: boolean;
    onClick: () => void;
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

    return <button className={classes.join(' ')} data-testid={'cell'} onClick={onClick}>{value}</button>
}