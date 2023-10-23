import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './citasadmin.css';
import {Navigate } from 'react-router-dom';
import HeaderPrivate from '../../Componentes/HeaderPrivate'

const Citasadmin = ({ userLogged, rol }) => {
    const [citas, setCitas] = useState([]);
    const [editingCitaId, setEditingCitaId] = useState(null);
    const [editedFields, setEditedFields] = useState({});
    const [editedData, setEditedData] = useState({ idCarro: '', fechaInicio: '', fechaFin: '', idEstadoCita: '', idUsuario: '' });

    useEffect(() => {
        fetch('http://localhost:4020/api/importadora/citas')
            .then(response => response.json())
            .then(citasData => {
                setCitas(citasData);
                console.log(citas)
            })
            .catch(error => console.error('Error al obtener las citas:', error));
    }, []);

    const token = localStorage.getItem('token');

    const handleDeleteCita = (citaId) => {
        fetch(`http://localhost:4020/api/importadora/deleteCita/${citaId}`, {
            method: 'DELETE',
            headers: {
                'jwt': token
            },
        })
        .then(response => {
            if (response.ok) {
                setCitas(prevCitas => prevCitas.filter(cita => cita.idCita !== citaId));
            } else {
                console.error('Error al eliminar la cita:', response.statusText);
            }
        })
        .catch(error => console.error('Error al eliminar la cita:', error));
    };


    if(!userLogged){
        return<Navigate to = "/"/>
      }

      if(rol === '2'){
        return<Navigate to = "/carros"/>
      }

    return (
        <div className="body">
            <HeaderPrivate />

            <div className="content1">
                <h1>Listado de Citas</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Carro</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                            <th>Estado</th>
                            <th>Usuario</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.map(cita => 
                              <tr>
                              <td>{cita.idCita}</td>
                              <td>{cita.marca+" / "+ cita.linea +" / "+ cita.modelo}</td>
                              <td>{cita.fechaInicio}</td>
                              <td>{cita.fechaFin}</td>
                              <td>{cita.estado}</td>
                              <td>{cita.nombre}</td>
                              <td>
                                  {cita.estado==="finalizada" || cita.estado==="cancelada"?"":<a href={'./updatecita/'+ cita.idCita} className="button">Editar</a>}
                                  <button className="delete-button1" onClick={()=> handleDeleteCita(cita.idCita)}>Eliminar</button>
                              </td>
                          </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Citasadmin;






