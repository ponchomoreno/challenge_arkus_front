import React from 'react'
import { render } from '@testing-library/react';
import MenuChallenge from '../challenge_arkus/components/menuChallenge';
import { BrowserRouter } from 'react-router-dom';

describe('Testing menu challenge componente', () => {

    test('Mounted componente menu challenge', () => {
        render(
            <BrowserRouter>
                <MenuChallenge />
            </BrowserRouter>
        )
    })

})