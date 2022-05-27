class PencilMark {
    value: number
    invalid: boolean = false

    constructor(value: number) {
      this.value = value
    }
}


export class CellRepresentation {
    value?: number;
    pencilMarks: PencilMark[]

    constructor(value?: number) {
      this.value = value
      this.pencilMarks = []
    }

    getValue() {
      return this.value
    }

    getPencilValues() {
        return this.pencilMarks.map(mark => mark.value).sort()
    }

    addAllPencilMarks() {
        this.pencilMarks = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => new PencilMark(value))
    }

    removeAllPencilMarks() {
        this.pencilMarks = []
    }

    addPencilMarks(values: number[]) {
        const existingValues = this.getPencilValues()
        values.forEach(value => {
            if (existingValues.indexOf(value) == -1) {
                this.pencilMarks.push(new PencilMark(value))
            }
        });
    }

    removePencilMarks(values: number[]) {
        this.pencilMarks = this.pencilMarks.filter((mark) => values.indexOf(mark.value) == -1)
    }

    markPencilMarksAsInvalid(values: number[]) {
        this.pencilMarks.forEach(mark => {
            if (values.indexOf(mark.value) !== -1) {
                mark.invalid = true
            }
        })
    }
}
