import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Cotizaciones from '../../Componentes/Price/addPrice';
import ListPrice from '../../Componentes/Price/listPrice';

const Price = ({userLogged}) => {

  const { idCarro: idCarro = '0' } = useParams();

  if(!userLogged){
    return<Navigate to = "/"/>
  }

  return (
    <div>
      <header class="header">
  <h1>Importadora Orellana</h1>
  <nav class="navigation">
    <ul class="menu">
      <li><a href="./home">Inicio</a></li>
      <li><a href="./carros">Carros</a></li>
      <li><a href="./price">Cotizar</a></li>
      <li><a href="#">Cerrar sesión</a></li>
    </ul>
  </nav>
</header>

    <h1>Cotizaciones</h1>
      <Cotizaciones />
      <ListPrice  idCarro={idCarro}/>
    </div>
  );
};

export default Price;