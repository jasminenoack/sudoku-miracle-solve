export class DomClass {
    /*
    * Class that tracks the class names that will get changed during a
    * step in applying a rule or completing a procedure
    * */
    className: string
    cells: {[key: number]: boolean}

    constructor(className: string, cells: number[]) {
        const cellDict: {[key: number]: boolean} = {}
        cells.forEach(cell => cellDict[cell] = true)
        this.cells = cellDict
        this.className = className
    }
}

export class Step {
    /*
    * Class that represents a single step in a rule or procedure
    * */
    name: string
    domClasses: DomClass[]
    description: string
    isComplete: boolean = false

    constructor(name: string, description: string, domClasses: DomClass[]) {
        this.name = name
        this.description = description
        this.domClasses = domClasses
    }

    complete() {
        this.isComplete = true
    }

    getClasses(index: number) {
        const classes: string[] = []
        this.domClasses.forEach(domClass => {
            if (domClass.cells[index]) {
                classes.push(domClass.className)
            }
        })
        return classes
    }
}