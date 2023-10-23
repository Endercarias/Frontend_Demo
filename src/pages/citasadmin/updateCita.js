import { useState } from 'react';
import './updateCita.css'
import { useParams } from 'react-router-dom';
import HeaderPrivate from '../../Componentes/HeaderPrivate'

const UpdateCita = () => {
    const {idCita} = useParams()
    const rol = sessionStorage.getItem("rol")
    
    const handleSaveEdit = (event) => {
        event.preventDefault()
        const {estado} = event.target
        
        const data = {
            idCita,
            idEstadoCita:estado.value
        }
        const token = localStorage.getItem('token');
    
        fetch(`http://localhost:4020/api/importadora/updateCita/${idCita}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'jwt': token,
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
           console.log(data)
           if(rol == 2){
            window.location = '/viewcita';
           }else{
               window.location = '/citasadmin';
           }
        })
        .catch(error => console.error('Error al modificar la cita:', error));
    };
    return (
        <>
        <HeaderPrivate />
        <div class="container12">
        <h1>Formulario</h1>
        <form onSubmit={handleSaveEdit}>
            <div class="form-group">
                <label for="idCita">Id Cita:</label>
                <input type="text" id="idCita" name="idCita" value={idCita} disabled/>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <select id="estado" name="estado">
                    <option value="0">Selecione algun valor</option>
                    
                    {
                        rol == 1 
                        ? <><option value="1">Activo</option>
                        <option value="2">Finalizado</option></>
                        :''
                    }
                    
                    <option value="3">Cancelada</option>
                </select>
            </div>
            <button type="submit" class="submit-button">Enviar</button>
        </form>
    </div>
        </>
    
    );
};

export default UpdateCita