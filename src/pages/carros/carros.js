import React from 'react';
import { Navigate } from 'react-router-dom';
import AddCars from '../../Componentes/addCars';
import ListCars from '../../Componentes/ListCars';

const Carros = ({userLogged}) => {

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

      <h1>CRUD de Venta de Carros</h1>
      <AddCars />
      <ListCars />
    </div>
  );
};

export default Carros;
