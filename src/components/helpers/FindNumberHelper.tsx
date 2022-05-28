function NumberSelection({value}: {value: number}) {
    return <div className='number-button'>{value}</div>
}

export function NumberSelector() {
    return <div className='number-selector'>{
        [1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => <NumberSelection value={value}/>)
    }</div>
}