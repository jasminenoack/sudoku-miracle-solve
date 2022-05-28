import React, {useContext} from 'react'
import {BoardContext} from "../context/BoardContext";
import {Procedure, ProcedureBuilderHelper, ProcedureHelper, Rule, RuleHelper, Step} from "../context/models/procedures";
import './special-procedures.scss'


function SpecialProceduresItem (
    {
        procedure,
    } : {
        procedure: Procedure,
    }
) {
    const {selectedCell, currentPuzzle, setRunningSpecialProcedure} = useContext(BoardContext);
    const text = procedure.name
    if (!selectedCell || currentPuzzle[selectedCell].value) {
        return <button disabled>{text}</button>
    }

    if (procedure.disabled) {
        return <button disabled>{text}</button>
    }
    function chooseProcedure() {
        setRunningSpecialProcedure(procedure)
    }
    return <button onClick={chooseProcedure}>{text}</button>
}

function StartProceduresMenu () {
    const {selectedCell, currentPuzzle} = useContext(BoardContext);

    const onlyOncePerDiagonal = ProcedureBuilderHelper.buildOnlyOncePerDiagonal(currentPuzzle, selectedCell!)
    const diagonalDelta4 = ProcedureBuilderHelper.buildPositiveDiagonalDeltaFour(currentPuzzle, selectedCell!)
    const relationalDelta4 = ProcedureBuilderHelper.buildRelationalDeltaFour(currentPuzzle, selectedCell!)
    const fillInOnlyInDiagonal = ProcedureBuilderHelper.buildFillInOnlyInstanceInDiagonal(currentPuzzle, selectedCell!)
    return (
        <div>
            <header>Start Special Procedure:</header>
            <SpecialProceduresItem procedure={onlyOncePerDiagonal}/>
            <SpecialProceduresItem procedure={diagonalDelta4}/>
            <SpecialProceduresItem procedure={relationalDelta4}/>
            <SpecialProceduresItem procedure={fillInOnlyInDiagonal}/>
        </div>
    );
}


function RunStep (
    {
        step
    }: {
        step: Step
    }
) {
    const {runningSpecialProcedure, currentPuzzle, setRunningSpecialProcedure, setCurrentPuzzle} = useContext(BoardContext);

    function runStep() {
        const {newProcedure, newBoard} = ProcedureHelper.incrementProcedure(runningSpecialProcedure!, currentPuzzle)
        setRunningSpecialProcedure(newProcedure)
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
    const {runningSpecialProcedure, currentPuzzle, setRunningSpecialProcedure, setCurrentPuzzle} = useContext(BoardContext);
    function completeStep() {
        const {newProcedure, newBoard} = ProcedureHelper.incrementProcedure(runningSpecialProcedure!, currentPuzzle)
        setRunningSpecialProcedure(newProcedure)
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
    const {setRunningSpecialProcedure} = useContext(BoardContext);
    function completeProcedure() {
        setRunningSpecialProcedure(undefined);
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
        runningSpecialProcedure
    }: {
        runningSpecialProcedure: Procedure
    }
) {
    const rule = ProcedureHelper.getCurrentRule(runningSpecialProcedure)
    let inner;
    if (rule) {
        inner = <RuleDisplay rule={rule}/>
    } else {
        inner = <CompleteProcedure />
    }

    return (
        <>
            <header>Running: {runningSpecialProcedure.name}</header>
            {inner}
        </>
    )
}

export function SpecialProcedureDisplay() {
    const {runningSpecialProcedure} = useContext(BoardContext);

    function getInner() {
        if (runningSpecialProcedure) {
            return <RunningProcedure runningSpecialProcedure={runningSpecialProcedure}/>
        } else {
            return <StartProceduresMenu/>
        }
    }
    return (
        <div className='special-procedures'>
            {getInner()}
        </div>
    )
}