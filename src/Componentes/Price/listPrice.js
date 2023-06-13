import React, { useEffect, useState} from 'react';
import './listPrice.css';

const ListPrice = ({idCarro}) => {
  const [price, setPrices] = useState([]);
  useEffect(() => {
    // solicitud GET 
    fetch(`http://localhost:4020/api/importadora/getCotizaciones/${idCarro}`)
      .then(response => response.json())
      .then(data => setPrices(data))
      .catch(error => console.log(error));
  }, []);


  return (
    <div>

    <div className="car-list-container">
  <h2>Lista de Vehículos</h2>
  <ul className="car-grid">
    {price.map(price => (
      <li key={price.idCotizacion} className="car-item">
        <p>idCotizacion: {price.idCotizacion}</p>
        <p>fechaCotizacion: {price.fechaCotizacion}</p>
        <p>validesCotizacion: {price.validesCotizacion}</p>
        <p>idCarro: {price.idCarro}</p>
        <p>email: {price.email}</p>
        <p>nombre: {price.nombre}</p>
        <p>apellido: {price.apellido}</p>
        <p>telefono: {price.telefono}</p>

        
      </li>
    ))}
  </ul>
 
</div>

</div>
  );
};

export default ListPrice;
