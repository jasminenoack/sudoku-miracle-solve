import React from 'react';
import {CellDisplay} from '../CellDisplay'
import {CellRepresentation} from "../models/CellRepresentation";
import { render, screen } from '@testing-library/react';

function buildCell(value: number | undefined) {
    return new CellRepresentation(value)
}

describe('CellDisplay', () => {
    it('should display a number', () => {
        const cell = buildCell(4)
        render(<CellDisplay cell={cell} onClick={() => {}} selected/>);
        const value = screen.getByText('4');
        expect(value).toBeInTheDocument();
    });

    it('should display nothing', () => {
        const cell = buildCell(undefined)
        render(<CellDisplay cell={cell} onClick={() => {}} selected/>);
        const value = screen.getByTestId('cell');
        expect(value).toBeEmptyDOMElement();
    });

    describe('pencil marks', () => {
        it('should not display pencil marks if value', () => {
            const cell = buildCell(4)
            cell.addAllPencilMarks();
            render(<CellDisplay cell={cell} onClick={() => {}} selected/>);
            const value = screen.queryByText('7');
            expect(value).not.toBeInTheDocument()
        })

        it('should display pencil marks if no value and they are there', () => {
            const cell = buildCell(undefined)
            cell.addAllPencilMarks();
            render(<CellDisplay cell={cell} onClick={() => {}} selected/>);
            const value = screen.getByText('7');
            expect(value).toBeInTheDocument()
        })

        it('should not display pencil marks if none included', () => {
            const cell = buildCell(undefined)
            render(<CellDisplay cell={cell} onClick={() => {}} selected/>);
            const value = screen.queryByText('7');
            expect(value).not.toBeInTheDocument()
        })
    })
})