import React, { useEffect, useState, createContext, useContext } from 'react';
import './ListCars.css';




const ListCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // solicitud GET 
    fetch('http://localhost:4020/api/importadora/cars')
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.log(error));
  }, []);



  return (
    <div>
    
    <div className="car-list-container">
  <h2>Lista de Vehículos</h2>
  <ul className="car-grid">
    {cars.map(car => (
      <li key={car.idCarro} className="car-item">
        <p>Marca: {car.marca}</p>
        <p>Línea: {car.linea}</p>
        <p>Tipo de Vehículo: {car.tipoVehiculo}</p>
        <p>Modelo: {car.modelo}</p>
        <p>Descripción: {car.descripcion}</p>
        <p>Foto: {car.foto}</p>
        <p>Precio: {car.precio}</p>
        <p>Vendido: {car.vendido ? 'Sí' : 'No'}</p>

        
      </li>
    ))}
  </ul>
 
</div>


</div>
  );
};

export default ListCars;
