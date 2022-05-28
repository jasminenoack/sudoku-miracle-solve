import React, {useContext} from 'react'
import {BoardContext} from "../context/BoardContext";
import {ProcedureBuilderHelper} from "../context/models/procedures";


export function PencilMarksStartDisplay () {
    const {selectedCell, currentPuzzle, setRunningProcedure} = useContext(BoardContext);
    const text = "Add pencil marks"
    if (!selectedCell || currentPuzzle[selectedCell].value) {
        return <button disabled>{text}</button>
    }
    function chooseProcedure() {
        setRunningProcedure(ProcedureBuilderHelper.buildPencilMarksProcedure(currentPuzzle, selectedCell!))
    }
    return <button onClick={chooseProcedure}>{text}</button>
}