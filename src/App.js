import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from './cryptomonedas.png';
import Form from './components/Form';
import Quote from './components/Quote';
import Spinner from './components/Spinner';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media(min-width:992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  const [coin, saveCoin] = useState('');
  const [cryptocurrency, saveCryptocurrency] = useState('');
  const [result, saveResult]= useState({});
  const [loading, saveLoading] = useState(false);

  useEffect( ()=> {
    const quoteCryptocurrency = async ()=>{
      //evitamos la ejecucion la primera vez
      if(coin==='') return;

      //consultar la api para tener la cotizacion
      const url =`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${coin}`;

      const result = await axios.get(url);

      //mostrar el spinner
      saveLoading(true);

      //ocultar el  spinner y mostrar  el resultado
      setTimeout(()=>{

        //cambiar el esatdo de cargando
        saveLoading(false);

        //guardar cotizacion
        saveResult(result.data.DISPLAY[cryptocurrency][coin]);
      }, 3000);

      // console.log(result.data.DISPLAY[cryptocurrency][coin]);
    }
    quoteCryptocurrency();
  }, [coin, cryptocurrency]);

  //mostrar spinner o resultado
  const component = (loading) ? <Spinner /> : <Quote result={result} />

  return (
    <Container>
        <div>
          <Imagen
            src={imagen}
            alt="imagen cripto"
          />
        </div>

        <div>
          <Heading>Cotiza Criptomonedas al instante</Heading>

          <Form
            saveCoin={saveCoin}
            saveCryptocurrency={saveCryptocurrency}
          />

          {component}
        </div>
    </Container>
  );
}

export default App;
