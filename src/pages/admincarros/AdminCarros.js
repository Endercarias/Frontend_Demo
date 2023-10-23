import { useEffect, useState } from "react";
import './AdminCarros.css'
import HeaderPrivate from '../../Componentes/HeaderPrivate'

const AdminCarros = ({}) => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        buscarDatos()
      }, []);

      const buscarDatos = ()=>{
        fetch('http://localhost:4020/api/importadora/cars')
        .then(response => response.json())
        .then(data => setCars(data))
        .catch(error => console.log(error));
      }

      const eliminar = (idCarro)=> {

        const token = localStorage.getItem('token');
        const data = {
            idCar: idCarro
        }

        fetch(`http://localhost:4020/api/importadora/deleteCar`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'jwt': `${token}`
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((data) => {
            buscarDatos()
        })
        .catch((error) => console.error(error));
      }

    return(
        <>
        <HeaderPrivate />
            <div class="contenedor">
                <h1 class="titulo">Carros</h1>
                <a href="./addcar" class="boton-agregar">Agregar</a>
            </div>
            <table >
                <thead>
                    <tr>
                        <th>Marca</th>
                        <th>Línea</th>
                        <th>Tipo de Vehículo</th>
                        <th>Modelo</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Vendido</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {
                    cars.map(car =>
                            <tr>
                                <td>{car.marca}</td>
                                <td>{car.linea}</td>
                                <td>{car.tipoVehiculo}</td>
                                <td>{car.modelo}</td>
                                <td>{car.descripccion}</td>
                                <td>{car.precio}</td>
                                <td>{car.vendido ? 'No' : 'Si'}</td>
                                <td>
                                    <a href={'./updatecar/'+ car.idCarro} className="button">Actualizar</a>
                                    <button onClick={()=> eliminar(car.idCarro)}>Eliminar</button>
                                </td>
                            </tr>
                    )
                }
                </tbody>
            </table> 
        </>
       
    )
}

export default AdminCarros