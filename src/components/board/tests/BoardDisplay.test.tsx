import React from 'react';
import { render, screen } from '@testing-library/react';
import {BoardRepresentation} from "../../../models/BoardRepresentation";
import {beginnerPuzzle1} from "../../../puzzle-data/beginner-puzzles";
import {BoardDisplay} from "../BoardDisplay";

describe('BoardDisplay', () => {
    it('renders 81 cells', () => {
        const board = new BoardRepresentation(beginnerPuzzle1)
        render(<BoardDisplay board={board}/>);
        const values = screen.queryAllByTestId('cell');
        expect(values.length).toEqual(81);
    });

    it('displays each number', () => {
        const board = new BoardRepresentation(beginnerPuzzle1)
        render(<BoardDisplay board={board}/>);
        const ones = screen.queryAllByText('1');
        const twos = screen.queryAllByText('2');
        const threes = screen.queryAllByText('3');
        const fours = screen.queryAllByText('4');
        const fives = screen.queryAllByText('5');
        const sixes = screen.queryAllByText('6');
        const sevens = screen.queryAllByText('7');
        const eights = screen.queryAllByText('8');
        const nines = screen.queryAllByText('9');

        expect(ones.length).toEqual(4);
        expect(twos.length).toEqual(3);
        expect(threes.length).toEqual(2);
        expect(fours.length).toEqual(4);
        expect(fives.length).toEqual(5);
        expect(sixes.length).toEqual(3);
        expect(sevens.length).toEqual(5);
        expect(eights.length).toEqual(5);
        expect(nines.length).toEqual(4);
    });
})