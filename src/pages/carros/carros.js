import React from 'react';
import ListCars from '../../Componentes/ListCars';
import HeaderPublic from '../../Componentes/HeaderPublic';

const Carros = () => {



  return (
    <div>
      <HeaderPublic />

      <h1>Venta de Carros</h1>
      <ListCars />
    </div>
  );
};

export default Carros;
