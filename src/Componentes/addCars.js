import React, { useState } from 'react';
import './addCars.css';


const AddCars = () => {
  const [form, setFormData] = useState({
    marca: '',
    linea: '',
    tipoVehiculo: '',
    modelo: '',
    descripccion: '',
    precio: '',
    vendido: 1,
  });
  const [imagen,setImagen] = useState({
    foto: []
  }) 

  const handleChange = event => {
      const { name, value } = event.target;
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
  };
  
  const handleSubmit = event => {
    event.preventDefault();

    const formData =new FormData()
    formData.append ("marca", form.marca)
    formData.append ("linea", form.linea)
    formData.append ("tipoVehiculo", form.tipoVehiculo)
    formData.append ("modelo", form.modelo)
    formData.append ("descripccion", form.descripccion)
    formData.append ("precio", form.precio)
    formData.append ("vendido", form.vendido)

    for (let index = 0; index < imagen.foto.length; index++) {
      formData.append ("image", imagen.foto[index])
    }

    const token = localStorage.getItem('token')
    // Realizar la solicitud POST a la ruta http://localhost:4020/api/importadora/setCar
    fetch('http://localhost:4020/api/importadora/setCar', {
      method: 'POST',
      headers: {
        'jwt': `${token}`
      },
      body:formData,
    })
      .then(response => response.json())
      .then(data => {
        window.location = '/admincar'
      })
      .catch(error => alert(error.message));
  };

  return (
    
    <div className="add-car-container">
  <h2>Agregar Nuevo Vehículo</h2>
  <form onSubmit={handleSubmit} encType='multipart/form-data'>
    <div className="form-group">
      <label>Marca:</label>
      <input type="text" name="marca" value={form.marca} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>Línea:</label>
      <input type="text" name="linea" value={form.linea} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>Tipo de Vehículo:</label>
      <input type="text" name="tipoVehiculo" value={form.tipoVehiculo} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>Modelo:</label>
      <input type="text" name="modelo" value={form.modelo} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>Descripción:</label>
      <textarea type="text" name="descripccion" value={form.descripccion} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>Foto:</label>
      <input type="file" multiple name="foto"  onChange={e=>setImagen({foto:e.target.files})} />
    </div>
    <div className="form-group">
      <label>Precio:</label>
      <input type="text" name="precio" value={form.precio} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>Vendido:</label>
      <select name="vendido" value={form.vendido} onChange={handleChange}>
        <option value={1}>Si</option>
        <option value={0}>No</option>
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
