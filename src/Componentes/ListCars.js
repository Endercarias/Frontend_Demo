import React, { useEffect, useState } from 'react';
import './ListCars.css';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ListCars = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCar, setIsOpenCar] = useState({});

  const toggleModal = (carro) => {
    setIsOpenCar(carro)
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    fetch('http://localhost:4020/api/importadora/cars')
      .then(response => response.json())
      .then(data => {
        setCars(data) 
        setFilteredCars(data)
      })
      .catch(error => console.log(error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  
  const handleSearch = (e) => {
    const newSearchTerm = e.target.value;
    console.log(newSearchTerm)
    setSearchTerm(newSearchTerm);

    const filtered = cars.filter(car => {
      const carInfo = `${car.marca.toLowerCase()} ${car.linea.toLowerCase()}`;
      return carInfo.includes(newSearchTerm.toLowerCase());
    });

    setFilteredCars(filtered);
  };

  return (
    <div>
      <div>
      <input
        type="text"
        placeholder="Buscar por marca, línea o modelo"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
      <div className="car-list-container">
        <h2>Lista de Vehículos</h2>
        <ul className="car-grid">
          {filteredCars.map(car => (
            <li key={car.idCarro} className="car-item" >
              <div className='divCursos' onClick={()=> toggleModal(car)}>
              <Slider {...settings}>
                  {car.imagenes.map(im => (
                    <img key={im.id} src={"http://localhost:4020/public/" + im.name} alt={im.name} />
                  ))}
                </Slider>
              </div>
              
              <div className="car-buttons">
                <Link to={"/login/"+ car.idCarro}  className="car-button">Hacer Cita<span></span></Link>
                
                </div>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>&times;</span>
           
            <li key={isOpenCar.idCarro} className="car-item">
              <p>Marca: {isOpenCar.marca}</p>
              <p>Línea: {isOpenCar.linea}</p>
              <p>Tipo de Vehículo: {isOpenCar.tipoVehiculo}</p>
              <p>Modelo: {isOpenCar.modelo}</p>
              <p>Descripción: {isOpenCar.descripccion}</p>
              <p>Precio: {isOpenCar.precio}</p>
              <p>Vendido: {isOpenCar.vendido ? 'Sí' : 'No'}</p>
            </li>
            <div className="car-buttons">
                <Link to={"/login/"+ isOpenCar.idCarro}  className="car-button">Hacer Cita<span></span></Link>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListCars;
