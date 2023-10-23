import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './citas.css';
import { useParams, Navigate } from 'react-router-dom';
import HeaderPublic from '../../Componentes/HeaderPublic'

const Citas = ({ userLogged }) => {
 
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [slectcar,setSelectedCarId] = useState(null); // Agregado
  const { carId } = useParams();
  const {idcita} = useParams();
  const idCar = idcita
  const idUsuario = sessionStorage.getItem('userId');
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [fechaFinalizacion, setFechaFinalizacion] = useState('');



  useEffect(() => {
    setSelectedCarId(carId); // Almacenar el ID del carro seleccionado
  }, [carId]);

  const handleDateTimeChange = (dateTime) => {
    setSelectedDateTime(dateTime);
  };

  const formatDateTime = (dateTime) => {
    const year = dateTime.getFullYear();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
    const day = dateTime.getDate().toString().padStart(2, '0');
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    const seconds = dateTime.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handlePrintDateTime = () => {
    if (selectedDateTime) {
      const newDateTime = new Date(selectedDateTime);
      newDateTime.setHours(newDateTime.getHours() + 1);

      const fechaSeleccionadaTexto = formatDateTime(selectedDateTime);
      const fechaFinalizacionTexto = formatDateTime(newDateTime);

      console.log('Fecha seleccionada:', formatDateTime(selectedDateTime));
      console.log('Fecha de finalización:', formatDateTime(newDateTime));

      setFechaSeleccionada(fechaSeleccionadaTexto);
      setFechaFinalizacion(fechaFinalizacionTexto);

      console.log(fechaFinalizacion)
      console.log(fechaSeleccionada)
    } else {
      console.log('No se ha seleccionado una fecha y hora.');
    }
  };


  const idEstadoCita = 1;
  const [form, setFormData] = useState({
    idCarro: idCar,
    fechaInicio: fechaSeleccionada ,
    fechaFin: fechaFinalizacion,
    idEstadoCita: idEstadoCita,
    idUsuario: idUsuario,
  });



  const handleSubmitCita = event => {
    event.preventDefault();
    
    if(selectedDateTime == null){
      alert("Tiene que seleccionar la fecha")
      return
    }

    const formData =new FormData()
    formData.append ("idCarro", form.idCarro)
    formData.append ("fechaInicio", fechaSeleccionada)
    formData.append ("fechaFin", fechaFinalizacion)
    formData.append ("idEstadoCita", form.idEstadoCita)
    formData.append ("idUsuario", form.idUsuario)

    const token = localStorage.getItem('token')
    // Realizar la solicitud POST a la ruta http://localhost:4020/api/importadora/setCar
    fetch('http://localhost:4020/api/importadora/setCita', {
      method: 'POST',
      headers: {
        'jwt': `${token}`
      },
      body:formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); 
        window.location = '/viewcita'
      })
      .catch(error => console.log(error));
  };

  if(!userLogged){
    return<Navigate to = "/"/>
  }
  return (
    <div className="body">
      <HeaderPublic />

      <div className="content">
        <div>
          <h2>Agendar Cita</h2>
          <div>
            <p>Fecha y Hora de inicio: (Las citas, tienen una duración de una hora)</p>
            <DatePicker
              selected={selectedDateTime}
              onChange={(date) => handleDateTimeChange(date)}
              dateFormat="MMMM d, yyyy h:mm aa"
              showYearDropdown
              showTimeSelect
              minDate={new Date()} // Evita seleccionar fechas pasadas
            />
          </div>
        </div>
        <button onClick={handlePrintDateTime}>Imprimir Fecha y Hora</button>
        <div>
          <p>ID del Carro: {idCar}</p> {/* Imprimir ID del carro */}
          <p>ID del Usuario: {idUsuario}</p> {/* Imprimir ID del carro */}
        </div>
      </div>
      <div className="form-container">
      <form onSubmit={handleSubmitCita} encType='multipart/form-data'>
    <div className="form-group">
      <label>idCarro:</label>
      <input type="text" name="idCarro" value={form.idCarro} />
    </div>
    <div className="form-group">
      <label>fecha Inicio:</label>
      <input type="text" name="fechaInicio" value={fechaSeleccionada} />
    </div>
    <div className="form-group">
      <label>fecha Fin:</label>
      <input type="text" name="fechaFin" value={fechaFinalizacion}  />
    </div>
    <div className="form-group">
      <label>Estado Cita:</label>
      <input name="idEstadoCita" value={form.idEstadoCita}>
      </input>
    </div>
    <div className="form-group">
      <label>idUsuario:</label>
      <input type="text" name="idUsuario" value={form.idUsuario}  />
    </div>
    <div className="form-group">
      <button type="submit">Agregar</button>
    </div>
  </form>
  </div>

    </div>
  );
};

export default Citas;