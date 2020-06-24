import React, {Fragment, useState} from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Selectt = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    --webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1rem;
`;

const useCoin = (label, stateInitial, options) => {

    //State de nuestro hook
    const [state, updateState] = useState(stateInitial);

    const Select =() => (
        <Fragment>
            <Label>{label}</Label>
            <Selectt
                onChange={e => updateState(e.target.value)}
                value={state}
            >
                <option value="">-Seleccione-</option>
                {options.map(option =>(
                    <option key={option.codes} value={option.codes}>{option.name}</option>
                ))}
            </Selectt>
        </Fragment>
    );
    //retornar  state, interfaz y func que modifica el state
    return [state, Select, updateState];
}

export default useCoin;