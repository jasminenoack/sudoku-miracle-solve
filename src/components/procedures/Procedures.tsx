import React, {useContext} from 'react'
import {BoardContext} from "../context/BoardContext";
import {Procedure, ProcedureBuilderHelper, ProcedureHelper, Rule, RuleHelper, Step} from "../context/models/procedures";
import './procedures.scss'


function ProceduresItem (
    {
        procedure,
    } : {
        procedure: Procedure,
    }
) {
    const {selectedCell, currentPuzzle, setRunningProcedure} = useContext(BoardContext);
    const text = procedure.name
    if (!selectedCell || currentPuzzle[selectedCell].value) {
        return <button disabled>{text}</button>
    }

    if (procedure.disabled) {
        return <button disabled>{text}</button>
    }
    function chooseProcedure() {
        setRunningProcedure(procedure)
    }
    return <button onClick={chooseProcedure}>{text}</button>
}


export function StartProceduresMenu () {
    const {selectedCell, currentPuzzle} = useContext(BoardContext);
    const onlyOnce = ProcedureBuilderHelper.buildOnlyOnceProcedure(currentPuzzle, selectedCell!)

    return (
        <div>
            <header>Start Procedure:</header>
            <ProceduresItem procedure={onlyOnce}/>
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
    const {runningProcedure, currentPuzzle, setRunningProcedure, setCurrentPuzzle} = useContext(BoardContext);
    function completeStep() {
        const {newProcedure, newBoard} = ProcedureHelper.incrementProcedure(runningProcedure!, currentPuzzle)
        setRunningProcedure(newProcedure)
        setCurrentPuzzle(newBoard)
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

function RuleDisplay({rule}: {rule: Rule}) {
    const step = RuleHelper.getCurrentStep(rule)
    let inner;
    if (!step!.inProgress) {
        inner = <RunStep step={step!}/>
    } else {
        inner = <CompleteStep step={step!}/>
    }
    return (<><div className="rule">{`Rule: ${rule.name}`}</div>{inner}</>)
}

function RunningProcedure(
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