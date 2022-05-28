import React, {useContext} from 'react'
import {PencilMarksStartDisplay} from "./PencilMarksDisplay";
import {BoardContext} from "../context/BoardContext";
import {Procedure, ProcedureHelper, Rule, RuleHelper, Step} from "../context/models/procedures";
import './procedures.css'

export function StartProceduresMenu () {
    return (
        <div>
            <header>Start Procedure:</header>
            <PencilMarksStartDisplay/>
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
    const {runningProcedure, currentPuzzle, setRunningProcedure, setCurrentPuzzle} = useContext(BoardContext);

    function runStep() {
        const {newProcedure, newBoard} = ProcedureHelper.incrementProcedure(runningProcedure!, currentPuzzle)
        setRunningProcedure(newProcedure)
        setCurrentPuzzle(newBoard)
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
    const {runningProcedure, currentPuzzle, setRunningProcedure} = useContext(BoardContext);
    function completeStep() {
        const {newProcedure} = ProcedureHelper.incrementProcedure(runningProcedure!, currentPuzzle)
        setRunningProcedure(newProcedure)
    }
    return (
        <div>
            <p>{step.descriptionOfChange}</p>
            <button onClick={completeStep}>Complete Step: {step.name}</button>
        </div>
    );
}

function CompleteProcedure () {
    const {setRunningProcedure} = useContext(BoardContext);
    function completeProcedure() {
        setRunningProcedure(undefined);
    }
    return (
        <div>
            <button onClick={completeProcedure}>Complete Procedure</button>
        </div>
    );
}

export function RuleDisplay({rule}: {rule: Rule}) {
    const step = RuleHelper.getCurrentStep(rule)
    let inner;
    if (!step!.inProgress) {
        inner = <RunStep step={step!}/>
    } else {
        inner = <CompleteStep step={step!}/>
    }
    return (<><div className="rule">{`Rule: ${rule.name}`}</div>{inner}</>)
}

export function RunningProcedure(
    {
        runningProcedure
    }: {
        runningProcedure: Procedure
    }
) {
    const rule = ProcedureHelper.getCurrentRule(runningProcedure)
    let inner;
    if (rule) {
        inner = <RuleDisplay rule={rule}/>
    } else {
        inner = <CompleteProcedure />
    }

    return (
        <>
            <header>Running: {runningProcedure.name}</header>
            {inner}
        </>
    )
}

export function ProcedureDisplay() {
    const {runningProcedure} = useContext(BoardContext);

    function getInner() {
        if (runningProcedure) {
            return <RunningProcedure runningProcedure={runningProcedure}/>
        } else {
            return <StartProceduresMenu/>
        }
    }
    return (
        <div className='procedures'>
            {getInner()}
        </div>
    )
}