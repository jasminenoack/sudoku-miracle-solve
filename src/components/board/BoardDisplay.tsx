import {BoardRepresentation} from "./models/BoardRepresentation";
import {CellDisplay} from "./CellDisplay";
import './board.css'
import {useState} from "react";

interface PropTypes {
    board: BoardRepresentation
}

export function BoardDisplay ({board}: PropTypes) {
    const [selectedCell, setSelectedCell] = useState<undefined | number>(undefined)

    return <div className={`board`}>{
        board.cells.map((cell, index) => {
            const selected = index === selectedCell
            return (
                <CellDisplay
                    key={index}
                    cell={cell}
                    selected={selected}
                    onClick={() => setSelectedCell(selected ? undefined : index)}
                />
            )
        })
    }</div>
}