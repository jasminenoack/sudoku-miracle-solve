import {CellRepresentation} from "../../models/CellRepresentation";
import './cell.css'

interface PropTypes {
    cell: CellRepresentation
}

export function CellDisplay ({cell}: PropTypes) {
    const value = cell.getValue()
    const classes: string[] = ['cell'];
    if (value) {
        classes.push('filled-cell')
    }

    return <div className={classes.join(' ')} data-testid={'cell'}>{value}</div>
}