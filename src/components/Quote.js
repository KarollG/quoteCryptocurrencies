import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ResultDiv = styled.div`
    color: #FFF;
    font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
    font-size: 18px;

    span {
        font-weight: bold;
    }
`;

const Price = styled.p`
    font-size: 30px;
`;


const Quote = ({result}) => {
    if(Object.keys(result).length === 0) return null;

    console.log(result);
    return (
        <ResultDiv>
            <Price>El precio es: <span>{result.PRICE}</span></Price>
            <Info>Precio más alto del día: <span>{result.HIGHDAY}</span></Info>
            <Info>Precio más bajo del día: <span>{result.LOWDAY}</span></Info>
            <Info>Variación últimas 24 horas: <span>{result.CHANGEPCT24HOUR}</span></Info>
            <Info>Última actualización: <span>{result.LASTUPDATE}</span></Info>
        </ResultDiv>
     );
}

Quote.propTypes = {
    result: PropTypes.object.isRequired
}

export default Quote;