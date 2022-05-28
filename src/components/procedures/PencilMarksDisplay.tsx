import React from 'react'
import {AbstractProcedure} from "./models/ProcedureInterface";
import {PencilMarksProcedure} from "./models/PencilMarksProcedure";
import {Board} from "../context/models/board";


export function PencilMarksStartDisplay (
    {
        setRunningProcedure,
        board,
        selectedCell
    }:{
        setRunningProcedure: (procedure: AbstractProcedure) => void,
        board: Board,
        selectedCell: number | undefined,
    }
) {
    const text = "Add pencil marks"
    if (!PencilMarksProcedure.canRunProcedure(selectedCell, board)) {
        return <button disabled>{text}</button>
    }
    function chooseProcedure() {
        setRunningProcedure(new PencilMarksProcedure(board, selectedCell!))
    }
    return <button onClick={chooseProcedure}>{text}</button>
}