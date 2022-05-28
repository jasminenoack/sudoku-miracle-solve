import React from 'react'
import './procedures.css'
import {PencilMarksStartDisplay} from "./PencilMarksDisplay";
import {AbstractProcedure} from "./models/ProcedureInterface";
import {Step} from "../steps/models/Step";
import {Board} from "../context/models/board";

export function StartProceduresMenu (
    {
        setRunningProcedure,
        board,
        selectedCell,
    }:{
        setRunningProcedure: (procedure: AbstractProcedure | undefined) => void,
        board: Board,
        selectedCell: number | undefined,
    }
) {
    return (
        <div className='procedures'>
            <header>Start Procedure:</header>
            <PencilMarksStartDisplay
                setRunningProcedure={setRunningProcedure}
                board={board}
                selectedCell={selectedCell}
            />
        </div>
    )
}


function RunStep (
    {
        step
    }: {
        step: Step
    }
) {
    function runStep() {
        step.runStep();
    }
    return (
        <div>
            <button onClick={runStep}>Run Step: {step.name}</button>
        </div>
    );
}

function CompleteStep (
    {
        step,
    }: {
        step: Step
    }
) {
    function completeStep() {
        step.complete();

    }
    return (
        <div>
            <p>{step.description}</p>
            <button onClick={completeStep}>Complete Step: {step.name}</button>
        </div>
    );
}

function CompleteProcedure (
    {
        runningProcedure,
        setRunningProcedure,
    }: {
        runningProcedure: AbstractProcedure
        setRunningProcedure: (procedure: AbstractProcedure | undefined) => void,
    }
) {
    function completeProcedure() {
        setRunningProcedure(undefined);
    }
    return (
        <div>
            <button onClick={completeProcedure}>Complete Procedure: {runningProcedure.name}</button>
        </div>
    );
}

export function RunningProcedure(
    {
        setRunningProcedure,
        runningProcedure
    }: {
        runningProcedure: AbstractProcedure
        setRunningProcedure: (procedure: AbstractProcedure | undefined) => void,
    }
) {
    const nextStep = runningProcedure.getCurrentStep();
    let inner;
    if (!nextStep) {
        inner = <CompleteProcedure runningProcedure={runningProcedure} setRunningProcedure={setRunningProcedure}/>
    } else if (nextStep.inProgress) {
        inner = <CompleteStep step={nextStep}/>
    } else {
        inner = <RunStep step={nextStep}/>
    }

    const step = runningProcedure.getCurrentStep();
    return (
        <div className='procedures'>
            <header>Running: {runningProcedure.name}</header>
            {inner}
        </div>
    )
}