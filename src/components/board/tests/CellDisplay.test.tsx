import React from 'react';
import {CellDisplay} from '../CellDisplay'
import {CellRepresentation} from "../models/CellRepresentation";
import { render, screen } from '@testing-library/react';

describe('CellDisplay', () => {
    it('should display a number', () => {
        const cell = new CellRepresentation(4)
        render(<CellDisplay cell={cell} onClick={() => {}} selected/>);
        const value = screen.getByText('4');
        expect(value).toBeInTheDocument();
    });

    it('should display nothing', () => {
        const cell = new CellRepresentation(undefined)
        render(<CellDisplay cell={cell} onClick={() => {}} selected/>);
        const value = screen.getByTestId('cell');
        expect(value).toBeEmptyDOMElement();
    });
})