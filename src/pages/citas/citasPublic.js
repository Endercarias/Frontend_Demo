import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {Navigate } from 'react-router-dom';
import HeaderPublic from '../../Componentes/HeaderPublic';

const CitasPublic = ({ userLogged, rol }) => {
    
    const [citas, setCitas] = useState([]);
   
    useEffect(() => {

        fetch(`http://localhost:4020/api/importadora/selectCita/${sessionStorage.getItem("userId")}`)
            .then(response => response.json())
            .then(citasData => {
                console.log(citasData)
                setCitas(citasData);
            })
            .catch(error => console.error('Error al obtener las citas:', error));
    }, []);


    if(!userLogged){
        return<Navigate to = "/"/>
    }

    return (
        <div className="body">
            <HeaderPublic />

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
                                  <a href={'./updatecita/'+ cita.idCita} className="button">Editar</a>
                                  
                              </td>
                          </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CitasPublic;
