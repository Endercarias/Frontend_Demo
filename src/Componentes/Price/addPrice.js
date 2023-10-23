import React, {useState } from 'react';
import './addPrice.css';

const Cotizaciones = () => {
  



  const [formData, setFormData] = useState({
    email: '',
    nombre: '',
    apellido: '',
    telefono: '',
    idCarro: ''
  });

  const handleSubmit = event => {
    event.preventDefault();
    console.log(formData)
    // Realizar la solicitud POST a la ruta http://localhost:4020/api/importadora/setCar
    fetch(`http://localhost:4020/api/importadora/setCotizacion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); 

   
      })
      .catch(error => console.log(error));
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };


return (

  <div>
  <div className="add-car-container">
  <h2>Agregar Nueva Cotización</h2>
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>email:</label>
      <input type="text" name="email" value={formData.email} onChange={handleChange}/>
    </div>
    <div className="form-group">
      <label>nombre:</label>
      <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>apellido</label>
      <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>telefono</label>
      <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>idCarro:</label>
      <input name="idCarro" value={formData.idCarro} onChange={handleChange}  />
    </div>
    <div className="form-group">
      <button type="submit">Agregar</button>
    </div>
  </form>
</div>
</div>
  
  );
}


export default Cotizaciones;