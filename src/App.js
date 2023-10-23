
import { BrowserRouter, Routes, Route } from 'react-router-dom';
 import './App.css';
 import Login from './pages/login/login';
 import Register from './pages/register/register';
 import Carros from './pages/carros/carros';
 import Price from './pages/price/price';
 import Citas from './pages/citas/citas';
 import Citasadmin from './pages/citasadmin/citasadmin';
 import AdminCarros from './pages/admincarros/AdminCarros'
 import AddCars from './Componentes/addCars';
import UpdateCars from './Componentes/UpdateCars';
import UpdateCita from './pages/citasadmin/updateCita'
import CitasPublic from './pages/citas/citasPublic'

 function App() {

   const userLogged = localStorage.getItem('token') 
 const rolLocal = sessionStorage.getItem('rol')

  return (
    <BrowserRouter>
   <Routes>
      <Route path='/' element={<Login/>} exact  /> 
      <Route path='/login/:idCarro' element={<Login/>} exact  /> 
      <Route  path='/register' element={<Register/>} exact />
      <Route  path='/citas/:idcita' element={<Citas userLogged ={userLogged} />} exact />
     <Route path='/carros' element={<Carros />} exact  />
     <Route path='/price/:idCarro' element={<Price userLogged ={userLogged} />} exact  />

     <Route path='/citasadmin' element={<Citasadmin userLogged ={userLogged} rol={rolLocal} />} exact  />
     <Route path='/updatecita/:idCita' element={<UpdateCita userLogged ={userLogged} rol={rolLocal} />} />
     <Route path='/viewcita/' element={<CitasPublic userLogged ={userLogged} />} />

     <Route path='/admincar' element={<AdminCarros userLogged ={userLogged} rol={rolLocal} /> } exact />
     <Route path='/addcar' element={<AddCars userLogged ={userLogged} rol={rolLocal} />} />
     <Route path='/updatecar/:idCar' element={<UpdateCars userLogged ={userLogged} rol={rolLocal} />} />
   </Routes>
   </BrowserRouter>
 );
 }

export default App;


