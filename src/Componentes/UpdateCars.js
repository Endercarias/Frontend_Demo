
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import './UpdateCars.css';

const UpdateCars = () => {
  const {idCar} = useParams();

  const [form, setFormData] = useState({
    marca: '',
    linea: '',
    tipoVehiculo: '',
    modelo: '',
    descripccion: '',
    precio: '',
    vendido: 0,
    imagenes: [],
  });
  console.log(form)
  const buscarCarros = (idCar)=>{
    fetch(`http://localhost:4020/api/importadora/car/${idCar}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            marca: data[0].marca,
            linea: data[0].linea,
            tipoVehiculo: data[0].tipoVehiculo,
            modelo: data[0].modelo,
            descripccion: data[0].descripccion,
            precio: data[0].precio,
            vendido: data[0].vendido.data[0],
            imagenes: data[0].imagenes
          });
        })
        .catch((error) => console.error(error));
  }

  useEffect(() => {
    buscarCarros(idCar)
  }, [idCar]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('idCarro', idCar)
    formData.append('marca', form.marca);
    formData.append('linea', form.linea);
    formData.append('tipoVehiculo', form.tipoVehiculo);
    formData.append('modelo', form.modelo);
    formData.append('descripccion', form.descripccion);
    formData.append('precio', form.precio);
    formData.append('vendido', form.vendido);


    const token = localStorage.getItem('token');

    fetch(`http://localhost:4020/api/importadora/updateCar`, {
      method: 'PUT',
      headers: {
        'jwt': `${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        window.location = '/admincar';
      })
      .catch((error) => alert(error.message));
  };

  const cargarCarro = (event) => {

    const formData =new FormData()
    formData.append('idCarro', idCar);
    formData.append('image', event.target.files[0]);

    const token = localStorage.getItem('token');

    fetch(`http://localhost:4020/api/importadora/createimage`, {
      method: 'POST',
      headers: {
        'jwt': `${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        buscarCarros(idCar)
      })
      .catch((error) => alert(error.message));
  }

  return (
    <>
    <div className="update-car-container">
      <div className="image-gallery">
        {form.imagenes.map((image, index) => (
          <div className="image-item" key={index}>
            <img src={'http://localhost:4020/public/' + image.name} alt={`Imagen ${image.name}`} />
            <button
              className="delete-button"
              onClick={() => {
                const token = localStorage.getItem('token');

                fetch(`http://localhost:4020/api/importadora/delete/${image.idImagenes}`, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                      'jwt': `${token}`,
                    },
                })
                .then((response) => response.json())
                .then((data) => {
                    
                    buscarCarros(idCar)
                })
                .catch((error) => console.error(error));
              }}
            >
              &#x2716;
            </button>
          </div>
        ))}
      </div>
      <div className='container'>
        <div class="image-upload">
                <div class="displayName">
                  <input type="file" id="imageInput" onChange={cargarCarro} />
                </div>

                <label className='label' for="imageInput">Cargar Imágenes</label>
            </div>
            <div className="form-container">
                <h2>Actualizar Vehículo</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label className='labelw'>Marca:</label>
                    <input type="text" name="marca" value={form.marca} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                    <label className='labelw'>Línea:</label>
                    <input type="text" name="linea" value={form.linea} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                    <label className='labelw'>Tipo de Vehículo:</label>
                    <input type="text" name="tipoVehiculo" value={form.tipoVehiculo} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                    <label className='labelw'>Modelo:</label>
                    <input type="text" name="modelo" value={form.modelo} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                    <label className='labelw'>Descripción:</label>
                    <textarea className='textarea' type="text" name="descripccion" value={form.descripccion} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                    <label className='labelw'>Precio:</label>
                    <input type="text" name="precio" value={form.precio} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                    <label className='labelw'>Vendido:</label>
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
      </div>
    </div>
    </>
  );
};

export default UpdateCars;