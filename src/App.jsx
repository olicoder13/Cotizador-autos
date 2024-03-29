import styled from '@emotion/styled'
import './App.css'
import Header from './components/Header'
import Formulario from './components/Formulario';
import { useState } from 'react';
import Resumen from './components/Resumen';
import Resultados from './components/Resultados';
import Spinner from './components/Spinner';



const Contenedor = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const ContenedorFormulario = styled.div`
  background-color: #fff;
  padding: 3rem;
`

function App() {
    const [resumen, guardarResumen] = useState({
      cotizacion: 0,
      datos: {
        marca: '',
        year: '',
        plan: ''
      }
    });

    const [cargando, guardarCargando] = useState(false);

    const {cotizacion, datos} = resumen;
  return (
    <Contenedor>
      <Header
    titulo={'Cotizador de seguros'}
      />
      <ContenedorFormulario>
        <Formulario 
        guardarResumen={guardarResumen}
        guardarCargando={guardarCargando}
        />
        
      {
        cargando? <Spinner/> : null
      }
      

        <Resumen
        datos={datos}
        />

        {!cargando?
        <Resultados
        cotizacion={cotizacion}
        />
        :
        null
      }
        
      </ContenedorFormulario>
    </Contenedor>
  )
}

export default App
