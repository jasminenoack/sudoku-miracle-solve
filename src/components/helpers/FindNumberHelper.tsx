import {useContext} from "react";
import {BoardContext} from "../context/BoardContext";
import './number-selector.css'

function NumberSelection({value}: {value: number}) {
    const {selectedValues, setSelectedValues} = useContext(BoardContext)

    const classes = ['number-button']
    if (selectedValues.indexOf(value) !== -1) {
        classes.push(`selected-${value}`)
    }

    function updateSelectedValues() {
        let newValues;
        if (selectedValues.indexOf(value) !== -1) {
            newValues = selectedValues.filter(selectedValue => selectedValue !== value)
        } else {
            newValues = [...selectedValues, value]
        }
        setSelectedValues(newValues)
    }

    return <button className={classes.join(' ')} onClick={updateSelectedValues}>{value}</button>
}

export function NumberSelector() {
    return <div className='number-selector'>{
        [1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => <NumberSelection key={value} value={value}/>)
    }</div>
}