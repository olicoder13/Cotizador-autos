import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types'
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from '../helper';


const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 80px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;

const Input = styled.input`
    margin: 0 1rem;
`;

const Boton = styled.button`
    padding: 1rem;
    border-radius: 15px;
    font-size: 16px;
    width: 100%;
    background-color: #00838F;
    margin: 0 auto;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;

    &:hover{
        background-color: #26C6DA;
        cursor: pointer;
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
`;

const Formulario = ({guardarResumen, guardarCargando}) => {


    const [datos, guardarDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const [error, guardarError] = useState(false);

    //extraer los valores del state
    const {marca, year, plan} = datos;

    //Leer los datos del formulario y colocarlos en el state
    const obtenerInformacion = event => {
        guardarDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const cotizarSeguro = event =>{
        event.preventDefault();

        //Validacion
        if(marca.trim() === '' || year.trim() === '' || plan.trim() === '' ){
            guardarError(true);
            return
        }
        guardarError(false);

        //una base de 2000
        let resultado = 2000;


       //obtener la direcencia de anos
       const diferencia = obtenerDiferenciaYear(year);

       //por cada ano hay que restar el 3%
        resultado -= ((diferencia*(3*resultado))/100);

        

       //Americano 15%
       //Asiatico 5%
       //Europeo 30%
        resultado = calcularMarca(marca) * resultado;
        

       //Basico aumenta 20%
       //Completo 50%
        const incrementoPlan = obtenerPlan(plan);
        resultado = parseFloat(incrementoPlan * resultado).toFixed(2);
        

        guardarCargando(true);

        setTimeout(() =>{
            //Elimina el spinner
            guardarCargando(false)

            //pasa la informacion al componente principal
            guardarResumen({
                cotizacion: Number(resultado),
                datos
            })
        }, 3000)
       //Total
        
    }

  return (
    <form onSubmit={cotizarSeguro}>
        {
           error? 
           <Error>Todos los campos son obligatoriso</Error>
           :
           null
        }
        <Campo>
            <Label htmlFor="">Marca</Label>
            <Select
                name='marca'
                value={marca}
                onChange={obtenerInformacion}
            >
                <option value="">-- Seleccione --</option>
                <option value="americano">Americano</option>
                <option value="europeo">Europeo</option>
                <option value="asiatico">Asiatico</option>
            </Select>
        </Campo>

        <Campo>
            <Label htmlFor="">Año</Label>
            <Select
                name='year'
                value={year}
                onChange={obtenerInformacion}
            >
                <option value="">-- Seleccione --</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2019</option>
                <option value="2017">2019</option>
                <option value="2016">2019</option>
                <option value="2015">2019</option>
                <option value="2014">2014</option>
            </Select>
        </Campo>

        <Campo>
            <Label htmlFor="">Plan</Label>
            <Input 
            type="radio"
            name='plan'
            value='basico'
            checked={plan === 'basico'}
            onChange={obtenerInformacion}
            /> Basico

            <Input 
            type="radio"
            name='plan'
            value='completo'
            checked={plan === 'completo'}
            onChange={obtenerInformacion}
            /> Completo
        </Campo>

        <Boton type='submit'>Cotizar</Boton>
    </form>
  )
}


Formulario.propTypes = {
    guardarResumen: PropTypes.func.isRequired,
    guardarCargando:PropTypes.func.isRequired
}
export default Formulario