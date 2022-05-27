import {BoardRepresentation} from "../../models/BoardRepresentation";
import {CellDisplay} from "./CellDisplay";
import './board.css'

interface PropTypes {
    board: BoardRepresentation
}

export function BoardDisplay ({board}: PropTypes) {
    return <div className={`board`}>{
        board.cells.map((cell, index) => <CellDisplay key={index} cell={cell}/>)
    }</div>
}