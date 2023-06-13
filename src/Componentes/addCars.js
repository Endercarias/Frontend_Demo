import React, { useState } from 'react';
import './addCars.css';


const AddCars = () => {
  const [formData, setFormData] = useState({
    marca: '',
    linea: '',
    tipoVehiculo: '',
    modelo: '',
    descripccion: '',
    foto: '',
    precio: '',
    vendido: false,
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSubmit = event => {
    event.preventDefault();
    // Realizar la solicitud POST a la ruta http://localhost:4020/api/importadora/setCar
    fetch('http://localhost:4020/api/importadora/setCar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'jwt': localStorage.getItem('token')
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); 

   
      })
      .catch(error => console.log(error));
  };

  return (
    
    <div className="add-car-container">
  <h2>Agregar Nuevo Vehículo</h2>
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Marca:</label>
      <input type="text" name="marca" value={formData.marca} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>Línea:</label>
      <input type="text" name="linea" value={formData.linea} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>Tipo de Vehículo:</label>
      <input type="text" name="tipoVehiculo" value={formData.tipoVehiculo} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>Modelo:</label>
      <input type="text" name="modelo" value={formData.modelo} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>Descripción:</label>
      <input name="descripccion" value={formData.descripccion} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>Foto:</label>
      <input type="text" name="foto" value={formData.foto} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>Precio:</label>
      <input type="text" name="precio" value={formData.precio} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>Vendido:</label>
      <select name="vendido" value={formData.vendido} onChange={handleChange}>
        <option value={1}>No</option>
        <option value={0}>Sí</option>
      </select>
    </div>
    <div className="form-group">
      <button type="submit">Agregar</button>
    </div>
  </form>
</div>

  );
};

export default AddCars;
