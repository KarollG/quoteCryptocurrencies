import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Error from './Error';
import useCoin from '../hooks/useCoin';
import useCryptocurrency from '../hooks/useCryptocurrency';
import axios from 'axios';

const Button = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Form = ({saveCoin ,saveCryptocurrency}) => {

    //state del listado de cryptomonedas
    const [listcrypto, saveCryptocurrencies]= useState([]);
    const [error, saveError] = useState(false);

    const COINS =[
        {codes: 'USD', name: 'Dolar de Estados Unidos'},
        {codes: 'MXN', name: 'Peso Mexicano'},
        {codes: 'EUR', name: 'Euro'},
        {codes: 'GBP', name: 'Libra Esterlina'}
        // {codes: 'COP', name: 'Peso colombiano'}
    ]
    //utilizar useCoin
    const [coin, SelectCoins]= useCoin('Elige tu Moneda', '', COINS);

    //Utilizar useCryptomoneda
    const [cryptocurrency, SelectCrypto] = useCryptocurrency ('Elige tu criptomoneda', '', listcrypto );


    //Ejecutar llamado a la api
    useEffect(()=>{
        const consultAPI = async () =>{
            const url =  'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const result = await axios.get(url);

            saveCryptocurrencies(result.data.Data);
        }
        consultAPI();
    }, []);

    //cuando el usuario hace submit
    const quoteCurrency = e => {
        e.preventDefault();

        //validar si ambos cammpos estab llenos
        if(coin==='' || cryptocurrency === ''){
            saveError(true);
            return;
        }
        //pasar los datos al componente principal
        saveError(false);
        saveCoin(coin);
        saveCryptocurrency(cryptocurrency);
    }

    return (
        <form
            onSubmit={quoteCurrency}
        >
            {error ? <Error message="Todos los campos son obligatorios"/> : null}
            <SelectCoins />

            <SelectCrypto />

            <Button
                type="submit"
                value="Calcular"
            />
        </form>
     );
}

Form.propTypes = {
    saveCoin: PropTypes.func.isRequired,
    saveCryptocurrency: PropTypes.func.isRequired
}

export default Form;