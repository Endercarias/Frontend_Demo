import React from 'react';
import './home.css' 
import { Navigate } from 'react-router-dom';


const Home = ({userLogged}) => {
  
  if(!userLogged){
    return<Navigate to = "/"/>
  }

  return (
<div className="body">
      <header class="header">
      <h1>Importadora Orellana</h1>
  <nav class="navigation">
    <ul class="menu">
      <li><a href="./home">Inicio</a></li>
      <li><a href="./carros">Carros</a></li>
      <li><a href="#">Cotizar</a></li>
      <li><a href="#">Cerrar sesión</a></li>
    </ul>
  </nav>
</header>


      <div className="content">
        <h1>Bienvenido a mi aplicación</h1>
        <p>Contenido del home...</p>
      </div>
    </div>
  );

};

export default Home;
